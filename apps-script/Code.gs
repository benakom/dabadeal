/** @OnlyCurrentDoc */
// Dabadeal — réception des commandes du site dans ce Google Sheet, avec filtrage anti-bot.
const MAX_ORDERS_PER_PHONE_6H = 3;
const MIN_FILL_MS = 4000; // un humain met plus de 4 s à remplir le formulaire

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const orders = ss.getSheetByName('Commandes');
    const blocked = ss.getSheetByName('Bloquées (anti-bot)');
    const now = new Date();
    const phone = String(d.phone || '').replace(/[^\d]/g, '');

    if (d.type === 'upsell') {
      const id = String(d.order_id || '');
      if (!/^DD\d{6,8}$/.test(id)) return out('bad-id');
      const ids = orders.getRange(2, 2, Math.max(orders.getLastRow() - 1, 1), 1).getValues().flat();
      const idx = ids.indexOf(id);
      if (idx < 0) return out('not-found');
      const row = idx + 2;
      if (orders.getRange(row, 13).getValue()) return out('already');
      const total = Number(d.price) || 0;
      orders.getRange(row, 8).setValue(orders.getRange(row, 8).getValue() + ' + ' + d.name + ' (upsell)');
      orders.getRange(row, 12).setValue(Number(orders.getRange(row, 12).getValue()) + total);
      orders.getRange(row, 13).setValue(d.name + ' — ' + total + ' DH');
      return out('ok');
    }

    // ---- filtrage anti-bot ----
    let reason = '';
    if (d.hp) reason = 'Champ piège rempli (bot)';
    else if (!d.t || Number(d.t) < MIN_FILL_MS) reason = 'Formulaire rempli trop vite (' + d.t + ' ms)';
    else if (!d.human) reason = 'Aucune interaction humaine';
    else if (!/^0[567]\d{8}$/.test(phone)) reason = 'Téléphone invalide';
    else if (/https?:|www\.|<|>/i.test([d.name, d.city, d.address].join(' '))) reason = 'Lien ou code dans les champs';
    else if (String(d.name || '').trim().length < 5 || String(d.address || '').trim().length < 6) reason = 'Champs incomplets';
    else {
      const cache = CacheService.getScriptCache();
      const k = 'p' + phone, n = Number(cache.get(k) || 0);
      if (n >= MAX_ORDERS_PER_PHONE_6H) reason = 'Plus de ' + MAX_ORDERS_PER_PHONE_6H + ' commandes en 6 h pour ce numéro';
      else cache.put(k, String(n + 1), 21600);
      const sig = Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, phone + JSON.stringify(d.items || [])));
      if (!reason && cache.get('s' + sig)) reason = 'Commande identique en double (10 min)';
      else cache.put('s' + sig, '1', 600);
    }
    if (reason) {
      blocked.appendRow([now, reason, d.name || '', phone, d.city || '', JSON.stringify(d).slice(0, 4000)]);
      return out('blocked');
    }

    const items = (d.items || []).map(i => i.qty + ' × ' + i.name + (i.variant ? ' (' + i.variant + ')' : '') + (i.mode && i.mode !== 'normal' ? ' [' + i.mode + ']' : '')).join('\n');
    const qty = (d.items || []).reduce((s, i) => s + Number(i.qty || 0), 0);
    orders.appendRow([now, d.id, 'Nouvelle', d.name, "'" + phone, d.city, d.address, items, qty,
      Number(d.subtotal) || 0, Number(d.discount) || 0, Number(d.total) || 0, '', d.source || 'direct', d.page || '', d.device || '', '']);
    return out('ok');
  } catch (err) {
    return out('error');
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return out('Dabadeal orders endpoint OK'); }
function out(msg) { return ContentService.createTextOutput(JSON.stringify({ status: msg })).setMimeType(ContentService.MimeType.JSON); }
