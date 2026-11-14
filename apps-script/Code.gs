/** @OnlyCurrentDoc */
// Dabadeal — réception des commandes du site dans ce Google Sheet.
// Règle : aucune vraie commande n'est perdue. Seuls les bots évidents vont dans « Bloquées (anti-bot) »,
// et une commande bloquée peut être rétablie (menu Dabadeal → Rétablir la ligne bloquée sélectionnée).
// Meta (API Conversions) reçoit exactement les commandes au statut « Nouvelle » : ni tests, ni doublons, ni bots.

const MIN_FILL_MS = 2500;            // formulaire vide rempli en moins de 2,5 s = robot
const MIN_FILL_MS_PREFILLED = 800;   // client qui revient : nom/téléphone déjà pré-remplis
const MAX_ORDERS_PER_PHONE_6H = 6;   // au-delà : on met de côté (bloquées), récupérable
const FLOOD_MAX_10MIN = 25;          // plus de 25 commandes en 10 min sur tout le site = attaque
const DUP_WINDOW_S = 1800;           // même téléphone + même panier en moins de 30 min = doublon

// Colonnes de l'onglet Commandes
const COLS = ['Date', 'N° commande', 'Statut', 'Nom', 'Téléphone', 'Ville', 'Adresse', 'Produits', 'Qté',
  'Sous-total (DH)', 'Remise (DH)', 'Total (DH)', 'Upsell', 'Source', 'Page', 'Appareil', 'Note confirmation',
  'Campagne', 'Pub'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(15000);
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const orders = ss.getSheetByName('Commandes');
    const blocked = ss.getSheetByName('Bloquées (anti-bot)');
    ensureHeaders(orders);
    const now = new Date();
    const phone = normPhone(d.phone);
    const cache = CacheService.getScriptCache();

    // ---- ajout après commande (upsell) ----
    if (d.type === 'upsell') {
      const id = String(d.order_id || '');
      if (!/^DD\d{6,8}$/.test(id)) return out('bad-id');
      const row = findOrderRow(orders, id);
      if (!row) return out('not-found');
      if (orders.getRange(row, 13).getValue()) return out('already');
      const total = Number(d.price) || 0;
      orders.getRange(row, 8).setValue(orders.getRange(row, 8).getValue() + '\n1 × ' + d.name + ' (ajout après commande)');
      orders.getRange(row, 12).setValue(Number(orders.getRange(row, 12).getValue()) + total);
      orders.getRange(row, 13).setValue(d.name + ' — ' + total + ' DH');
      const r = orders.getRange(row, 1, 1, 7).getValues()[0];
      const status = String(orders.getRange(row, 3).getValue());
      if (status === 'Nouvelle') {
        sendMeta({ event: 'UpsellAccepted', id: id + '-up', name: r[3], phone: normPhone(r[4]), city: r[5], total: total,
          items: [{ sku: d.sku, qty: 1 }], fbp: d.fbp, fbc: d.fbc, ua: d.ua, url: d.url });
      }
      // même date_order que la commande d'origine, pour que TajerCOD la range avec elle
      if (status !== 'Test') {
        try { pushTajer({ id: id, date: r[0], name: r[3], phone: normPhone(r[4]), city: r[5], address: r[6],
          items: [{ sku: d.sku, qty: 1, line: total }], upsell: true }); } catch (err) {}
      }
      return out('ok');
    }

    // ---- renvoi de la même commande (réseau instable) : on ne la crée pas deux fois ----
    if (d.id && findOrderRow(orders, String(d.id))) return out('already');

    // ---- filtre anti-bot (seulement ce qui est clairement automatique) ----
    let reason = '';
    const fill = Number(d.t) || 0;
    const minFill = d.prefilled ? MIN_FILL_MS_PREFILLED : MIN_FILL_MS;
    if (d.hp) reason = 'Champ piège rempli (robot)';
    else if (!d.human && fill < 15000) reason = 'Aucune interaction humaine';
    else if (fill < minFill) reason = 'Formulaire rempli trop vite (' + fill + ' ms)';
    else if (!/^0[5-7]\d{8}$/.test(phone)) reason = 'Téléphone invalide';
    else if (/https?:|www\.|<|>/i.test([d.name, d.city, d.address].join(' '))) reason = 'Lien ou code dans les champs';
    else if (String(d.name || '').trim().length < 2 || String(d.address || '').trim().length < 3) reason = 'Champs vides';
    if (!reason) {
      const bucket = 'f' + Math.floor(now.getTime() / 600000);
      const flood = Number(cache.get(bucket) || 0) + 1;
      cache.put(bucket, String(flood), 900);
      if (flood > FLOOD_MAX_10MIN) reason = 'Afflux anormal (' + flood + ' commandes en 10 min)';
    }
    if (!reason) {
      const k = 'p' + phone, n = Number(cache.get(k) || 0) + 1;
      cache.put(k, String(n), 21600);
      if (n > MAX_ORDERS_PER_PHONE_6H) reason = 'Plus de ' + MAX_ORDERS_PER_PHONE_6H + ' commandes en 6 h pour ce numéro';
    }
    if (reason) {
      blocked.appendRow([now, reason, d.name || '', "'" + phone, d.city || '', JSON.stringify(d).slice(0, 45000)]);
      return out('blocked');
    }

    // ---- statut : vraie commande, test ou doublon (les doublons ne sont PAS bloqués) ----
    const sig = 's' + Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5,
      phone + JSON.stringify((d.items || []).map(i => [i.sku, i.qty, i.variant || '']).sort())));
    const firstId = cache.get(sig);
    let status = 'Nouvelle', note = '';
    if (isTest(d)) status = 'Test';
    else if (firstId || d.dup_of) { status = 'Doublon ?'; note = 'Même client et même panier que ' + (firstId || d.dup_of) + ' — vérifier avant expédition'; }
    else cache.put(sig, String(d.id), DUP_WINDOW_S);

    writeOrder(orders, d, now, phone, status, note);
    if (status === 'Nouvelle') sendMeta(Object.assign({}, d, { phone: phone }));
    if (status !== 'Test') {
      try { pushTajer({ id: d.id, date: now, name: d.name, phone: phone, city: d.city, address: d.address, items: d.items || [], total: d.total, note: note }); } catch (err) {}
    }
    return out(status === 'Nouvelle' ? 'ok' : status === 'Test' ? 'test' : 'duplicate');
  } catch (err) {
    console.error(err);
    return out('error');
  } finally {
    lock.releaseLock();
  }
}

