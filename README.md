# Stodola Staré časy — webová stránka

Responzívny, rýchly web pre rodinnú reštauráciu a priestor na akcie
**Stodola Staré časy** v obci Trstené pri Hornáde (20 km od Košíc).

Web prezentuje reštauráciu a jej služby (svadby, oslavy, firemné a detské akcie,
kary, kultúrne podujatia), obsahuje kompletné menu, galériu, recenzie a
samostatnú **rezervačnú stránku** s dopytovým formulárom.

Postavené ako čisté **HTML + CSS + JavaScript** — bez frameworkov a bez build kroku.

---

## Štruktúra projektu

```
stodola-stare-casy/
├── index.html          # Domovská stránka
├── menu.html           # Kompletné menu a ponuka
├── rezervacia.html     # Rezervácia / nezáväzný dopyt
├── css/
│   └── styles.css      # Spoločný dizajn (dizajn systém, premenné)
├── assets/
│   ├── logo.png        # Logo (priehľadné pozadie)
│   └── img/            # Fotografie
├── docs/
│   ├── strategia.md    # Strategický podklad (štruktúra, SEO, sociálne siete)
│   └── prezentacia.html# Prezentácia stratégie (otvor v prehliadači)
├── .gitignore
└── README.md
```

## Ako spustiť lokálne

Nie je potrebný žiadny build. Buď stačí otvoriť `index.html` v prehliadači,
alebo (odporúčané) spustiť jednoduchý lokálny server:

```bash
# Python 3
python3 -m http.server 8000
# potom otvor http://localhost:8000

# alebo Node
npx serve
```

Vo VS Code funguje aj rozšírenie **Live Server** (pravý klik na `index.html` → *Open with Live Server*).

## Práca v Claude Code

```bash
cd stodola-stare-casy
claude
```

Potom môžeš zadávať úlohy v prirodzenom jazyku, napr.:
- „Pridaj samostatnú podstránku pre svadby podľa docs/strategia.md."
- „Vytvor blogovú sekciu a prvé tri články."
- „Externalizuj inline JavaScript do js/main.js."

## Nahranie na GitHub

```bash
cd stodola-stare-casy
git init
git add .
git commit -m "Stodola Staré časy — nový web (prvá verzia)"

# vytvor prázdny repozitár na github.com a potom:
git branch -M main
git remote add origin https://github.com/POUZIVATEL/stodola-stare-casy.git
git push -u origin main
```

## Nasadenie (zdarma)

- **GitHub Pages:** Settings → Pages → Source: `main` / root. Web pôjde na
  `https://POUZIVATEL.github.io/stodola-stare-casy/`.
- **Netlify / Vercel:** stačí pretiahnuť priečinok do rozhrania (drag & drop)
  alebo prepojiť GitHub repozitár. Žiadne nastavenia buildu.

---

## Dôležité — pred ostrým spustením

1. **Fotografie** v `assets/img/` sú zatiaľ ukážkové (z dostupných podkladov,
   niektoré v nižšom rozlíšení). Nahraď ich vlastnými kvalitnými fotkami pod
   rovnakými názvami: `hero.jpg`, `vyzdoba.jpg`, `jedlo.jpg`, `kapela.jpg`,
   `maj.jpg`, `gulas.jpg`, `halloween.jpg`, `tekvice.jpg`, `deti.jpg`.
   Ideálne v rozlíšení ~1600 px na šírku, formát JPG/WebP.
2. **Recenzie** na domovskej stránke (sekcia *Recenzie*) sú reprezentatívne —
   nahraď ich reálnymi Google recenziami, prípadne nasaď živý Google widget.
   Aktuálne hodnotenie: **4,5 ★ z 82+ recenzií** (Google / Restaurant Guru).
3. **Rezervačný formulár** zatiaľ funguje cez `mailto:` (otvorí e-mailového
   klienta s predvyplneným dopytom na info@stodolastarecasy.sk). Pre plnú
   automatizáciu (uloženie do DB, potvrdzovací e-mail, kalendár dostupnosti)
   treba doplniť backend alebo službu ako Formspree / Netlify Forms.
4. **Kontaktné údaje** sú zjednotené na oficiálne číslo **0904 942 936**.

## Použité technológie

- HTML5, CSS3 (custom properties, grid, flexbox), vanilla JavaScript
- Fonty: Fraunces + Hanken Grotesk (Google Fonts)
- Google Maps embed, IntersectionObserver pre animácie pri scrollovaní

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
