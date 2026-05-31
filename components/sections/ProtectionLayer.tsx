import Image from "next/image";
import { SectionTag } from "@/components/artifacts/SectionTag";
import { NotForScraping } from "@/components/artifacts/NotForScraping";
import { Stamp } from "@/components/artifacts/Stamp";
import { HumanMark } from "@/components/artifacts/HumanMark";
import { CreatorIdCard } from "@/components/artifacts/CreatorIdCard";

/**
 * Q6 — How is content protected?
 * The page's anti-AI moment: a single large visual metaphor — a framed piece of
 * art with a redacted AI-crawler censor bar and a signed rights slip.
 * Verification follows as a lighter, supporting beat.
 */
const denied = ["Training without consent", "Dataset resale", "Style theft", "Bulk harvesting"];

export function ProtectionLayer() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-44">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(182,106,112,0.16),transparent_30rem)]" aria-hidden />
      <div className="relative mx-auto max-w-wall px-5">
        <SectionTag index="06" label="how your work is protected" />

        {/* the loud statement */}
        <h2 className="headline mt-6 max-w-[14ch] text-[clamp(3rem,10vw,8rem)] leading-[0.86] text-bone">
          Your work is
          <br />
          <span className="text-red-shobbl">not training</span>
          <br />
          <em>data.</em>
        </h2>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] md:mt-20">
          {/* THE VISUAL METAPHOR — framed art with a redacted crawler bar */}
          <figure className="relative mx-auto w-full max-w-xl">
            <div className="rotate-[-1.2deg] border-[12px] border-[#2a2024] bg-bone p-3 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.95)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/Shobbl/artheroshowcase.jpg"
                  alt="Human-made artwork protected from AI training"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 560px"
                  priority={false}
                />
                <div className="absolute inset-0 bg-black/10" aria-hidden />

                {/* the censor / redaction bar over the art */}
                <div className="absolute left-1/2 top-1/2 w-[125%] -translate-x-1/2 -translate-y-1/2 -rotate-[7deg] bg-ink/95 py-3 text-center shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                  <span className="font-display text-lg font-extrabold uppercase tracking-[0.2em] text-red-shobbl md:text-2xl">
                    Kept with consent
                  </span>
                </div>

                <span className="absolute -left-2 bottom-8">
                  <NotForScraping rotate={-6} />
                </span>
              </div>

              {/* gallery placard */}
              <figcaption className="mt-3 flex items-center justify-between px-1 text-ink">
                <span className="font-display text-sm font-semibold">
                  Anime Farmhouse Sunset - by jensenartofficial
                </span>
                <span className="font-display text-xs uppercase tracking-[0.12em] text-black/55">2026 · all rights kept</span>
              </figcaption>
            </div>

            <div className="pointer-events-none absolute -right-3 -top-5 z-20">
              <Stamp rotate={-12} reveal>© human</Stamp>
            </div>
          </figure>

          {/* the rights slip + signature — receipt brand language, not a feature box */}
          <div className="relative">
            <p className="serif-lead max-w-narrow text-xl leading-relaxed text-bone-dim">
              You didn&apos;t spend a decade learning your craft so someone else
              could strip it for parts. Your art carries your boundary with it:
              permission, credit, context, and the right to say no.
            </p>

            <div className="receipt mt-8 w-full max-w-sm px-6 py-6 text-[#161616]" style={{ transform: "rotate(-1.5deg)" }}>
              <div className="flex items-center justify-between font-display text-[0.66rem] uppercase tracking-[0.12em]">
                <span>Maker&apos;s boundary</span>
                <span>kept by you</span>
              </div>
              <div className="my-3 border-t border-dashed border-black/40" />
              <ul className="space-y-2">
                {denied.map((d) => (
                  <li key={d} className="flex items-center justify-between text-sm">
                    <span className="text-black/75 line-through decoration-[var(--shobbl-red-deep)] decoration-2">
                      {d}
                    </span>
                    <span className="font-display text-[0.6rem] font-bold uppercase tracking-[0.1em] text-[var(--shobbl-red-deep)]">
                      denied
                    </span>
                  </li>
                ))}
              </ul>
              <div className="my-3 border-t border-dashed border-black/40" />
              {/* hand signature */}
              <div className="flex items-end justify-between">
                <div>
                  <svg width="120" height="34" viewBox="0 0 120 34" fill="none" aria-hidden>
                    <path
                      d="M4 24c8-14 12 6 16-2s5-16 9-6 4 14 9 6 6-12 11-6 5 10 12 4 9-10 16-4 9 8 18 2"
                      stroke="#161616"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <div className="mt-1 font-display text-[0.6rem] uppercase tracking-[0.12em] text-black/55">
                    Signed by the maker
                  </div>
                </div>
                <span className="font-display text-[0.6rem] uppercase tracking-[0.12em] text-black/55">
                  Shobbl · witnessed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* lighter beat — real humans, not prompts */}
        <div className="mt-20 grid gap-10 border-t border-line pt-14 md:mt-28 md:grid-cols-[0.95fr_1.05fr] md:items-center md:pt-16">
          <div className="flex items-start gap-5">
            <div className="shrink-0">
              <HumanMark size={88} />
            </div>
            <div>
              <h3 className="font-display text-2xl leading-tight text-bone md:text-3xl">
                And everyone here is a <span className="text-red-shobbl">person</span>, not a prompt.
              </h3>
              <p className="serif-lead mt-3 max-w-md text-bone-dim">
                Verification is a promise to the room: human makers, human
                context, and no pretending a scraped imitation is the same as a
                person with a name.
              </p>
            </div>
          </div>

          <div className="relative flex flex-wrap items-center justify-start gap-4 md:justify-end">
            <CreatorIdCard
              handle="@pixel_witch"
              discipline="Illustrator"
              id="SHB-44129"
              avatarSrc="/Shobbl/mayarenderprofile.png"
              rotate={-4}
              swatch="var(--shobbl-red)"
            />
            <CreatorIdCard
              handle="@inkbones"
              discipline="Game Developer"
              id="SHB-10256"
              avatarSrc="/Shobbl/samkotoprofile.png"
              rotate={3}
              swatch="var(--signal-green)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
