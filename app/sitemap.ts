import type { MetadataRoute } from "next";
import { listPolicyDocs } from "@/lib/policies";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/privacy",
    "/terms",
    "/policies",
    "/submit-a-bug",
    "/shobble_enterprise_press_kit.html",
    ...listPolicyDocs().map((doc) => `/policies/${doc.slug}`),
  ];
  return paths.map((path) => ({ url: new URL(path, SITE_URL).toString() }));
}