function writeOrder(orders, d, now, phone, status, note) {
  const items = (d.items || []).map(i => i.qty + ' × ' + i.name + (i.variant ? ' (' + i.variant + ')' : '') + (i.mode && i.mode !== 'normal' ? ' [' + i.mode + ']' : '')).join('\n');
  const qty = (d.items || []).reduce((s, i) => s + Number(i.qty || 0), 0);
  orders.appendRow([now, d.id, status, d.name, "'" + phone, d.city, d.address, items, qty,
    Number(d.subtotal) || 0, Number(d.discount) || 0, Number(d.total) || 0, '', d.source || 'direct', d.page || '', d.device || '', note,
    d.campaign || '', d.content || '']);
}

function ensureHeaders(sh) {
  const h = sh.getRange(1, 1, 1, COLS.length).getValues()[0];
  if (h[17] !== COLS[17] || h[18] !== COLS[18]) sh.getRange(1, 18, 1, 2).setValues([[COLS[17], COLS[18]]]);
}

function findOrderRow(orders, id) {
  const last = orders.getLastRow();
  if (last < 2) return 0;
  const start = Math.max(2, last - 499);
  const ids = orders.getRange(start, 2, last - start + 1, 1).getValues().flat().map(String);
  const i = ids.lastIndexOf(id);
  return i < 0 ? 0 : start + i;
}

function normPhone(v) {
  let p = String(v || '').replace(/[^\d]/g, '');
  if (p.indexOf('00212') === 0) p = '0' + p.slice(5);
  else if (p.indexOf('212') === 0 && p.length === 12) p = '0' + p.slice(3);
  else if (p.length === 9 && /^[5-7]/.test(p)) p = '0' + p;
  return p;
}

function isTest(d) { return /\btest\b|تجربة/i.test(String(d.name || '')); }

function doGet() { return out('Dabadeal orders endpoint OK'); }
function out(msg) { return ContentService.createTextOutput(JSON.stringify({ status: msg })).setMimeType(ContentService.MimeType.JSON); }

// ---- Menu dans le Sheet : rétablir une commande mise de côté par erreur ----
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Dabadeal')
    .addItem('Rétablir la ligne bloquée sélectionnée', 'restoreBlocked')
    .addToUi();
}
function restoreBlocked() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getActiveSheet();
  if (sh.getName() !== 'Bloquées (anti-bot)') { SpreadsheetApp.getUi().alert('Sélectionne une ligne dans l\'onglet « Bloquées (anti-bot) ».'); return; }
  const row = sh.getActiveRange().getRow();
  if (row < 2) return;
  const d = JSON.parse(String(sh.getRange(row, 6).getValue() || '{}'));
  const orders = ss.getSheetByName('Commandes');
  ensureHeaders(orders);
  if (!d.id || findOrderRow(orders, String(d.id))) { SpreadsheetApp.getUi().alert('Commande introuvable ou déjà dans Commandes.'); return; }
  const phone = normPhone(d.phone);
  writeOrder(orders, d, new Date(d.date || Date.now()), phone, 'Nouvelle', 'Rétablie depuis Bloquées');
  sendMeta(Object.assign({}, d, { phone: phone }));
  pushTajer({ id: d.id, date: new Date(), name: d.name, phone: phone, city: d.city, address: d.address, items: d.items || [], total: d.total });
  sh.getRange(row, 2).setValue('RÉTABLIE — ' + sh.getRange(row, 2).getValue());
  SpreadsheetApp.getUi().alert('Commande ' + d.id + ' rétablie dans Commandes et Tajer.');
}

