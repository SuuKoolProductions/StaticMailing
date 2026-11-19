import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { readFileSync } from "fs";
import { join } from "path";
import { LegalShell } from "@/components/LegalShell";
import { PolicyDocument } from "@/components/legal/PolicyDocument";

export const metadata: Metadata = {
  ...pageMetadata("/privacy"),
  title: "Privacy Policy - Shobble",
  description:
    "Global Privacy Policy for Shobbl Incorporated, doing business as Shobble.",
};

export default function PrivacyPage() {
  const raw = readFileSync(join(process.cwd(), "legal", "Global Privacy Policy.txt"), "utf-8");

  return (
    <LegalShell title="Privacy">
      <PolicyDocument title="Privacy Policy" raw={raw} type="txt" />
    </LegalShell>
  );
}
