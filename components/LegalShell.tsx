import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export function LegalShell({
  children,
  title,
  wide = false,
}: {
  children: ReactNode;
  title?: string;
  wide?: boolean;
}) {
  return (
    <div id="top" className="relative min-h-screen">
      <SiteNav />
      <main className={`mx-auto px-5 py-12 md:py-16 ${wide ? "max-w-wall" : "max-w-4xl"}`}>
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
