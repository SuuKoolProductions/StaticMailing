import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export function LegalShell({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div id="top" className="relative min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-5 py-12 md:py-16">
        {title ? (
          <p className="mb-4 font-display text-[0.68rem] font-bold uppercase tracking-[0.22em] text-red-shobbl">
            {title}
          </p>
        ) : null}
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
