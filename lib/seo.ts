import type { Metadata } from "next";

export const SITE_URL = "https://www.shobble.com";

export const siteOpenGraph: Metadata["openGraph"] = {
  type: "website",
  siteName: "Shobble",
  title: "Shobble - The platform built for creators",
  description:
    "The platform built for creators. Shobble is the next-gen social media platform where indie creators thrive and sell content. Full control over your content.",
  images: [{ url: "/og-shobble.png", width: 1024, height: 682, alt: "Shobble, red ocarinas on black" }],
};

export function pageMetadata(path: string): Metadata {
  const url = new URL(path, SITE_URL).toString();
  return {
    alternates: { canonical: url },
    openGraph: { ...siteOpenGraph, url },
  };
}
