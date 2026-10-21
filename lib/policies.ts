import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { basename, extname, join } from "path";

export const POLICY_LAST_UPDATED_DISPLAY = "May 11th, 2026";

export type PolicyFileType = "txt" | "html";

export type PolicyDoc = {
  slug: string;
  title: string;
  filename: string;
  type: PolicyFileType;
};

const MASTER_TERMS_FILENAME = "MASTER TERMS OF USE.txt";
const POLICIES_DIR = join(process.cwd(), "legal", "policies");
const MASTER_TERMS_PATH = join(process.cwd(), "legal", MASTER_TERMS_FILENAME);

const ACRONYMS = new Set([
  "AI",
  "API",
  "AUP",
  "DMCA",
  "EEA",
  "EU",
  "GDPR",
  "IP",
  "KYC",
  "UK",
  "US",
  "USA",
  "USD",
]);

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function isAllCaps(input: string): boolean {
  const letters = input.replace(/[^A-Za-z]+/g, "");
  return Boolean(letters) && letters === letters.toUpperCase();
}

function toTitleCaseWord(word: string): string {
  if (/[a-z].*[A-Z]|[A-Z].*[a-z]/.test(word)) return word;
  const upper = word.toUpperCase();
  if (ACRONYMS.has(upper)) return upper;
  const lower = word.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function normalizePolicyTitleForDisplay(input: string): string {
  const base = input.replace(/_/g, ": ").replace(/\s+/g, " ").trim();
  if (!isAllCaps(base)) return base;
  const stopWords = new Set([
    "a", "an", "and", "as", "at", "by", "for", "from", "in", "of", "on", "or", "the", "to", "with", "without",
  ]);
  return base
    .split(" ")
    .map((word, index) => {
      if (word === "&" || word === "•") return word;
      const parts = word.split("-").map((part, partIndex) => {
        if (!part) return part;
        if (index !== 0 && partIndex === 0 && stopWords.has(part.toLowerCase())) {
          return part.toLowerCase();
        }
        return toTitleCaseWord(part);
      });
      const joined = parts.join("-");
      if (index !== 0 && stopWords.has(joined.toLowerCase())) return joined.toLowerCase();
      return joined;
    })
    .join(" ")
    .replace(/\s+:\s+/g, ": ")
    .trim();
}

export function formatPlaintextPolicyForDisplay(input: string): string {
  const withDates = input
    .replace(/(Last\s*Updated\s*:\s*)(?:\[[^\]]+\]|[A-Za-z]+\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4}|\d{1,2}\/\d{1,2}\/\d{2,4})/gi, `$1${POLICY_LAST_UPDATED_DISPLAY}`)
    .replace(/\r\n/g, "\n");
  const lines = withDates.split("\n").map((line) =>
    line.replace(/\t/g, "  ").replace(/[ \t]+$/g, "").replace(/^[ ]{7,}/, "    "),
  );
  return lines.join("\n").replace(/\n{3,}/g, "\n\n");
}

export function getTermsOfUsePath(): string {
  return MASTER_TERMS_PATH;
}

export function listPolicyDocs(): PolicyDoc[] {
  if (!existsSync(POLICIES_DIR)) return [];
  const docs: PolicyDoc[] = [];
  for (const filename of readdirSync(POLICIES_DIR)) {
    const abs = join(POLICIES_DIR, filename);
    try {
      if (!statSync(abs).isFile()) continue;
    } catch {
      continue;
    }
    const ext = extname(filename).toLowerCase();
    const type: PolicyFileType | null =
      ext === ".txt" || ext === "" ? "txt" : ext === ".html" ? "html" : null;
    if (!type) continue;
    const nameWithoutExt = ext ? basename(filename, ext) : filename;
    docs.push({
      slug: slugify(nameWithoutExt),
      title: normalizePolicyTitleForDisplay(nameWithoutExt.replace(/\s+/g, " ").trim()),
      filename,
      type,
    });
  }
  return docs.sort((a, b) => a.title.localeCompare(b.title));
}

export function getPolicyDocBySlug(slug: string): PolicyDoc | null {
  return listPolicyDocs().find((doc) => doc.slug === slug) || null;
}

export function readPolicyDoc(doc: PolicyDoc): string {
  return readFileSync(join(POLICIES_DIR, doc.filename), "utf-8");
}

export function pickHeaderValue(text: string, label: string): string | null {
  const line = text
    .split("\n")
    .slice(0, 25)
    .find((item) => item.trim().toLowerCase().startsWith(label.toLowerCase()));
  if (!line) return null;
  const idx = line.indexOf(":");
  if (idx === -1) return null;
  return line.slice(idx + 1).trim() || null;
}

