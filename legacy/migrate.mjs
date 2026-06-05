// One-shot migrator: converts the original static HTML site into Next.js App Router files.
// Run once with `node migrate.mjs`. Reads the original *.html/css/js in place and writes
// app/, components/, and public/ outputs. Original sources are left untouched (archived
// into legacy/ in a separate step).
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const write = (p, c) => {
  const full = path.join(ROOT, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, c);
  console.log("  wrote", p);
};

// ── HTML entity decode (for <title>/meta text → metadata strings) ──────────────
function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

// ── Transform internal links + asset paths inside body/content HTML ────────────
function fixContent(html) {
  // relative/absolute *.html links → clean Next routes
  html = html.replace(
    /(href|src)="(\.\.\/|\/)?(blog\/)?([\w-]+)\.html(#[\w-]*|\?[^"]*)?"/g,
    (m, attr, up, blog, name, tail) => {
      const route = blog
        ? "/blog/" + name
        : name === "index"
        ? "/"
        : "/" + name;
      return `${attr}="${route}${tail || ""}"`;
    }
  );
  // absolute self-links in content → relative, strip .html
  html = html.replace(
    /https:\/\/www\.stodolastarecasy\.sk(\/[^\s"')]*?)\.html/g,
    "$1"
  );
  // asset paths (./assets, ../assets, assets) → /assets  (covers src, href and url())
  html = html.replace(/(?:\.\.\/)?assets\//g, "/assets/");
  return html;
}

// ── JSON-LD: strip .html from schema URLs ──────────────────────────────────────
const fixLd = (txt) => txt.replace(/\.html/g, "");

// ── Extractors ─────────────────────────────────────────────────────────────────
const grab = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : null;
};
const extractMain = (html) =>
  grab(html, /<main id="obsah">([\s\S]*?)<\/main>/) || "";
const extractTitle = (html) =>
  decode((grab(html, /<title>([\s\S]*?)<\/title>/) || "").trim());
const meta = (html, key) =>
  grab(html, new RegExp(`(?:name|property)="${key}"\\s+content="([^"]*)"`));
const extractLd = (html) => {
  const out = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) out.push(fixLd(m[1].trim()));
  return out;
};

const toRel = (url) =>
  url
    ? url.replace("https://www.stodolastarecasy.sk", "").replace(/\.html$/, "") ||
      "/"
    : null;

function buildMeta(html) {
  const m = {
    title: extractTitle(html),
    description: decode(meta(html, "description") || ""),
  };
  const canonical = toRel(grab(html, /rel="canonical" href="([^"]*)"/));
  if (canonical) m.alternates = { canonical };
  const ogTitle = meta(html, "og:title");
  if (ogTitle) {
    m.openGraph = {
      type: meta(html, "og:type") || "website",
      locale: meta(html, "og:locale") || "sk_SK",
      siteName: meta(html, "og:site_name") || "Stodola Staré časy",
      title: decode(ogTitle),
      description: decode(meta(html, "og:description") || ""),
      url: toRel(meta(html, "og:url")),
      images: [meta(html, "og:image").replace("https://www.stodolastarecasy.sk", "")],
    };
  }
  m.twitter = { card: meta(html, "twitter:card") || "summary_large_image" };
  return m;
}

// ── Page generator ──────────────────────────────────────────────────────────────
function genPage(p) {
  const html = read(p.src);
  const main = fixContent(extractMain(html));
  const ld = extractLd(html);
  const m = buildMeta(html);

  let out = "";
  if (p.extraScript) out += `import Script from "next/script";\n\n`;
  out += `export const metadata = ${JSON.stringify(m, null, 2)};\n\n`;
  if (ld.length) out += `const LD = ${JSON.stringify(ld)};\n`;
  out += `const HTML = ${JSON.stringify(main)};\n\n`;
  out += `export default function Page() {\n  return (\n    <>\n`;
  if (ld.length)
    out +=
      `      {LD.map((s, i) => (\n` +
      `        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: s }} />\n` +
      `      ))}\n`;
  out += `      <main id="obsah" dangerouslySetInnerHTML={{ __html: HTML }} />\n`;
  if (p.extraScript)
    out += `      <Script src="${p.extraScript}" strategy="afterInteractive" />\n`;
  out += `    </>\n  );\n}\n`;
  write(p.out, out);
}

