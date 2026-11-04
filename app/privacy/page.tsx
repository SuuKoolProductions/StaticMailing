import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalShell } from "@/components/LegalShell";
import { PrivacyPolicyContent } from "@/components/legal/PrivacyPolicyContent";

export const metadata: Metadata = {
  ...pageMetadata("/privacy"),
  title: "Privacy Policy — Shobble",
  description:
    "Global Privacy Policy for Shobbl Incorporated, doing business as Shobble.",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Legal">
      <PrivacyPolicyContent />
    </LegalShell>
  );
}
