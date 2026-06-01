# Stodola Staré časy — webová stránka

Responzívny, rýchly web pre rodinnú reštauráciu a priestor na akcie
**Stodola Staré časy** v obci Trstené pri Hornáde (20 km od Košíc).

Web prezentuje podnik a jeho služby (svadby, oslavy, firemné a detské akcie,
kary, kultúrne podujatia), obsahuje kompletné menu, galériu, recenzie, blog a
samostatnú **rezervačnú stránku** s dopytovým formulárom.

Postavené ako čisté **HTML + CSS + JavaScript** — bez frameworkov a bez build kroku.

---

## Štruktúra projektu

```
stodola-stare-casy/
├── index.html                  # Domovská stránka
├── menu.html                   # Kompletné menu a ponuka
├── rezervacia.html             # Rezervácia / nezáväzný dopyt
├── svadby.html                 # Podstránka — svadby a obrady
├── oslavy.html                 # Podstránka — rodinné oslavy
├── firemne.html                # Podstránka — firemné podujatia
├── detske.html                 # Podstránka — detské oslavy
├── kar.html                    # Podstránka — smútočné posedenia (kar)
├── kulturne.html               # Podstránka — kultúrne a komunitné akcie
├── blog.html                   # Blog / magazín (prehľad)
├── blog/                       # Články
│   ├── svadba-pri-kosiciach.html
│   ├── ako-zabezpecit-kar.html
│   └── firemny-vecierok-pri-kosiciach.html
├── 404.html                    # Chybová stránka (absolútne cesty)
├── ochrana-osobnych-udajov.html# Zásady ochrany údajov (placeholder — TODO)
├── reklamacny-poriadok.html    # Reklamačný poriadok (placeholder — TODO)
├── css/
│   └── styles.css              # Spoločný dizajn (dizajn systém, premenné)
├── js/
│   ├── main.js                 # Header, mobilné menu, reveal, lightbox, cookie lišta
│   └── rezervacia.js           # Logika rezervačného formulára
├── assets/
│   ├── logo.png                # Logo (priehľadné pozadie)
│   ├── favicon-16.png, favicon-32.png, apple-touch-icon.png
│   └── img/                    # Fotografie
├── sitemap.xml
├── robots.txt
├── site.webmanifest
└── README.md
```

## Ako spustiť lokálne

Nie je potrebný žiadny build. Stačí otvoriť `index.html` v prehliadači,
alebo (odporúčané) spustiť jednoduchý lokálny server:

```bash
# Python 3
python3 -m http.server 8000
# potom otvor http://localhost:8000

# alebo Node
npx serve
```

> **Pozn.:** Rezervačný formulár (odoslanie, mailto) a relatívne odkazy fungujú
> najlepšie cez lokálny server, nie cez `file://`.

## Hlavné funkcie

- Responzívny layout, sticky header s mobilným menu (burger) a rozbaľovacím menu **Podujatia**.
- Scroll-reveal animácie (rešpektujú `prefers-reduced-motion`).
- **Galéria s lightboxom** (čistý vanilla JS, ovládanie šípkami a Esc).
- **Rezervačný formulár** s validáciou, anti-spam honeypotom, odoslaním cez
  **Formspree** a **mailto:** ako zálohou, plus predvýber typu akcie cez `?typ=`.
- **SEO:** unikátne `title`/`description`, canonical, Open Graph + Twitter meta,
  `sitemap.xml`, `robots.txt` a structured data (JSON-LD: `Restaurant`, `Menu`,
  `BreadcrumbList`, `Article`).
- **Prístupnosť:** „preskočiť na obsah", viditeľný focus, aria atribúty,
  zmysluplné alt texty.
- **GDPR cookie lišta** s uložením súhlasu v `localStorage`.

## Nasadenie (zdarma)

- **GitHub Pages:** Settings → Pages → Source: `main` / root.
  - Ak používate **vlastnú doménu** (napr. `stodolastarecasy.sk`), všetko funguje vrátane `404.html`.
  - Pri adrese typu `pouzivatel.github.io/stodola-stare-casy/` má `404.html` absolútne
    cesty (`/css/...`) — funguje len na koreni domény. Pre projektový subpath nasaďte
    radšej na vlastnú doménu alebo Netlify.
- **Netlify / Vercel:** pretiahnite priečinok (drag & drop) alebo prepojte repozitár.
  Žiadne nastavenia buildu. Netlify navyše vie spracovať formulár aj bez Formspree
  (stačí pridať `netlify` atribút do `<form>`).

---

## ⚠️ Pred ostrým spustením — TODO pre klienta

1. **Formspree endpoint** — v `js/rezervacia.js` nahraďte placeholder
   `FORMSPREE_ENDPOINT` reálnym ID formulára z [formspree.io](https://formspree.io)
   (zaregistrujte sa, overte `info@stodolastarecasy.sk`). Kým je placeholder, formulár
   sa odosiela cez e-mailového klienta (`mailto:`).
2. **Fotografie** v `assets/img/` sú ukážkové. Nahraďte ich kvalitnými (~1600 px na
   šírku, JPG/WebP) pod rovnakými názvami: `hero.jpg`, `vyzdoba.jpg`, `jedlo.jpg`,
   `kapela.jpg`, `maj.jpg`, `gulas.jpg`, `halloween.jpg`, `tekvice.jpg`, `deti.jpg`.
3. **Recenzie** na domovskej stránke aj podstránkach sú reprezentatívne — nahraďte
   reálnymi Google recenziami alebo nasaďte živý widget. Hodnotenie: **4,5 ★ z 82+**.
4. **Otváracie hodiny** (Št 16–21 · Pi–So 16–24 · Ne 16–21, Po–St zatvorené) dajte
   klientovi **potvrdiť** — sú použité aj v JSON-LD na domovskej stránke.
5. **GPS súradnice** pre mapu — momentálne sa používa textová adresa. Doplňte presné
   súradnice, ak ich klient dodá.
6. **Právne stránky** `ochrana-osobnych-udajov.html` a `reklamacny-poriadok.html` sú
   **placeholdery** — nechajte ich právne skontrolovať a doplniť.
7. **Favicon** je vygenerovaný z loga (`assets/favicon-*.png`). Ak má klient
   štvorcový variant loga, ideálne ho použiť pre ostrejšiu ikonu.
8. **Doména v meta** — všetky `canonical`/`og:url`/`sitemap.xml` používajú
   `https://www.stodolastarecasy.sk/`. Ak bude doména iná, prepíšte ju.

## Použité technológie

- HTML5, CSS3 (custom properties, grid, flexbox), vanilla JavaScript
- Fonty: Fraunces + Hanken Grotesk (Google Fonts)
- Google Maps embed, IntersectionObserver pre animácie
- Štruktúrované dáta schema.org (JSON-LD)

## Farby (dizajn systém)

| Premenná | Hodnota | Použitie |
|---|---|---|
| `--cream` | `#FAF4EB` | Pozadie |
| `--ink` | `#382820` | Tmavohnedý text (namiesto čiernej) |
| `--brick` | `#9E5644` | Hlavná značková farba (z loga) |
| `--rose` | `#C4868B` | Staro-ružový akcent |
| `--gold` | `#D2A24C` | Hviezdičky / drobné akcenty |

---

© 2026 Stodola Staré časy · JJ Solutions s.r.o.
