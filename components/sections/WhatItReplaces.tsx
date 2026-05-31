import { SectionTag } from "@/components/artifacts/SectionTag";
import { Stamp } from "@/components/artifacts/Stamp";

/**
 * Q3 — What does it replace?
 * The duct-taped stack of tools every creator juggles, crossed out and
 * collapsed into one place. Sticky-note / pinboard energy, not a feature grid.
 */
const stack = [
  { tool: "Membership site", for_: "for your paying members" },
  { tool: "Digital goods shop", for_: "for selling your files" },
  { tool: "Chat server", for_: "for your community" },
  { tool: "Link page", for_: "for tying it together" },
  { tool: "Cloud drive", for_: "for storing your work" },
  { tool: "Tip jar", for_: "for one-off support" },
];

export function WhatItReplaces() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(111,90,116,0.14),transparent_26rem)]" aria-hidden />
      <div className="relative mx-auto max-w-wall px-5">
        <div className="mb-14 max-w-narrow">
          <SectionTag index="03" label="what it replaces" />
          <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.7rem)] font-medium leading-[1.05] text-bone-dim">
            Close the six tabs you
            <br className="hidden sm:block" /> run your business from.
          </h2>
          <p className="serif-lead mt-4 max-w-prose text-base text-bone-dim/80">
            Your studio is held together with rented tools that don&apos;t talk to
            each other &mdash; and each one takes a cut.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_auto_0.9fr]">
          {/* the messy stack */}
          <div className="grid gap-3 sm:grid-cols-2">
            {stack.map((s, i) => (
              <div
                key={s.tool}
                className={`jitter relative border border-line bg-[#1c1518] px-4 py-4 ${
                  i % 2 === 1 ? "sm:mt-4" : ""
                }`}
                style={{ transform: `rotate(${i % 2 ? 1.2 : -1.2}deg)` }}
              >
                <span className="block font-display text-base text-bone-dim line-through decoration-red-shobbl/80 decoration-2">
                  {s.tool}
                </span>
                <span className="mt-1 block text-xs text-bone-dim/70">{s.for_}</span>
              </div>
            ))}
          </div>

          {/* the collapse */}
          <div className="flex items-center justify-center">
            <span className="font-display text-3xl text-bone-dim md:rotate-0">
              <span className="hidden md:inline">→</span>
              <span className="md:hidden">↓</span>
            </span>
          </div>

          {/* the one place */}
          <div className="relative">
            <div className="pointer-events-none absolute -right-3 -top-6 z-20">
              <Stamp rotate={-10} reveal>
                One tab
              </Stamp>
            </div>
            <div className="border border-red-shobbl bg-bone p-7 text-ink shadow-[0_30px_90px_-58px_rgba(0,0,0,0.95)]">
              <div className="brand-word text-sm">SHOBBL</div>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
                Everything above, in one creator home.
              </h3>
              <ul className="mt-5 space-y-2 text-sm text-black/70">
                <li>✓ Storefront, members, and community together</li>
                <li>✓ Your files, your audience, your payouts</li>
                <li>✓ One flat fee &mdash; not six middlemen</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
