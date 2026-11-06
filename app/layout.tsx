import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, siteOpenGraph } from "@/lib/seo";
import "./globals.css";

// UI / display face - quirkier and more characterful than a generic grotesk.
const display = localFont({
  src: "./fonts/bricolage-grotesque.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Arial",
});

// Expressive editorial headline face - "wonky" optical serif for the big moments.
const headline = localFont({
  src: [
    { path: "./fonts/fraunces.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/fraunces-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-headline",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const editorial = localFont({
  src: [
    { path: "./fonts/newsreader.woff2", weight: "300 600", style: "normal" },
    { path: "./fonts/newsreader-italic.woff2", weight: "300 600", style: "italic" },
  ],
  variable: "--font-editorial",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const brand = localFont({
  src: "./fonts/montserrat.woff2",
  weight: "200 400",
  style: "normal",
  variable: "--font-brand",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "all-in-one platform",
    "social platform",
    "indie creators",
    "creator ownership",
    "anti-AI",
    "digital storefront",
    "memberships",
    "human creators",
  ],
  authors: [{ name: "Shobble" }],
  robots: { index: true, follow: true },
  icons: {
    icon: "/shobble-icon.svg",
    shortcut: "/shobble-icon.svg",
  },
  openGraph: {
    ...siteOpenGraph,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-shobble.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${headline.variable} ${editorial.variable} ${brand.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
