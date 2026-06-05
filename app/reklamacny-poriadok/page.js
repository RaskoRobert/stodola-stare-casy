export const metadata = {
  "title": "Reklamačný poriadok — Stodola Staré časy",
  "description": "Reklamačný poriadok Stodola Staré časy: ako uplatniť reklamáciu, lehoty na jej vybavenie a kontaktné údaje prevádzkovateľa.",
  "alternates": {
    "canonical": "/reklamacny-poriadok"
  },
  "twitter": {
    "card": "summary_large_image"
  }
};

const HTML = "\r\n<section class=\"phero\">\r\n  <div class=\"wrap reveal\">\r\n    <nav class=\"crumbs reveal\" aria-label=\"Omrvinková navigácia\"><a class=\"crumb-back\" href=\"/\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 18l-6-6 6-6\"/></svg>Späť</a><ol class=\"crumb-trail\"><li><a href=\"/\">Domov</a></li><li aria-current=\"page\">Reklamačný poriadok</li></ol></nav>\r\n    \r\n    <div class=\"kicker\">Právne informácie</div>\r\n    <h1>Reklamačný poriadok</h1>\r\n  </div>\r\n</section>\r\n\r\n<section class=\"sec\">\r\n  <div class=\"wrap article\">\r\n    <div class=\"prose\">\r\n\r\n      <h2>Všeobecné ustanovenia</h2>\r\n      <p>Tento reklamačný poriadok upravuje spôsob a podmienky uplatnenia reklamácie služieb poskytovaných prevádzkovateľom <strong>JJ Solutions s.r.o.</strong>, JRD 77/A, 044&nbsp;11 Trstené pri&nbsp;Hornáde. Vzťahuje sa na služby objednané a poskytnuté v priestoroch Stodola Staré časy a je vypracovaný v súlade s príslušnými právnymi predpismi Slovenskej republiky.</p>\r\n\r\n      <h2>Uplatnenie reklamácie</h2>\r\n      <p>Reklamáciu môžete uplatniť bez zbytočného odkladu po zistení nedostatku, a to telefonicky na čísle <a href=\"tel:+421904942936\">0904 942 936</a>, e-mailom na adrese <a href=\"mailto:info@stodolastarecasy.sk\">info@stodolastarecasy.sk</a> alebo písomne na adrese JRD 77/A, 044&nbsp;11 Trstené pri&nbsp;Hornáde. Pri uplatnení reklamácie uveďte svoje kontaktné údaje, popis nedostatku a čoho sa reklamáciou domáhate.</p>\r\n\r\n      <h2>Lehoty na vybavenie</h2>\r\n      <p>O prijatí reklamácie vydáme zákazníkovi potvrdenie. Reklamáciu vybavíme v zákonnej lehote a o jej výsledku vás budeme informovať. Reklamáciu vybavíme najneskôr do 30 dní odo dňa jej uplatnenia.</p>\r\n\r\n      <h2>Záverečné ustanovenia</h2>\r\n      <p>Tento reklamačný poriadok nadobúda účinnosť dňom jeho zverejnenia. Prevádzkovateľ si vyhradzuje právo na jeho zmeny a doplnenia. Na vzťahy neupravené týmto reklamačným poriadkom sa vzťahujú príslušné ustanovenia platných právnych predpisov Slovenskej republiky.</p>\r\n    </div>\r\n  </div>\r\n</section>\r\n";

export default function Page() {
  return (
    <>
      <main id="obsah" dangerouslySetInnerHTML={{ __html: HTML }} />
    </>
  );
}
