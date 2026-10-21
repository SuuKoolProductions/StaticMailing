import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalShell } from "@/components/LegalShell";
import { PolicyDocument } from "@/components/legal/PolicyDocument";
import { getPolicyDocBySlug, listPolicyDocs, readPolicyDoc } from "@/lib/policies";

export function generateStaticParams() {
  return listPolicyDocs().map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await props.params;
  const doc = getPolicyDocBySlug(slug);
  return {
    title: doc ? `${doc.title} — Shobble` : "Policy — Shobble",
  };
}

export default async function PolicyDocPage(
  props: { params: Promise<{ slug: string }> },
) {
  const { slug } = await props.params;
  const doc = getPolicyDocBySlug(slug);
  if (!doc) return notFound();

  return (
    <LegalShell title="Policy" wide>
      <PolicyDocument title={doc.title} raw={readPolicyDoc(doc)} type={doc.type} />
    </LegalShell>
  );
}
