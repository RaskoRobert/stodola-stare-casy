# Stodola Staré časy — webová stránka (Next.js)

Responzívny, rýchly web pre rodinnú reštauráciu a priestor na akcie
**Stodola Staré časy** v obci Trstené pri Hornáde (20 km od Košíc).

Web prezentuje podnik a jeho služby (svadby, oslavy, firemné a detské akcie,
kary, kultúrne podujatia), obsahuje kompletné menu, galériu, recenzie, blog a
samostatnú **rezervačnú stránku** s dopytovým formulárom.

Pôvodne statický web (HTML + CSS + JS) bol prepísaný do **Next.js (App Router)**
a je pripravený na nasadenie na **Vercel**. Dizajn, obsah aj správanie zostali
zachované 1:1 — pôvodné CSS a JavaScript sa používajú bez zmien.

---

## Ako spustiť lokálne

Potrebný je **Node.js 18.18+** (odporúčané 20+).

```bash
npm install      # nainštaluje závislosti (Next, React)
npm run dev      # vývojový server na http://localhost:3000
```

Ďalšie príkazy:

```bash
npm run build    # produkčný build (overí, že je všetko v poriadku)
npm start        # spustí produkčný build lokálne
```

> **Riešenie problémov (len lokálne, Windows):** ak `npm install` alebo build
> zlyhá s chybou `unable to verify the first certificate` / *Failed to load SWC
> binary*, váš firemný proxy alebo antivírus zachytáva HTTPS. Spustite príkaz so
> systémovými certifikátmi (Node 22+):
> ```powershell
> $env:NODE_OPTIONS="--use-system-ca"; npm install
> ```
> Týka sa to **iba tohto počítača** — nasadenie na Vercel (Linux) tým nie je dotknuté.

## Nasadenie na Vercel

1. Nahrajte repozitár na GitHub (alebo prepojte priamo).
2. Na [vercel.com](https://vercel.com) → **Add New… → Project** → vyberte repozitár.
3. Vercel automaticky rozpozná **Next.js** — netreba nič nastavovať
   (Framework Preset: Next.js, Build Command: `next build`).
4. Kliknite **Deploy**. Hotovo.

> Alternatívne cez CLI: `npm i -g vercel` a potom `vercel` v priečinku projektu.

Po nasadení nastavte vlastnú doménu (`stodolastarecasy.sk`) v sekcii
**Settings → Domains**. Adresy v `metadata`, `sitemap.xml` a structured data
používajú `https://www.stodolastarecasy.sk/` — ak bude doména iná, upravte ju
(`app/layout.js` → `metadataBase`, `public/sitemap.xml`).

---

## Štruktúra projektu

```
stodola-stare-casy/
├── app/                         # Next.js App Router — jedna zložka = jedna URL
│   ├── layout.js                # Spoločný rámec: <head>, hlavička, pätička, skripty
│   ├── globals.css              # Dizajn systém (pôvodné styles.css + fonty)
│   ├── page.js                  # Domovská stránka (/)
│   ├── not-found.js             # Stránka 404
│   ├── o-nas/page.js            # /o-nas
│   ├── menu/page.js             # /menu
│   ├── galeria/page.js          # /galeria
│   ├── kontakt/page.js          # /kontakt
│   ├── rezervacia/page.js       # /rezervacia (+ rezervačný formulár)
│   ├── svadby|oslavy|firemne|detske|kar|kulturne/page.js   # podujatia
│   ├── blog/page.js             # /blog (prehľad)
│   ├── blog/<slug>/page.js      # jednotlivé články
│   ├── ochrana-osobnych-udajov/page.js
│   └── reklamacny-poriadok/page.js
├── components/
│   ├── SiteHeader.js            # Spoločná hlavička
│   └── SiteFooter.js            # Spoločná pätička
├── public/                      # Statické súbory (servované z koreňa /)
│   ├── assets/                  # Obrázky, logá, favicony
│   ├── js/                      # main.js, rezervacia.js (pôvodné skripty)
│   ├── sitemap.xml, robots.txt, site.webmanifest
├── legacy/                      # Pôvodný statický web (archív, neservuje sa)
├── next.config.mjs
├── package.json
└── README.md
```

### Ako je to poskladané

- **`app/layout.js`** obsahuje spoločnú hlavičku, pätičku, pripojenie fontov,
  globálne CSS a načítanie `main.js`. Obsah každej stránky sa vkladá dovnútra.
- Každá **`page.js`** nesie svoje SEO `metadata` (title, description, canonical,
  Open Graph), prípadné **JSON-LD** structured data a samotný obsah stránky.
- Obsah pochádza z pôvodného HTML, takže vzhľad je identický. Stránky je možné
  postupne prepísať do plnohodnotných React komponentov, ak bude treba.

## Hlavné funkcie

- Responzívny layout, sticky header s mobilným menu (burger) a rozbaľovacím menu **Podujatia**.
- Scroll-reveal animácie, galéria s lightboxom, hero crossfade, typewriter, počítadlá.
- **Rezervačný formulár** s validáciou, anti-spam honeypotom, odoslaním cez
  **Formspree** a **mailto:** ako zálohou, plus predvýber typu akcie cez `?typ=`.
- **SEO:** unikátne `title`/`description`, canonical, Open Graph, `sitemap.xml`,
  `robots.txt` a structured data (JSON-LD: `Restaurant`, `Menu`, `BreadcrumbList`, `Article`).
- **GDPR cookie lišta**, prístupnosť (skip link, focus, aria, alt texty).

---

## ⚠️ Pred ostrým spustením — TODO pre klienta

1. **Formspree endpoint** — v `public/js/rezervacia.js` nahraďte placeholder
   `FORMSPREE_ENDPOINT` reálnym ID formulára z [formspree.io](https://formspree.io).
   Kým je placeholder, formulár sa odosiela cez e-mailového klienta (`mailto:`).
2. **Fotografie** v `public/assets/img/` sú ukážkové — nahraďte ich kvalitnými
   (~1600 px na šírku) pod rovnakými názvami.
3. **Recenzie** na stránkach sú reprezentatívne — nahraďte reálnymi Google
   recenziami. Hodnotenie: **4,5 ★ z 82+**.
4. **Otváracie hodiny** (Št 16–21 · Pi–So 16–24 · Ne 16–21, Po–St zatvorené) dajte
   potvrdiť — sú použité aj v JSON-LD na domovskej stránke.
5. **Právne stránky** `ochrana-osobnych-udajov` a `reklamacny-poriadok` sú
   **placeholdery** — nechajte ich právne skontrolovať.
6. **Doména** — viď sekcia *Nasadenie na Vercel* vyššie.

## Použité technológie

- Next.js 15 (App Router), React 19
- CSS3 (custom properties, grid, flexbox), vanilla JavaScript
- Fonty: Fraunces + Hanken Grotesk (Google Fonts)
- Štruktúrované dáta schema.org (JSON-LD)

---

> **Pôvodný statický web** je zachovaný v priečinku `legacy/` (neservuje sa,
> slúži len ako archív/referencia). Pokojne ho môžete zmazať.

© 2026 Stodola Staré časy · JJ Solutions s.r.o.