// ---- Meta Conversions API : envoie l'achat directement à Meta (fonctionne même avec bloqueur de pub) ----
const PIXEL_ID = '1600537651821693';
function sha(v) {
  v = String(v || '').trim().toLowerCase();
  if (!v) return undefined;
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, v, Utilities.Charset.UTF_8)
    .map(b => ('0' + (b & 255).toString(16)).slice(-2)).join('');
}
function sendMeta(d, testCode) {
  try {
    const props = PropertiesService.getScriptProperties();
    const token = props.getProperty('META_TOKEN');
    if (!token) return;
    const intl = d.phone ? '212' + String(d.phone).replace(/^0/, '') : '';
    const parts = String(d.name || '').trim().toLowerCase().split(/\s+/);
    const ev = {
      event_name: d.event || 'Purchase',
      event_time: Math.floor(Date.now() / 1000),
      event_id: String(d.id),
      action_source: 'website',
      event_source_url: d.url || 'https://dabadeal.ma/',
      user_data: {
        ph: [sha(intl)], external_id: [sha(intl)],
        fn: [sha(parts[0])], ln: [sha(parts.slice(1).join(' '))],
        ct: [sha(String(d.city || '').replace(/\s+/g, ''))], country: [sha('ma')],
        client_user_agent: d.ua || undefined, fbp: d.fbp || undefined, fbc: d.fbc || undefined
      },
      custom_data: {
        currency: 'MAD', value: Number(d.total) || 0,
        content_type: 'product', content_ids: (d.items || []).map(i => i.sku).filter(Boolean),
        num_items: (d.items || []).reduce((s, i) => s + Number(i.qty || 0), 0), order_id: String(d.id)
      }
    };
    const body = { data: [ev] };
    if (testCode) body.test_event_code = testCode;   // seulement depuis testMeta(), jamais pour les vraies commandes
    const res = UrlFetchApp.fetch('https://graph.facebook.com/v21.0/' + PIXEL_ID + '/events?access_token=' + encodeURIComponent(token),
      { method: 'post', contentType: 'application/json', payload: JSON.stringify(body), muteHttpExceptions: true });
    props.setProperty('META_LAST', new Date().toISOString() + ' ' + d.id + ' ' + res.getResponseCode() + ' ' + res.getContentText().slice(0, 300));
  } catch (err) {
    PropertiesService.getScriptProperties().setProperty('META_LAST', new Date().toISOString() + ' error ' + err);
  }
}

// À exécuter une fois depuis l'éditeur (bouton Exécuter) : donne au script l'autorisation d'appeler Meta,
// puis envoie un événement visible seulement dans « Tester les événements » (code META_TEST_CODE).
function testMeta() {
  const code = PropertiesService.getScriptProperties().getProperty('META_TEST_CODE');
  sendMeta({ id: 'TEST' + Date.now(), name: 'Test Dabadeal', phone: '0600000000', city: 'Casablanca', total: 1,
    items: [{ sku: 'TEST', qty: 1 }], url: 'https://dabadeal.ma/' }, code || 'TEST');
  Logger.log(PropertiesService.getScriptProperties().getProperty('META_LAST'));
}

// ---- TajerCOD : chaque commande est copiée dans l'onglet "Tajer", au format du modèle TajerCOD ----
// Colonnes : date_order, full_name, phone, address, sku, qte, price, note, delivery_note (une ligne par produit).
const TAJER_SKU = {
  'TJ-940': 'robinet-de-douche', 'TJ-793': 'sèche-linge-pliable', 'TJ-1299': 'self-heating-back',
  'TJ-692': 'coussin-de-soutien', 'TJ-9': 'footmass', 'TJ-1357': 'canne-pliante', 'TJ-494': 'banc-de-prière',
  'TJ-495': 'ceinture-de-grossesse', 'TJ-629': 'enregistreur-de-conduite', 'TJ-1287': 'brosse-à-vapeur-3-en-1'
};
function tajerSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('Tajer');
  if (!sh) {
    sh = ss.insertSheet('Tajer');
    sh.appendRow(['date_order', 'full_name', 'phone', 'address', 'sku', 'qte', 'price', 'note', 'delivery_note']);
    sh.setFrozenRows(1);
  }
  return sh;
}
function pushTajer(o) {
  const sh = tajerSheet();
  const items = o.items || [];
  const date = Utilities.formatDate(o.date instanceof Date ? o.date : new Date(o.date || Date.now()), 'Africa/Casablanca', 'yyyy-MM-dd HH:mm');
  items.forEach(function (it, k) {
    let note = 'Dabadeal ' + o.id;
    if (o.upsell) note += ' (ajout après commande, même client — à livrer dans le même colis)';
    else if (items.length > 1) note += ' (produit ' + (k + 1) + '/' + items.length + ', même commande, total ' + (Number(o.total) || 0) + ' DH)';
    if (it.variant) note += ' — ' + it.variant;
    if (o.note) note += ' — ' + o.note;
    sh.appendRow([date, o.name || '', "'" + String(o.phone || ''), (o.city ? o.city + ' - ' : '') + (o.address || ''),
      TAJER_SKU[it.sku] || it.sku || '', Number(it.qty) || 1, Number(it.line) || 0, note, '']);
  });
}
function setupTajer() { tajerSheet(); }
