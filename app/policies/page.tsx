import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/LegalShell";
import { POLICY_LAST_UPDATED_DISPLAY, listPolicyDocs } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Policies — Shobble",
  description: "Shobble policies and addendums referenced by the Terms of Use.",
};

export default function PoliciesPage() {
  const docs = listPolicyDocs();

  return (
    <LegalShell title="Policies">
      <div className="legal-prose max-w-3xl">
        <h1>Policies and addendums</h1>
        <p>These documents are referenced by the Terms of Use.</p>
        <p className="legal-meta-line">
          <strong>Last Updated:</strong> {POLICY_LAST_UPDATED_DISPLAY}
        </p>
        <div className="legal-index">
          <Link href="/terms" className="legal-index-item">
            <strong>Master Terms of Use</strong>
            <span>terms · Last Updated: {POLICY_LAST_UPDATED_DISPLAY}</span>
          </Link>
          {docs.map((doc) => (
            <Link key={doc.slug} href={`/policies/${doc.slug}`} className="legal-index-item">
              <strong>{doc.title}</strong>
              <span>{doc.type} · Last Updated: {POLICY_LAST_UPDATED_DISPLAY}</span>
            </Link>
          ))}
        </div>
      </div>
    </LegalShell>
  );
}
