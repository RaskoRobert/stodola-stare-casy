export const metadata = {
  title: "Stránka sa nenašla (404) — Stodola Staré časy",
  description: "Stránku, ktorú hľadáte, sa nám nepodarilo nájsť. Vráťte sa na úvodnú stránku alebo si overte voľný termín v Stodole Staré časy.",
  robots: { index: false, follow: true },
};

const HTML = "\r\n<section class=\"phero\">\r\n  <div class=\"wrap reveal center\">\r\n    <div class=\"kicker center\">Chyba 404</div>\r\n    <h1 style=\"font-size:clamp(64px,18vw,160px);line-height:1\">404</h1>\r\n    <h2>Túto stránku sme nenašli</h2>\r\n    <p class=\"lead mt\" style=\"margin-inline:auto\">Mrzí nás to — stránka, ktorú hľadáte, neexistuje alebo bola presunutá. Skúste sa vrátiť na úvodnú stránku alebo si rovno overte voľný termín.</p>\r\n    <div class=\"hero-cta center\" style=\"margin-top:24px;justify-content:center\">\r\n      <a class=\"btn btn-primary\" href=\"/#top\">Domov</a>\r\n      <a class=\"btn btn-ghost\" href=\"/rezervacia\">Rezervovať termín</a>\r\n    </div>\r\n  </div>\r\n</section>\r\n";

export default function NotFound() {
  return <main id="obsah" dangerouslySetInnerHTML={{ __html: HTML }} />;
}
