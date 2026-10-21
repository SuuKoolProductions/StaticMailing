import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Terms of Use — Shobble",
  description: "Master Terms of Use for Shobbl Incorporated, doing business as Shobble.",
};

function loadMasterTerms(): string {
  const raw = readFileSync(
    join(process.cwd(), "legal", "MASTER TERMS OF USE.txt"),
    "utf-8",
  );
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/\t/g, "  ")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n");
}

export default function TermsPage() {
  const terms = loadMasterTerms();

  return (
    <LegalShell title="Legal">
      <article className="legal-prose max-w-4xl">
        <h1 className="mb-4 text-3xl font-bold">Terms of Use</h1>
        <p className="mb-8 text-sm text-bone-dim">
          These Terms incorporate additional policies and addendums by reference.
          The complete policy set is published on the live platform at{" "}
          <a href="https://dev.shobble.com/policies">dev.shobble.com/policies</a>.
        </p>
        <div className="legal-pre">{terms}</div>
      </article>
    </LegalShell>
  );
}
