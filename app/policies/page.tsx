import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { LegalShell } from "@/components/LegalShell";
import { listPolicyDocs } from "@/lib/policies";

export const metadata: Metadata = {
  ...pageMetadata("/policies"),
  title: "Policies - Shobble",
  description: "Shobble policies and addendums referenced by the Terms of Use.",
};

export default function PoliciesPage() {
  const docs = listPolicyDocs();

  return (
    <LegalShell title="Policies">
      <div className="legal-prose max-w-3xl">
        <h1>Policies and addendums</h1>
        <p>These documents are referenced by the Terms of Use. Each document states its own date.</p>
        <div className="legal-index">
          <Link href="/terms" className="legal-index-item">
            <strong>Master Terms of Use</strong>
          </Link>
          {docs.map((doc) => (
            <Link key={doc.slug} href={`/policies/${doc.slug}`} className="legal-index-item">
              <strong>{doc.title}</strong>
            </Link>
          ))}
        </div>
      </div>
    </LegalShell>
  );
}
