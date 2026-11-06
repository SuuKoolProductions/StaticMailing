import { PayoutSlip } from "@/components/artifacts/PayoutSlip";
import { ProtectedImage } from "@/components/artifacts/ProtectedImage";
import { Stamp } from "@/components/artifacts/Stamp";

/**
 * Section 1 - Opening manifesto panel.
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
            <span className="brand-word text-sm text-bone">SHOBBLE</span>
            <span className="h-px w-16 bg-line" />
            <span className="font-display text-xs uppercase tracking-[0.14em] text-bone-dim">
              Social platform for human creativity
            </span>
          </div>

          <p className="serif-lead mb-4 max-w-narrow text-xl italic text-bone-dim">
            &ldquo;I finally found one place that does literally everything.&rdquo;
          </p>

          <h1 className="headline max-w-[15ch] text-[clamp(2.1rem,6.65vw,5.32rem)] text-bone">
            One home
            <br />
            for your fun,
            <br />
            your friends,
            <br />
            your <span className="marker">content</span>.
          </h1>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-narrow">
              <p className="serif-lead text-balance text-lg leading-relaxed text-bone-dim">
                Shobble is a creator-first social platform where artists, musicians,
                game developers, authors, and filmmakers share their work and build
                an audience. Your shop, your members, your community, and your
                library - all on one platform for human-made content.
              </p>
              <p className="mt-4 font-display text-sm uppercase leading-relaxed tracking-[0.12em] text-bone">
                Users share posts, commissions, memberships, art, music, video,
                games, and writing. Find communities or fandoms with real people,
                no AI slop.
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
              href="#gallery"
              className="border border-line px-5 py-3 font-display text-sm uppercase tracking-[0.12em] text-bone transition-colors hover:border-bone-dim"
            >
              Browse the studio
            </a>
          </div>
        </div>

        <div className="space-y-4 md:hidden">
          <div className="border border-line bg-bone p-3 text-ink">
            <div className="relative aspect-[4/3] overflow-hidden border border-black/10">
              <ProtectedImage src="/Shobbl/gabemtnz.png" alt="Black-and-white photo of Gabe Martinez" className="object-cover" />
            </div>
            <div className="mt-3 font-display text-xl font-bold">@gabemtnz</div>
            <p className="mt-1 text-sm text-black/65">Breakcore, jungle, experimental hip-hop.</p>
          </div>
          <div className="border border-line bg-ash p-4">
            <span className="font-display text-sm text-bone">Member note</span>
            <div className="text-bone-dim">&ldquo;your drops are sick&rdquo;</div>
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
              <ProtectedImage src="/Shobbl/gabemtnz.png" alt="Black-and-white photo of Gabe Martinez" className="object-cover" />
            </div>
            <div className="mb-4 mt-4 flex items-center justify-between border-b border-black/10 pb-3">
              <span className="font-display text-sm uppercase tracking-[0.12em] text-black/60">Creator profile</span>
              <span className="h-3 w-3 rounded-full bg-red-shobbl" />
            </div>
            <div className="max-w-[12.5rem] font-display text-xl font-bold leading-none">@gabemtnz</div>
            <p className="mt-2 text-sm text-black/65">Breakcore, jungle, experimental hip-hop.</p>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {["Producer", "Vocalist", "DJ"].map((role) => (
                <div key={role} className="bg-black/5 p-2">
                  <strong className="block font-display text-sm">{role}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute right-0 top-20 w-[340px] rotate-[-1deg] border border-line bg-[#2a2024] p-5">
            <span className="font-display text-xs uppercase tracking-[0.12em] text-bone-dim">Membership room</span>
            <div className="mt-3 space-y-3">
              {[
                ["Mina", "Collector", "your drops are sick"],
                ["Jon", "Supporter", "nicest producer to work with"],
                ["Ari", "Member", "hard drums, the bass, the vocals"],
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
