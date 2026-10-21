import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { PrivacyPolicyContent } from "@/components/legal/PrivacyPolicyContent";

export const metadata: Metadata = {
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