function normalizeRefKey(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^[-*•\d.)\s]+/, "")
    .replace(/[:;]+$/g, "")
    .replace(/[“”"]/g, "")
    .replace(/[().,_/-]/g, " ")
    .replace(/&/g, "and")
    .replace(/\s+/g, " ");
}

function stripDocTypeWords(normalized: string): string {
  return normalized
    .replace(/\b(addendum|policy|terms|agreement|notice)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const INCORPORATED_POLICY_LINKS: Array<{ keys: string[]; href?: string; policySlugs?: string[] }> = [
  { keys: ["privacy policy"], href: "/privacy" },
  { keys: ["cookie notice", "cookies notice", "cookies policy"], policySlugs: ["cookies-notice"] },
  {
    keys: ["acceptable use policy aup", "acceptable use policy", "acceptable use policy addendum"],
    policySlugs: ["acceptable-use-policy", "acceptable-use-policy-addendum"],
  },
  { keys: ["community guidelines"], policySlugs: ["community-content-guidelines"] },
  { keys: ["delegated access and managed accounts", "delegated access policy"], policySlugs: ["delegated-access-and-managed-accounts"] },
  { keys: ["monetization addendum", "monetization terms"], policySlugs: ["monetization-addendum", "monetization-terms"] },
  { keys: ["advertising marketplace terms"], policySlugs: ["advertising-marketplace-terms"] },
  { keys: ["affiliate program terms"], policySlugs: ["affiliate-program-terms"] },
  { keys: ["asset store terms"], policySlugs: ["asset-store-terms"] },
  { keys: ["ai use-case policy addendum", "ai use-case policy", "ai use policy"], policySlugs: ["ai-use-case-policy", "ai-use-policy"] },
  { keys: ["dmca policy addendum", "dmca policy"], policySlugs: ["dmca-policy-addendum", "dmca-policy"] },
  {
    keys: ["dispute resolution and payment reversal addendum", "dispute resolution and payment reversal policy"],
    policySlugs: ["dispute-resolution-and-payment-reversal-policy"],
  },
  { keys: ["api partner agreement addendum", "api partner policy", "api partner agreement"], policySlugs: ["api-partner-policy"] },
  { keys: ["open-source notices addendum", "open source notices"], policySlugs: ["open-source-notices"] },
  { keys: ["account eligibility and access policy", "account eligibility access policy"], policySlugs: ["account-eligibility-and-access-policy"] },
  { keys: ["community code of conduct"], policySlugs: ["community-code-of-conduct"] },
  { keys: ["creator content license agreement"], policySlugs: ["creator-content-license-agreement"] },
  { keys: ["music licensing policy"], policySlugs: ["music-licensing-policy"] },
  { keys: ["brand content eligibility schedule"], policySlugs: ["brand-content-eligibility-schedule"] },
  { keys: ["banned advertising products and services policy"], policySlugs: ["banned-advertising-products-and-services-policy"] },
  { keys: ["age rating classification"], policySlugs: ["age-rating-classification"] },
  { keys: ["content classification"], policySlugs: ["content-classification"] },
  { keys: ["sexual content definitions"], policySlugs: ["sexual-content-definitions"] },
  {
    keys: ["supplemental privacy addendum international data transfers and standard contractual clauses sccs"],
    policySlugs: ["supplemental-privacy-addendum-international-data-transfers-and-standard-contractual-clauses-sccs"],
  },
  { keys: ["supplemental privacy addendum"], policySlugs: ["supplemental-privacy-addendum"] },
];

export function getHrefForPolicyLine(
  trimmedLine: string,
  availablePolicySlugs: Set<string>,
  policyHrefByNormalizedTitle: Map<string, string>,
): string | null {
  const key = normalizeRefKey(trimmedLine);
  if (!key) return null;
  for (const entry of INCORPORATED_POLICY_LINKS) {
    if (entry.keys.some((item) => key === normalizeRefKey(item))) {
      if (entry.href) return entry.href;
      for (const slug of entry.policySlugs || []) {
        if (availablePolicySlugs.has(slug)) return `/policies/${slug}`;
      }
    }
  }
  return policyHrefByNormalizedTitle.get(key)
    || policyHrefByNormalizedTitle.get(stripDocTypeWords(key))
    || null;
}

export function buildPolicyHrefIndex(docs: PolicyDoc[]): {
  availablePolicySlugs: Set<string>;
  policyHrefByNormalizedTitle: Map<string, string>;
} {
  const availablePolicySlugs = new Set(docs.map((doc) => doc.slug));
  const policyHrefByNormalizedTitle = new Map<string, string>();
  for (const doc of docs) {
    const href = `/policies/${doc.slug}`;
    const normalizedTitle = normalizeRefKey(doc.title);
    policyHrefByNormalizedTitle.set(normalizedTitle, href);
    const stripped = stripDocTypeWords(normalizedTitle);
    if (stripped) policyHrefByNormalizedTitle.set(stripped, href);
  }
  return { availablePolicySlugs, policyHrefByNormalizedTitle };
}

export function extractBodyHtml(html: string): string {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match?.[1] ?? html;
}
