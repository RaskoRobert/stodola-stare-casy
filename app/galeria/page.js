export const metadata = {
  "title": "Galéria — Stodola Staré časy",
  "description": "Fotogaléria Stodoly Staré časy — svadby, oslavy, kultúrne akcie a jedlo z vlastnej kuchyne. Rodinný priestor na akcie 20 km od Košíc.",
  "alternates": {
    "canonical": "/galeria"
  },
  "openGraph": {
    "type": "website",
    "locale": "sk_SK",
    "siteName": "Stodola Staré časy",
    "title": "Galéria — Stodola Staré časy",
    "description": "Svadby, oslavy, kultúrne akcie a jedlo z vlastnej kuchyne.",
    "url": "/galeria",
    "images": [
      "/assets/img/vyzdoba.jpg"
    ]
  },
  "twitter": {
    "card": "summary_large_image"
  }
};

const HTML = "\r\n<section class=\"phero\">\r\n  <div class=\"wrap reveal\">\r\n    <nav class=\"crumbs\" aria-label=\"Omrvinková navigácia\"><a class=\"crumb-back\" href=\"/\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 18l-6-6 6-6\"/></svg>Späť</a><ol class=\"crumb-trail\"><li><a href=\"/\">Domov</a></li><li aria-current=\"page\">Galéria</li></ol></nav>\r\n    <div class=\"kicker\">Galéria</div>\r\n    <h1>Ako to u nás <span class=\"em\">žije</span></h1>\r\n    <p class=\"lead\">Nazrite do našej stodoly — svadby, oslavy, kultúrne akcie aj jedlo z vlastnej kuchyne.</p>\r\n  </div>\r\n</section>\r\n\r\n<section class=\"sec\">\r\n  <div class=\"wrap\">\r\n    <div class=\"mcat reveal\">\r\n      <div class=\"h\"><h2>Svadby, oslavy &amp; priestor</h2><span class=\"ln\"></span></div>\r\n      <div class=\"gal mt\" data-lightbox><a href=\"/assets/img/vyzdoba.jpg\"><img loading=\"lazy\" width=\"600\" height=\"600\" src=\"/assets/img/vyzdoba.jpg\" alt=\"Svadobná výzdoba\"><span class=\"cap2\">Svadobná výzdoba</span></a><a href=\"/assets/img/kapela.jpg\"><img loading=\"lazy\" width=\"600\" height=\"600\" src=\"/assets/img/kapela.jpg\" alt=\"Živá hudba\"><span class=\"cap2\">Živá hudba</span></a><a href=\"/assets/img/jedlo.jpg\"><img loading=\"lazy\" width=\"600\" height=\"600\" src=\"/assets/img/jedlo.jpg\" alt=\"Naše jedlo\"><span class=\"cap2\">Naše jedlo</span></a></div>\r\n    </div>\r\n    <div class=\"mcat reveal\">\r\n      <div class=\"h\"><h2>Kultúrne akcie &amp; tradície</h2><span class=\"ln\"></span></div>\r\n      <div class=\"gal mt\" data-lightbox><a href=\"/assets/img/maj.jpg\"><img loading=\"lazy\" width=\"600\" height=\"600\" src=\"/assets/img/maj.jpg\" alt=\"Stavanie mája\"><span class=\"cap2\">Stavanie mája</span></a><a href=\"/assets/img/halloween.jpg\"><img loading=\"lazy\" width=\"600\" height=\"600\" src=\"/assets/img/halloween.jpg\" alt=\"Halloween párty\"><span class=\"cap2\">Halloween párty</span></a><a href=\"/assets/img/gulas.jpg\"><img loading=\"lazy\" width=\"600\" height=\"600\" src=\"/assets/img/gulas.jpg\" alt=\"Súťaž vo varení guláša\"><span class=\"cap2\">Súťaž vo varení guláša</span></a><a href=\"/assets/img/tekvice.jpg\"><img loading=\"lazy\" width=\"600\" height=\"600\" src=\"/assets/img/tekvice.jpg\" alt=\"Vyrezávanie tekvíc\"><span class=\"cap2\">Vyrezávanie tekvíc</span></a><a href=\"/assets/img/deti.jpg\"><img loading=\"lazy\" width=\"600\" height=\"600\" src=\"/assets/img/deti.jpg\" alt=\"Deň detí\"><span class=\"cap2\">Deň detí</span></a></div>\r\n    </div>\r\n    <div class=\"center mt2 reveal\"><a class=\"btn btn-ghost\" href=\"https://www.instagram.com/stodola_stare_casy/\" target=\"_blank\" rel=\"noopener\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.5\" cy=\"6.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/></svg>Sledujte nás na Instagrame</a></div>\r\n  </div>\r\n</section>\r\n";

export default function Page() {
  return (
    <>
      <main id="obsah" dangerouslySetInnerHTML={{ __html: HTML }} />
    </>
  );
}
