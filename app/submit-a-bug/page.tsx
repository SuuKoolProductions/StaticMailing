import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { BugReportForm } from "@/components/bug/BugReportForm";

export const metadata: Metadata = {
  title: "Submit a Bug — Shobble",
  description: "Report a problem and help us improve Shobble.",
};

export default function SubmitBugPage() {
  return (
    <LegalShell title="Support">
      <div className="mx-auto max-w-2xl border border-line bg-[#21191d] p-5 shadow-[0_28px_90px_-60px_rgba(0,0,0,0.95)] sm:p-8">
        <h1 className="font-headline text-4xl text-bone sm:text-5xl">Submit a bug</h1>
        <p className="mt-3 max-w-prose text-sm leading-6 text-bone-dim">
          Tell us what happened and how to reproduce it. Reports go directly to the Shobble team.
        </p>
        <div className="mt-8">
          <BugReportForm />
        </div>
      </div>
    </LegalShell>
  );
}
