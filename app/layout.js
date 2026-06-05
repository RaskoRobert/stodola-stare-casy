import "./globals.css";
import Script from "next/script";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  metadataBase: new URL("https://www.stodolastarecasy.sk"),
  icons: {
    icon: [
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#36221D",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sk" suppressHydrationWarning>
      <body>
        {/* Domovská stránka má tmavé hero → priehľadná hlavička.
            Triedu nastavíme ešte pred vykreslením, aby neblikala. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var p=location.pathname;if(p==='/'||p===''){document.documentElement.classList.add('dark-hero');}})();",
          }}
        />
        <a className="skip" href="#obsah">
          Preskočiť na obsah
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
