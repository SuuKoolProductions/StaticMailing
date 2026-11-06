import type { Metadata } from "next";
import { SITE_URL, siteOpenGraph } from "@/lib/seo";
import { Bricolage_Grotesque, Fraunces, Newsreader, Montserrat } from "next/font/google";
import "./globals.css";

// UI / display face - quirkier and more characterful than a generic grotesk.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Expressive editorial headline face - "wonky" optical serif for the big moments.
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
  metadataBase: new URL(SITE_URL),
  title: "Shobble - The platform built for creators",
  description:
    "The platform built for creators. Shobble is the next-gen social media platform where indie creators thrive and sell content. Full control over your content.",
  keywords: [
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
    title: "Shobble - The platform built for creators",
    description:
      "The platform built for creators. Shobble is the next-gen social media platform where indie creators thrive and sell content. Full control over your content.",
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
      <body>{children}</body>
    </html>
  );
}
