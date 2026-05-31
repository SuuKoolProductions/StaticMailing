import Image from "next/image";
import { PayoutSlip } from "@/components/artifacts/PayoutSlip";
import { Stamp } from "@/components/artifacts/Stamp";

/**
 * Section 1 — Opening manifesto panel.
 * Off-center editorial headline, slammed stamp, torn strip, hand-labelled intro.
 * Deliberately NOT a centered hero.
 */
export function Manifesto() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_25%,rgba(214,162,78,0.12),transparent_22rem)]" aria-hidden />

      <div className="relative mx-auto grid max-w-wall items-center gap-10 px-5 pb-16 pt-6 md:grid-cols-[0.92fr_1.08fr] md:gap-14 md:pb-20 md:pt-8">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-4">
            <span className="brand-word text-sm text-bone">SHOBBL</span>
            <span className="h-px w-16 bg-line" />
            <span className="font-display text-xs uppercase tracking-[0.14em] text-bone-dim">
              All-In-One Creator marketplace
            </span>
          </div>

          <p className="serif-lead mb-4 max-w-narrow text-xl italic text-bone-dim">
            &ldquo;I finally found one place to run my whole creator business.&rdquo;
          </p>

          <h1 className="headline max-w-[15ch] text-[clamp(2.1rem,6.65vw,5.32rem)] text-bone">
            One home
            <br />
            for your shop,
            <br />
            your people,
            <br />
            your <span className="marker">work</span>.
          </h1>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-narrow">
              <p className="serif-lead text-balance text-lg leading-relaxed text-bone-dim">
                Shobbl is a creator-owned marketplace for artists, musicians, game
                developers, writers, and independent makers. Your storefront, your
                members, your community, and your archive &mdash; all under one roof
                that actually belongs to you.
              </p>
              <p className="mt-4 font-display text-sm uppercase leading-relaxed tracking-[0.12em] text-bone">
                Sell commissions, memberships, digital products, art, music,
                writing, and community access from one creator-owned platform.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <Stamp rotate={-7} reveal>
                Human-made
              </Stamp>
              <Stamp rotate={4} reveal>
                Creator-owned
              </Stamp>
            </div>
          </div>

          <div className="mt-12 inline-flex flex-wrap items-center gap-3">
            <a
              href="#access"
              className="group relative inline-flex items-center gap-2 bg-red-shobbl px-5 py-3 font-display text-sm uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5"
            >
              Request access
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#modules"
              className="border border-line px-5 py-3 font-display text-sm uppercase tracking-[0.12em] text-bone transition-colors hover:border-bone-dim"
            >
              Browse the studio
            </a>
          </div>
        </div>

        <div className="space-y-4 md:hidden">
          <div className="border border-line bg-bone p-3 text-ink">
            <div className="relative aspect-[4/3] overflow-hidden border border-black/10">
              <Image src="/Shobbl/mayarenderbanner.png" alt="Maya Render artwork preview" fill className="object-cover" sizes="100vw" />
            </div>
            <div className="mt-3 font-display text-xl font-bold">@pixel_witch</div>
            <p className="mt-1 text-sm text-black/65">Illustration, brush drops, and a room full of people choosing the next palette.</p>
          </div>
          <div className="border border-line bg-ash p-4">
            <span className="font-display text-sm text-bone">Member note</span>
            <div className="text-bone-dim">"make the rainy one"</div>
          </div>
          <PayoutSlip
            payee="@you"
            amount="$2,480"
            status="RELEASED"
            note="Paid out from your creator shop."
            rotate={2}
            slipId="2408"
          />
        </div>

        <div className="relative hidden min-h-[520px] md:block">
          <div className="absolute left-0 top-4 w-[305px] rotate-[-2deg] border border-line bg-bone p-4 text-ink shadow-[0_26px_80px_-48px_rgba(0,0,0,0.9)]">
            <div className="relative aspect-[4/3] overflow-hidden border border-black/10">
              <Image src="/Shobbl/mayarenderbanner.png" alt="Maya Render artwork preview" fill className="object-cover" sizes="320px" priority />
            </div>
            <div className="mb-4 mt-4 flex items-center justify-between border-b border-black/10 pb-3">
              <span className="font-display text-sm uppercase tracking-[0.12em] text-black/60">Creator profile</span>
              <span className="h-3 w-3 rounded-full bg-red-shobbl" />
            </div>
            <div className="font-display text-2xl font-bold">@pixel_witch</div>
            <p className="mt-2 text-sm text-black/65">Illustration, brushes, monthly sketch club.</p>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <div className="bg-black/5 p-2">
                <strong className="block font-display">42k</strong>
                <span className="text-xs text-black/55">fans</span>
              </div>
              <div className="bg-black/5 p-2">
                <strong className="block font-display">12</strong>
                <span className="text-xs text-black/55">drops</span>
              </div>
              <div className="bg-black/5 p-2">
                <strong className="block font-display">$9</strong>
                <span className="text-xs text-black/55">club</span>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-20 w-[340px] rotate-[-1deg] border border-line bg-[#2a2024] p-5">
            <span className="font-display text-xs uppercase tracking-[0.12em] text-bone-dim">Membership room</span>
            <div className="mt-3 space-y-3">
              {[
                ["Mina", "Collector", "the rainy palette won me over"],
                ["Jon", "Supporter", "can we get the flat colors too?"],
                ["Ari", "Member", "using this brush in tonight's study"],
              ].map(([name, tier, comment]) => (
                <div key={name} className="border border-line bg-coal px-3 py-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm text-bone">{name}</span>
                    <span className="font-display text-[0.58rem] uppercase tracking-[0.12em] text-red-shobbl">{tier}</span>
                  </div>
                  <p className="mt-1 text-xs text-bone-dim">&ldquo;{comment}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-[210px]">
            <PayoutSlip
              payee="@you"
              amount="$2,480"
              status="RELEASED"
              note="Paid out from your creator shop."
              rotate={4}
              slipId="2408"
            />
          </div>
        </div>
      </div>

      {/* torn paper strip at the bottom */}
      <div className="torn-edge bg-bone py-3 md:py-4" aria-hidden>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-6 font-display text-[0.78rem] uppercase tracking-[0.18em] text-ink md:text-[0.84rem]">
          <span>ownership</span>
          <span>·</span>
          <span>storefronts</span>
          <span>·</span>
          <span>memberships</span>
          <span>·</span>
          <span>communities</span>
          <span>·</span>
          <span>no scraping</span>
        </div>
      </div>
    </header>
  );
}
