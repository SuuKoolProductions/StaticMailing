import { SectionTag } from "@/components/artifacts/SectionTag";
import { ProtectedImage } from "@/components/artifacts/ProtectedImage";
import { EvidenceFrame } from "@/components/artifacts/EvidenceFrame";

function PhoneShot({
  src,
  alt,
  headline,
  description,
  rotate,
  tape,
  className = "",
}: {
  src: string;
  alt: string;
  headline: string;
  description: string;
  rotate: number;
  tape: "tape-left" | "tape-right";
  className?: string;
}) {
  return (
    <div className={`mx-auto w-[84%] max-w-[17rem] ${className}`}>
      <div className={`tape ${tape}`} style={{ transform: `rotate(${rotate}deg)` }}>
        <div className="rounded-[1.85rem] border border-line bg-[#100d0f] p-1.5 shadow-[0_18px_36px_-16px_rgba(0,0,0,0.72),0_8px_18px_-12px_rgba(0,0,0,0.45)]">
          <div className="relative aspect-[772/1680] overflow-hidden rounded-[1.45rem] bg-ink">
            <ProtectedImage src={src} alt={alt} className="object-cover" />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="font-display text-[1.15rem] leading-tight text-bone">{headline}</h3>
        <p className="mt-1.5 font-display text-sm leading-snug text-bone-dim">{description}</p>
      </div>
    </div>
  );
}

/**
 * Section 9 - Platform preview wall.
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
            Walk the rooms before you move in - the shop, the community, the
            member spaces, the drops - all the same creator-owned home.
          </p>
        </div>

        {/* curated, asymmetric - mixed artifacts with room to breathe */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12 md:gap-y-24">
          <div className="md:col-span-6">
            <div className="jitter tape tape-right border border-line bg-bone p-3 text-ink shadow-[0_28px_70px_-42px_rgba(0,0,0,0.9)]" style={{ transform: "rotate(-0.8deg)" }}>
              <div className="relative aspect-square overflow-hidden border border-black/10">
                <ProtectedImage src="/Shobbl/bunnyjane-worktable.jpg" alt="Bunny Jane's character art: a pink bunny in a hat and striped sweater" className="object-cover" />
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
            <EvidenceFrame src="/Shobbl/dakidaki-memberships.jpg" alt="DakiDaki membership tiers on Shobble" variant="taped" exhibit="Memberships" caption="Members, supporters, collectors, and early access gathered around the same creator." rotate={1.4} ratio="1024 / 583" />
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
            <figure className="pt-3">
              <div className="grid grid-cols-1 gap-12 min-[1200px]:grid-cols-2 min-[1200px]:gap-6">
                <PhoneShot
                  src="/Shobbl/social-feed-phone.png"
                  alt="Shobble Social feed, where you choose a feed, post, remix, reply, share Rhythms, and support creators"
                  headline="Choose your Social feed"
                  description="Post, remix, and reshare. React, reply, create Rhythms, and support creators right from the feed."
                  rotate={-4}
                  tape="tape-left"
                />
                <PhoneShot
                  src="/Shobbl/media-phone.png"
                  alt="Shobble Explore, with video, games, music, books, art, and assets together"
                  headline="Everything you make, in Explore"
                  description="Video, games, music, books, art, and assets together. Explore what is trending, share it anywhere, monetize it with memberships and sales, and keep control."
                  rotate={3}
                  tape="tape-right"
                  className="min-[1200px]:mt-14"
                />
              </div>
              <figcaption className="mt-8 max-w-lg font-display text-base leading-snug text-bone">
                One social platform to share, create, and get paid, across every kind of work.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
