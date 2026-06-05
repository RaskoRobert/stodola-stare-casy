export const metadata = {
  "title": "Ochrana osobných údajov — Stodola Staré časy",
  "description": "Zásady ochrany osobných údajov Stodola Staré časy: aké údaje spracúvame, na aký účel, ako dlho ich uchovávame a aké práva máte podľa GDPR.",
  "alternates": {
    "canonical": "/ochrana-osobnych-udajov"
  },
  "twitter": {
    "card": "summary_large_image"
  }
};

const HTML = "\r\n<section class=\"phero\">\r\n  <div class=\"wrap reveal\">\r\n    <nav class=\"crumbs reveal\" aria-label=\"Omrvinková navigácia\"><a class=\"crumb-back\" href=\"/\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 18l-6-6 6-6\"/></svg>Späť</a><ol class=\"crumb-trail\"><li><a href=\"/\">Domov</a></li><li aria-current=\"page\">Ochrana osobných údajov</li></ol></nav>\r\n    \r\n    <div class=\"kicker\">Právne informácie</div>\r\n    <h1>Ochrana osobných údajov</h1>\r\n  </div>\r\n</section>\r\n\r\n<section class=\"sec\">\r\n  <div class=\"wrap article\">\r\n    <div class=\"prose\">\r\n\r\n      <h2>Prevádzkovateľ</h2>\r\n      <p>Prevádzkovateľom osobných údajov je spoločnosť <strong>JJ Solutions s.r.o.</strong>, JRD 77/A, 044&nbsp;11 Trstené pri&nbsp;Hornáde. V&nbsp;otázkach ochrany osobných údajov nás môžete kontaktovať na e-maile <a href=\"mailto:info@stodolastarecasy.sk\">info@stodolastarecasy.sk</a> alebo telefonicky na čísle <a href=\"tel:+421904942936\">0904 942 936</a>.</p>\r\n\r\n      <h2>Aké údaje spracúvame</h2>\r\n      <p>Spracúvame iba údaje, ktoré nám sami poskytnete pri kontaktovaní alebo vyplnení rezervačného formulára: meno a priezvisko, telefónne číslo, e-mailovú adresu a údaje, ktoré uvediete v rezervačnom formulári (napríklad typ podujatia, predpokladaný počet hostí, termín a vašu správu).</p>\r\n\r\n      <h2>Účel a právny základ</h2>\r\n      <p>Vaše údaje spracúvame na účel vybavenia vášho nezáväzného dopytu alebo rezervácie a komunikácie s vami. Právnym základom je vykonanie opatrení pred uzatvorením zmluvy na základe vašej žiadosti, prípadne náš oprávnený záujem odpovedať na vaše otázky.</p>\r\n\r\n      <h2>Doba uchovávania</h2>\r\n      <p>Osobné údaje uchovávame len po dobu nevyhnutnú na vybavenie vášho dopytu alebo rezervácie a na splnenie zákonných povinností. Po uplynutí tejto doby údaje bezpečne vymažeme. Údaje z dopytov a rezervácií uchovávame najviac 24 mesiacov, ak osobitný predpis nevyžaduje dlhšiu dobu.</p>\r\n\r\n      <h2>Príjemcovia a sprostredkovatelia</h2>\r\n      <p>Vaše údaje môžu spracúvať aj naši sprostredkovatelia, ktorí nám poskytujú technické služby — napríklad e-mailová a hostingová služba. Vaše údaje neposkytujeme tretím stranám na marketingové účely.</p>\r\n\r\n      <h2>Vaše práva podľa GDPR</h2>\r\n      <p>V súvislosti so spracúvaním osobných údajov máte právo na prístup k svojim údajom, na ich opravu, výmaz a obmedzenie spracúvania, právo namietať proti spracúvaniu a právo na prenosnosť údajov. Máte tiež právo podať sťažnosť na Úrad na ochranu osobných údajov Slovenskej republiky. Pre uplatnenie svojich práv nás kontaktujte na <a href=\"mailto:info@stodolastarecasy.sk\">info@stodolastarecasy.sk</a>.</p>\r\n\r\n      <h2>Cookies</h2>\r\n      <p>Tento web používa iba nevyhnutné cookies potrebné na jeho správne fungovanie. Nepoužívame ich na sledovanie ani na marketingové účely.</p>\r\n    </div>\r\n  </div>\r\n</section>\r\n";

export default function Page() {
  return (
    <>
      <main id="obsah" dangerouslySetInnerHTML={{ __html: HTML }} />
    </>
  );
}
