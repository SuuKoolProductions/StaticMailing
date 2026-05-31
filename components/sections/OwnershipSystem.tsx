import { SectionTag } from "@/components/artifacts/SectionTag";
import { PayoutSlip } from "@/components/artifacts/PayoutSlip";
import { PolicyStamp, Annotation } from "@/components/artifacts/Motifs";

/**
 * Section 4 — Creator ownership.
 * A studio ownership board with warm cards and a payout receipt.
 */
const owned = [
  { k: "01", t: "Your content", d: "Files stay yours. Export anytime, in full quality." },
  { k: "02", t: "Your audience", d: "Email + member list you can take with you." },
  { k: "03", t: "Your storefront", d: "Pricing, perks, presentation — your call." },
  { k: "04", t: "Your money", d: "Direct payouts. No mystery holds, no clawbacks." },
];

export function OwnershipSystem() {
  return (
    <section className="relative overflow-hidden py-32 md:py-56">
      <div className="absolute inset-x-0 top-1/2 h-[32rem] -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(231,55,61,0.12),transparent_38rem)]" aria-hidden />
      <div className="mx-auto max-w-wall px-5">
        <div className="mx-auto mb-20 max-w-4xl text-center md:mb-28">
          <SectionTag index="04" label="how ownership works" />
          <h2 className="headline mx-auto mt-8 max-w-[16ch] text-[clamp(3.2rem,9vw,7.6rem)] text-bone">
            If you made it,
            <br />
            it&apos;s <span className="marker">yours</span>.
            <br />
            <em>Full stop.</em>
          </h2>
          <p className="serif-lead mx-auto mt-9 max-w-2xl text-2xl leading-relaxed text-bone-dim">
            Not licensed back to you. Not held hostage the day you decide to
            leave. Your work, your people, and your money stay attached to you
            &mdash; the way it should have been the whole time.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* locker diagram */}
          <div className="relative">
            <div className="relative mb-8 border border-red-shobbl bg-bone p-7 text-ink shadow-[0_34px_90px_-60px_rgba(0,0,0,0.95)]">
              <div className="font-display text-[0.72rem] uppercase tracking-[0.16em] text-black/55">
                Creator bill of ownership
              </div>
              <p className="serif-lead mt-4 text-2xl leading-tight">
                The shop is not the platform&apos;s. The audience is not the platform&apos;s.
                The archive is not the platform&apos;s.
              </p>
              <p className="mt-4 font-display text-lg font-bold">
                It belongs to the person making the work.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
              {/* YOU node */}
              <div className="flex shrink-0 flex-col items-center justify-center border border-red-shobbl bg-[#21191d] px-6 py-8 md:w-[160px]">
                <span className="font-display text-2xl text-bone">Kept by the maker</span>
                <span className="mt-2 max-w-[9rem] text-center text-xs leading-snug text-bone-dim">
                  Your storefront, followers, and files stay attached to you.
                </span>
              </div>

              {/* wired locker cells */}
              <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                {owned.map((o) => (
                  <div
                    key={o.k}
                    className="jitter relative border border-line bg-[#21191d] p-5"
                  >
                    <span className="absolute right-3 top-3 font-display text-xs text-bone-dim">
                      {o.k}
                    </span>
                    <span className="font-display text-xs uppercase tracking-[0.12em] text-[var(--signal-green)]">
                      Yours
                    </span>
                    <h3 className="mt-1 font-display text-xl text-bone">{o.t}</h3>
                    <p className="mt-1 text-sm leading-snug text-bone-dim">{o.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="serif-lead mt-5 text-base text-bone-dim">
              Every shelf points back to the person making the work: content, community, storefront, and payout history.
            </p>
          </div>

          {/* ownership manifest as a clean released slip + contract note */}
          <div className="relative flex flex-col items-center gap-8 lg:pt-10">
            <div className="pointer-events-none absolute -left-2 -top-10 z-20 hidden md:block">
              <PolicyStamp top="shobbl" center="OWNED" bottom="by you" rotate={-14} />
            </div>
            <div className="relative">
              <PayoutSlip
                payee="@you"
                amount="92%"
                status="RELEASED"
                note="Your cut. We take a flat platform fee — no escalating tiers, no surprise deductions."
                rotate={-3}
              />
              <div className="absolute -right-24 top-2 hidden lg:block">
                <Annotation rotate={6} arrow="left">
                  your cut, not theirs
                </Annotation>
              </div>
            </div>
            <div className="receipt w-[260px] px-5 py-5 text-[#161616]" style={{ transform: "rotate(2deg)" }}>
              <div className="font-display text-[0.68rem] uppercase tracking-[0.1em]">Kept with the work</div>
              <div className="my-2 border-t border-dashed border-black/40" />
              <ul className="space-y-1 text-[0.62rem]">
                <li>✓ Portable export, any time</li>
                <li>✓ No exclusivity lock-in</li>
                <li>✓ Delete = actually deleted</li>
                <li>✓ Audience stays connected</li>
                <li>✓ Rights stay with the creator</li>
              </ul>
              <div className="my-2 border-t border-dashed border-black/40" />
              <div className="text-[0.55rem] uppercase tracking-[0.14em]">
                signed by Shobbl · kept by you
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
