import type { Metadata } from "next";

export const SITE_URL = "https://www.shobble.com";

export const SITE_TITLE = "Shobble - The all-in-one social platform for human creativity";

export const SITE_DESCRIPTION =
  "One home for your fun, your friends, your content. Shobble is the all-in-one social platform where human creators share, sell, and build community.";

export const siteOpenGraph: Metadata["openGraph"] = {
  type: "website",
  siteName: "Shobble",
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  images: [{ url: "/og-shobble.png", width: 1024, height: 682, alt: "Shobble, red ocarinas on black" }],
};

export function pageMetadata(path: string): Metadata {
  const url = new URL(path, SITE_URL).toString();
  return {
    alternates: { canonical: url },
    openGraph: { ...siteOpenGraph, url },
  };
}
