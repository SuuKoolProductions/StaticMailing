import type { Metadata } from "next";
import { readFileSync } from "fs";
import { LegalShell } from "@/components/LegalShell";
import { TermsDocument } from "@/components/legal/TermsDocument";
import { getTermsOfUsePath } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Terms of Use — Shobble",
  description: "Shobble Terms of Use and incorporated policies.",
};

export default function TermsPage() {
  const rawTerms = readFileSync(getTermsOfUsePath(), "utf-8");

  return (
    <LegalShell title="Legal" wide>
      <TermsDocument rawTerms={rawTerms} />
    </LegalShell>
  );
}
