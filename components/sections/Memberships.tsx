import { SectionTag } from "@/components/artifacts/SectionTag";

/**
 * Q5 - How do memberships work?
 * Tiers shown as levels of access inside ONE creator space, not separate
 * platforms. Fan-club / membership-board language.
 */
const tiers = [
  { name: "Free Tier", perk: "Kudos, and member-only posts!", price: "Free" },
  { name: "Supporters", perk: "WIPs and exclusive posts", price: "$5" },
  { name: "Backers", perk: "All of the above, plus free assets!", price: "$12" },
  { name: "Collectors", perk: "All of the above, plus discounts on my products", price: "$25" },
  { name: "Besties", perk: "All of the above, plus exclusive commission slots", price: "$50" },
];

const roomNotes = [
  { name: "Mina", tier: "Collector", note: "I love getting good deals!" },
  { name: "Jon", tier: "Supporter", note: "Lauren does great sketches." },
  { name: "Ari", tier: "Bestie", note: "Lauren's art keeps me going." },
];

export function Memberships() {
  return (
    <section id="features" className="relative overflow-hidden bg-[#181214] py-24 md:py-36">
      <div className="relative mx-auto max-w-wall px-5">
        <div className="mb-12 max-w-narrow">
          <SectionTag index="03" label="how memberships work" />
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,3.4rem)] text-bone">
            Every fan on{" "}
            <span className="marker">one platform</span>.
          </h2>
          <p className="serif-lead mt-4 text-lg text-bone-dim">
            Offer perks to subscribers as your following grows.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          {/* the access ladder */}
          <div className="relative border border-line bg-[#130f11] p-6 md:p-8">
            <span className="absolute right-4 top-4 font-display text-[0.62rem] uppercase tracking-[0.14em] text-bone-dim">
              Example membership plan
            </span>
            <div className="mt-6 space-y-3">
              {tiers.map((t, i) => (
                <div
                  key={t.name}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 border border-line bg-[#1c1518] p-4"
                  style={{ marginLeft: `${i * 0.9}rem` }}
                >
                  <div>
                    <div className="font-display text-lg text-bone">{t.name}</div>
                    <div className="mt-0.5 text-sm text-bone-dim">{t.perk}</div>
                  </div>
                  <div className="font-display text-base text-red-shobbl">{t.price}</div>
                </div>
              ))}
            </div>
            <p className="serif-lead mt-6 text-sm text-bone-dim">
              You set the levels, the perks, and the prices. Fans sign up when
              they&apos;re ready.
            </p>
          </div>

          {/* a community room, not a control panel */}
          <div className="relative lg:mt-10">
            <div className="absolute -right-4 -top-6 hidden rotate-3 border border-line bg-bone px-4 py-3 font-display text-xs uppercase tracking-[0.12em] text-ink md:block">
              Lauren&apos;s Corner
            </div>
            <div className="border border-line bg-[#21191d] p-5 md:p-7">
              <div className="flex flex-wrap items-center gap-3 border-b border-line pb-5">
                {["Free", "Supporter", "Backer", "Collector", "Bestie"].map((label, i) => (
                  <span
                    key={label}
                    className="rounded-full border border-line bg-coal px-3 py-1 font-display text-[0.62rem] uppercase tracking-[0.12em] text-bone-dim"
                    style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-[1fr_0.8fr]">
                <div className="space-y-4">
                  {roomNotes.map((entry) => (
                    <div key={entry.name} className="border border-line bg-coal p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-base text-bone">{entry.name}</span>
                        <span className="font-display text-[0.58rem] uppercase tracking-[0.12em] text-red-shobbl">
                          {entry.tier}
                        </span>
                      </div>
                      <p className="serif-lead mt-2 text-sm text-bone-dim">&ldquo;{entry.note}&rdquo;</p>
                    </div>
                  ))}
                </div>

                <div className="receipt self-start px-6 py-6 text-[#161616]" style={{ transform: "rotate(1.4deg)" }}>
                  <div className="flex items-center justify-between font-display text-[0.66rem] uppercase tracking-[0.12em]">
                    <span>Bestie receipt</span>
                    <span>#0030</span>
                  </div>
                  <div className="my-3 border-t border-dashed border-black/40" />
                  <ul className="space-y-1.5 text-[0.72rem] text-black/75">
                    <li>✓ WIPs</li>
                    <li>✓ Free Assets</li>
                    <li>✓ Discounts</li>
                    <li>✓ Exclusive Commissions</li>
                  </ul>
                  <div className="my-3 border-t border-dashed border-black/40" />
                  <div className="font-display text-[0.6rem] uppercase tracking-[0.12em] text-black/55">
                    Thank you for supporting me!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
