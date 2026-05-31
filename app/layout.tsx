import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces, Newsreader, Montserrat } from "next/font/google";
import "./globals.css";

// UI / display face — quirkier and more characterful than a generic grotesk.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Expressive editorial headline face — "wonky" optical serif for the big moments.
const headline = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-headline",
  display: "swap",
});

const editorial = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const brand = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shobbl.com"),
  title: "Shobbl - All-in-One Platform for Creative Media",
  description:
    "Shobbl is a creator marketplace built for artists, musicians, game devs, writers and independent digital creators. Anti-AI-slop, anti-platform-abuse, pro-human-creator, pro-ownership.",
  keywords: [
    "creator marketplace",
    "indie creators",
    "creator ownership",
    "anti-AI",
    "digital storefront",
    "memberships",
    "human creators",
  ],
  authors: [{ name: "Shobbl" }],
  robots: { index: true, follow: true },
  icons: {
    icon: "/shobbl-icon.svg",
    shortcut: "/shobbl-icon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://shobbl.com/",
    siteName: "Shobbl",
    title: "Shobbl - All-in-One Platform for Creative Media",
    description:
      "A creator marketplace for humans. Storefronts, memberships, digital goods, communities — owned by the people who make the work.",
    images: [{ url: "/ShobblIcon.svg", width: 100, height: 100 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shobbl - All-in-One Platform for Creative Media",
    description:
      "A creator marketplace for humans. Built around verified creators, ownership, and protection from scraping.",
    images: ["/ShobblIcon.svg"],
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
      <body>{children}</body>
    </html>
  );
}