// ── Pages map ─────────────────────────────────────────────────────────────────
const pages = [
  { src: "index.html", out: "app/page.js" },
  { src: "o-nas.html", out: "app/o-nas/page.js" },
  { src: "galeria.html", out: "app/galeria/page.js" },
  { src: "menu.html", out: "app/menu/page.js" },
  { src: "kontakt.html", out: "app/kontakt/page.js" },
  { src: "rezervacia.html", out: "app/rezervacia/page.js", extraScript: "/js/rezervacia.js" },
  { src: "svadby.html", out: "app/svadby/page.js" },
  { src: "oslavy.html", out: "app/oslavy/page.js" },
  { src: "firemne.html", out: "app/firemne/page.js" },
  { src: "detske.html", out: "app/detske/page.js" },
  { src: "kar.html", out: "app/kar/page.js" },
  { src: "kulturne.html", out: "app/kulturne/page.js" },
  { src: "blog.html", out: "app/blog/page.js" },
  { src: "blog/svadba-pri-kosiciach.html", out: "app/blog/svadba-pri-kosiciach/page.js" },
  { src: "blog/ako-zabezpecit-kar.html", out: "app/blog/ako-zabezpecit-kar/page.js" },
  { src: "blog/firemny-vecierok-pri-kosiciach.html", out: "app/blog/firemny-vecierok-pri-kosiciach/page.js" },
  { src: "ochrana-osobnych-udajov.html", out: "app/ochrana-osobnych-udajov/page.js" },
  { src: "reklamacny-poriadok.html", out: "app/reklamacny-poriadok/page.js" },
];

console.log("Generating pages…");
pages.forEach(genPage);

// ── not-found (404) ───────────────────────────────────────────────────────────
{
  const html = read("404.html");
  const main = fixContent(extractMain(html));
  let out = `export const metadata = {\n  title: ${JSON.stringify(
    extractTitle(html)
  )},\n  description: ${JSON.stringify(
    decode(meta(html, "description") || "")
  )},\n  robots: { index: false, follow: true },\n};\n\n`;
  out += `const HTML = ${JSON.stringify(main)};\n\n`;
  out += `export default function NotFound() {\n  return <main id="obsah" dangerouslySetInnerHTML={{ __html: HTML }} />;\n}\n`;
  write("app/not-found.js", out);
}

// ── Header & Footer components (identical across all pages) ────────────────────
{
  const idx = read("index.html");
  const headerInner = fixContent(
    grab(idx, /<header class="site" id="hdr">([\s\S]*?)<\/header>/)
  );
  const footerInner = fixContent(
    grab(idx, /<footer class="site">([\s\S]*?)<\/footer>/)
  );
  write(
    "components/SiteHeader.js",
    `const HTML = ${JSON.stringify(headerInner)};\n\n` +
      `export default function SiteHeader() {\n  return <header className="site" id="hdr" dangerouslySetInnerHTML={{ __html: HTML }} />;\n}\n`
  );
  write(
    "components/SiteFooter.js",
    `const HTML = ${JSON.stringify(footerInner)};\n\n` +
      `export default function SiteFooter() {\n  return <footer className="site" dangerouslySetInnerHTML={{ __html: HTML }} />;\n}\n`
  );
}

// ── globals.css (fonts @import on top + dark-hero on <html> instead of <body>) ──
{
  let css = read("css/styles.css");
  css = css
    .replaceAll("html.menu-open body.dark-hero", "html.menu-open.dark-hero")
    .replaceAll("body.dark-hero", "html.dark-hero");
  const fonts =
    "@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap');\n\n";
  write("app/globals.css", fonts + css);
}

// ── public/js/main.js (cookie-bar link → absolute clean route) ─────────────────
{
  let js = read("js/main.js");
  js = js.replace(
    `'<a href="' + prefix + 'ochrana-osobnych-udajov.html">Ochrana osobných údajov</a>.</p>' +`,
    `'<a href="/ochrana-osobnych-udajov">Ochrana osobných údajov</a>.</p>' +`
  );
  write("public/js/main.js", js);
  write("public/js/rezervacia.js", read("js/rezervacia.js"));
}

// ── public static files (sitemap with clean URLs, robots, manifest) ────────────
{
  write("public/sitemap.xml", read("sitemap.xml").replace(/\.html<\/loc>/g, "</loc>"));
  write("public/robots.txt", read("robots.txt"));
  write(
    "public/site.webmanifest",
    read("site.webmanifest").replace(/"assets\//g, '"/assets/')
  );
}

console.log("Done.");
