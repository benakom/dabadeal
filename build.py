"""Build static, pre-rendered, SEO-ready pages for dabadeal.ma.
Run from repo root: python3 build.py  (needs playwright + a free port 8799)"""
import json, os, subprocess, time, html, datetime
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = "https://dabadeal.ma"
V = str(int(time.time()))[-6:]
TPL = open(os.path.join(ROOT, "template.html"), encoding="utf-8").read()
TODAY = datetime.date.today().isoformat()

CAT_SEO = {
  "raha":    ("منتوجات الراحة والصحة | Produits bien-être et confort au Maroc – Dabadeal",
              "حزام الظهر، وسادة الطوموبيل، جهاز تدليك الرجلين، عكاز بمقعد، كرسي الصلاة وحزام الحمل. Livraison gratuite au Maroc et paiement à la livraison."),
  "dar":     ("منتوجات الدار | Robinet chauffant, sèche-linge pliable – Dabadeal Maroc",
              "حنفية الما السخون الكهربائية، نشافة الحوايج القابلة للطي وفرشاة البخار للقطط. Livraison gratuite partout au Maroc, paiement à la livraison."),
  "tomobil": ("منتوجات الطوموبيل | Caméra voiture 3 objectifs, coussins auto – Dabadeal",
              "كاميرا الطوموبيل 3 عدسات ووسادات الرقبة والظهر. Dashcam Full HD au Maroc, livraison gratuite et paiement à la livraison."),
}

def write(path, page, head, main=""):
    out = TPL.replace("{{HEAD}}", head).replace("{{PAGE}}", page).replace("{{V}}", V)
    out = out.replace('<main id="app">{{MAIN}}</main>', f'<main id="app"{" data-pre=\"1\"" if main else ""}>{main}</main>')
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full) or ROOT, exist_ok=True)
    open(full, "w", encoding="utf-8").write(out)

def esc(s): return html.escape(s, quote=True)

def head(title, desc, url, image, ld):
    return "\n".join([
        f"<title>{esc(title)}</title>",
        f'<meta name="description" content="{esc(desc)}">',
        f'<link rel="canonical" href="{url}">',
        '<meta name="robots" content="index,follow,max-image-preview:large">',
        '<meta property="og:type" content="website"><meta property="og:site_name" content="Dabadeal"><meta property="og:locale" content="ar_MA"><meta property="og:locale:alternate" content="fr_MA">',
        f'<meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(desc)}">',
        f'<meta property="og:image" content="{image}"><meta property="og:url" content="{url}">',
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="geo.region" content="MA">',
        "".join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>' for x in ld),
    ])

ORG = {"@context": "https://schema.org", "@type": "Organization", "name": "Dabadeal", "url": SITE + "/",
       "logo": SITE + "/img/logo-dark.png", "areaServed": "MA"}
WEBSITE = {"@context": "https://schema.org", "@type": "WebSite", "name": "Dabadeal", "url": SITE + "/", "inLanguage": ["ar-MA", "fr-MA"]}

def crumbs(items):
    return {"@context": "https://schema.org", "@type": "BreadcrumbList",
            "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": u} for i, (n, u) in enumerate(items)]}

