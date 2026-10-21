import Link from "next/link";
import {
  POLICY_LAST_UPDATED_DISPLAY,
  buildPolicyHrefIndex,
  formatPlaintextPolicyForDisplay,
  getHrefForPolicyLine,
  listPolicyDocs,
  pickHeaderValue,
  type PolicyDoc,
} from "@/lib/policies";

function renderLinkedTerms(
  text: string,
  docs: PolicyDoc[],
) {
  const { availablePolicySlugs, policyHrefByNormalizedTitle } = buildPolicyHrefIndex(docs);
  return text.split("\n").map((line, index) => {
    const trimmed = line.trim();
    const href = trimmed
      ? getHrefForPolicyLine(trimmed, availablePolicySlugs, policyHrefByNormalizedTitle)
      : null;
    if (!href) {
      return (
        <span key={index}>
          {line}
          {"\n"}
        </span>
      );
    }
    const leading = line.match(/^\s+/)?.[0] || "";
    return (
      <span key={index}>
        {leading}
        <Link href={href}>{trimmed}</Link>
        {"\n"}
      </span>
    );
  });
}

export function TermsDocument({
  rawTerms,
}: {
  rawTerms: string;
}) {
  const docs = listPolicyDocs();
  const terms = formatPlaintextPolicyForDisplay(rawTerms);
  const effectiveDate = pickHeaderValue(rawTerms, "Effective Date");
  const governingLaw = pickHeaderValue(rawTerms, "Governing Law");

  return (
    <div className="legal-prose legal-terms">
      <header className="legal-hero">
        <p className="legal-kicker">Legal</p>
        <h1>Terms of Use</h1>
        <p>
          These Terms incorporate additional policies and addendums by reference.
        </p>
        <div className="legal-meta">
          {effectiveDate ? <span><strong>Effective</strong> {effectiveDate}</span> : null}
          <span><strong>Updated</strong> {POLICY_LAST_UPDATED_DISPLAY}</span>
          {governingLaw ? <span><strong>Governing law</strong> {governingLaw}</span> : null}
        </div>
        <div className="legal-actions">
          <Link href="/privacy" className="legal-button">Privacy Policy</Link>
          <Link href="/policies" className="legal-button">View all policies</Link>
        </div>
      </header>

      <div className="legal-split">
        <aside className="legal-card legal-sidebar">
          <h2>Addendums and policies</h2>
          <div className="legal-policy-list">
            {docs.map((doc) => (
              <Link key={doc.slug} href={`/policies/${doc.slug}`}>
                {doc.title}
              </Link>
            ))}
          </div>
          <p className="legal-sidebar-note">
            Looking for the full list? <Link href="/policies">View all policies</Link>.
          </p>
        </aside>

        <section className="legal-card">
          <div className="legal-card-head">
            <h2>Master Terms of Use</h2>
          </div>
          <div className="legal-pre">{renderLinkedTerms(terms, docs)}</div>
        </section>
      </div>
    </div>
  );
}
