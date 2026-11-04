import type { Metadata } from "next";

export const SITE_URL = "https://www.shobble.com";

export const siteOpenGraph: Metadata["openGraph"] = {
  type: "website",
  siteName: "Shobble",
  title: "Shobble — All-in-one creator marketplace",
  description:
    "A creator marketplace for humans. Storefronts, memberships, digital goods, and communities, owned by the people who make the work.",
  images: [{ url: "/ShobbleIcon.svg", width: 100, height: 100 }],
};

export function pageMetadata(path: string): Metadata {
  const url = new URL(path, SITE_URL).toString();
  return {
    alternates: { canonical: url },
    openGraph: { ...siteOpenGraph, url },
  };
}