def main():
    srv = subprocess.Popen(["python3", "-m", "http.server", "8799"], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1)
    try:
        with sync_playwright() as pw:
            b = pw.chromium.launch(); pg = b.new_page(viewport={"width": 390, "height": 844})
            # read catalogue from the app
            write("index.html", "", "<title>Dabadeal</title>")
            pg.goto("http://localhost:8799/"); pg.wait_for_timeout(500)
            P = pg.evaluate("P"); FR = pg.evaluate("FR"); CATS = pg.evaluate("CATS"); CATSLUG = pg.evaluate("CATSLUG")
            pages = [("index.html", "", "/")] + [(f"c/{k}/index.html", f"c-{k}", f"/c/{k}/") for k in CATS] + \
                    [(f"p/{p['id']}/index.html", f"p-{p['id']}", f"/p/{p['id']}/") for p in P]
            urls = []
            for path, page, rel in pages:
                url = SITE + rel; urls.append(url)
                if page == "":
                    t = "Dabadeal | متجر أونلاين بالمغرب — الخلاص عند الاستلام، التوصيل مجاني"
                    d = "Dabadeal: منتوجات مختارة للراحة، الدار والطوموبيل. التوصيل مجاني لجميع مدن المغرب والخلاص عند الاستلام. Boutique en ligne au Maroc, paiement à la livraison."
                    ld = [ORG, WEBSITE, {"@context": "https://schema.org", "@type": "ItemList", "itemListElement": [
                        {"@type": "ListItem", "position": i + 1, "url": f"{SITE}/p/{p['id']}/", "name": p["name"]} for i, p in enumerate(P)]}]
                    img = SITE + "/img/robinet_0.webp"
                elif page.startswith("c-"):
                    k = page[2:]; t, d = CAT_SEO[k]; c = CATS[k]
                    items = [p for p in P if p["cat"] == c["key"]]
                    ld = [crumbs([("الرئيسية", SITE + "/"), (c["h1"], url)]),
                          {"@context": "https://schema.org", "@type": "CollectionPage", "name": c["h1"], "url": url, "description": d,
                           "mainEntity": {"@type": "ItemList", "itemListElement": [
                               {"@type": "ListItem", "position": i + 1, "url": f"{SITE}/p/{p['id']}/", "name": p["name"]} for i, p in enumerate(items)]}}]
                    img = SITE + items[0]["img"][0].replace(".jpg", ".webp")
                else:
                    p = next(x for x in P if x["id"] == page[2:]); fr = FR[p["id"]]
                    t = f"{p['name']} | {fr['t']} au Maroc – {p['price']} DH | Dabadeal"
                    d = f"{p['hook']}. {fr['t']} à {p['price']} DH au lieu de {p['compare']} DH. التوصيل مجاني لجميع المدن والخلاص عند الاستلام."
                    imgs = [SITE + i.replace(".jpg", ".webp") for i in p["img"]]
                    img = imgs[0]
                    cslug = CATSLUG[p["cat"]]
                    product = {"@context": "https://schema.org", "@type": "Product", "name": p["name"], "alternateName": fr["t"],
                               "image": imgs, "description": p["lead"] + " " + fr["d"], "sku": p["sku"],
                               "brand": {"@type": "Brand", "name": "Dabadeal"}, "category": p["catL"],
                               "offers": {"@type": "Offer", "url": url, "priceCurrency": "MAD", "price": str(p["price"]),
                                          "priceValidUntil": "2027-03-31", "availability": "https://schema.org/InStock",
                                          "itemCondition": "https://schema.org/NewCondition", "seller": {"@type": "Organization", "name": "Dabadeal"},
                                          "shippingDetails": {"@type": "OfferShippingDetails",
                                              "shippingRate": {"@type": "MonetaryAmount", "value": "0", "currency": "MAD"},
                                              "shippingDestination": {"@type": "DefinedRegion", "addressCountry": "MA"},
                                              "deliveryTime": {"@type": "ShippingDeliveryTime",
                                                  "handlingTime": {"@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY"},
                                                  "transitTime": {"@type": "QuantitativeValue", "minValue": 1, "maxValue": 3, "unitCode": "DAY"}}}}}
                    faqs = p["faq"] + [["واش كنخلص قبل؟", "لا، كتخلص كاش ملي توصلك السلعة."], ["شحال كياخد التوصيل؟", "بين 24 و72 ساعة، والتوصيل مجاني."]]
                    ld = [product,
                          crumbs([("الرئيسية", SITE + "/"), (p["catL"], f"{SITE}/c/{cslug}/"), (p["name"], url)]),
                          {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
                              {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs]}]
                h = head(t, d, url, img, ld)
                write(path, page, h)
                pg.goto("http://localhost:8799" + rel); pg.wait_for_timeout(450)
                main_html = pg.inner_html("#app")
                write(path, page, h, main_html)
                print("built", rel, len(main_html))
            b.close()
        sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
        for u in urls:
            pr = "1.0" if u.endswith(".ma/") else ("0.9" if "/p/" in u else "0.8")
            sm.append(f"<url><loc>{u}</loc><lastmod>{TODAY}</lastmod><changefreq>weekly</changefreq><priority>{pr}</priority></url>")
        sm.append("</urlset>")
        open(os.path.join(ROOT, "sitemap.xml"), "w").write("\n".join(sm) + "\n")
    finally:
        srv.terminate()

if __name__ == "__main__":
    main()
