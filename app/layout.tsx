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
  title: "Shobble — All-in-one creator marketplace",
  description:
    "Shobble is a creator marketplace for artists, musicians, game developers, writers, and independent makers. Storefronts, memberships, communities, and payouts stay with the people who make the work.",
  keywords: [
    "creator marketplace",
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
    type: "website",
    url: "https://shobbl.com/",
    siteName: "Shobble",
    title: "Shobble — All-in-one creator marketplace",
    description:
      "A creator marketplace for humans. Storefronts, memberships, digital goods, and communities, owned by the people who make the work.",
    images: [{ url: "/ShobbleIcon.svg", width: 100, height: 100 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shobble — All-in-one creator marketplace",
    description:
      "A creator marketplace for humans. Built around verified creators, ownership, and protection from scraping.",
    images: ["/ShobbleIcon.svg"],
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
