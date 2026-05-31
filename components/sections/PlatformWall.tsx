import Image from "next/image";
import { SectionTag } from "@/components/artifacts/SectionTag";
import { EvidenceFrame } from "@/components/artifacts/EvidenceFrame";

/**
 * Section 9 — Platform preview wall.
 * Screenshots as studio-wall evidence: taped, stamped, filed, and labelled.
 */
export function PlatformWall() {
  return (
    <section id="gallery" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-wall px-5">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <SectionTag index="07" label="what it actually looks like" />
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,3.4rem)] text-bone">
              This is your studio,
              <br />
              hung on the wall.
            </h2>
          </div>
          <p className="max-w-xs font-display text-sm leading-relaxed text-bone-dim">
            Walk the rooms before you move in &mdash; the shop, the community, the
            member spaces, the drops &mdash; all the same creator-owned home.
          </p>
        </div>

        {/* curated, asymmetric — mixed artifacts with room to breathe */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12 md:gap-y-24">
          <div className="md:col-span-6">
            <div className="jitter tape tape-right border border-line bg-bone p-3 text-ink shadow-[0_28px_70px_-42px_rgba(0,0,0,0.9)]" style={{ transform: "rotate(-0.8deg)" }}>
              <div className="relative aspect-[4/3] overflow-hidden border border-black/10">
                <Image src="/Shobbl/artheroshowcase.jpg" alt="Creator artwork in a storefront" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
              </div>
              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <span className="font-display text-[0.72rem] uppercase tracking-[0.08em] text-black/55">Work table</span>
                  <p className="mt-1 font-display text-lg font-bold">Signed print, process notes, member-only wallpaper.</p>
                </div>
                <span className="font-display text-red-shobbl">$18</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-6 md:mt-16">
            <EvidenceFrame src="/Shobbl/creator-tiers.png" alt="Creator tiers" variant="taped" exhibit="Memberships" caption="Members, supporters, collectors, and early access gathered around the same creator." rotate={1.4} />
          </div>

          <div className="md:col-span-5">
            <div className="relative border border-line bg-[#21191d] p-5" style={{ transform: "rotate(-1.1deg)" }}>
              <span className="absolute -top-4 left-4 bg-bone px-3 py-1 font-display text-[0.72rem] uppercase tracking-[0.08em] text-ink">
                Collection shelf
              </span>
              <div className="grid gap-3">
                {[
                  ["Chapter bundle", "claimed by collectors"],
                  ["Stem pack", "supporters listening first"],
                  ["Playable build", "members choosing the route"],
                ].map(([title, detail]) => (
                  <div key={title} className="border border-line bg-coal p-4">
                    <div className="font-display text-base text-bone">{title}</div>
                    <div className="mt-1 text-sm text-bone-dim">{detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-7 md:mt-16">
            <EvidenceFrame src="/Shobbl/Community.png" alt="Creator community room" variant="pinned" exhibit="Audience room" caption="Comments, requests, replies, and early looks living beside the work." rotate={0.6} />
          </div>
        </div>
      </div>
    </section>
  );
}
