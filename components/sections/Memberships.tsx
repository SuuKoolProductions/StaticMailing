import { SectionTag } from "@/components/artifacts/SectionTag";

/**
 * Q5 — How do memberships work?
 * Tiers shown as levels of access inside ONE creator space, not separate
 * platforms. Fan-club / membership-board language.
 */
const tiers = [
  { name: "Free followers", perk: "Public posts, shop updates, a way in the door", price: "Free" },
  { name: "Members", perk: "Monthly drops, WIPs, members-only releases", price: "$5" },
  { name: "Supporters", perk: "Behind-the-scenes, priority replies, early looks", price: "$12" },
  { name: "Collectors", perk: "Digital goods, archive bundles, special editions", price: "$25" },
  { name: "Early access", perk: "First looks, requests, credits, private drops", price: "$50" },
];

const roomNotes = [
  { name: "Mina", tier: "Collector", note: "This belongs next to the winter print." },
  { name: "Jon", tier: "Supporter", note: "Early access made my Friday." },
  { name: "Ari", tier: "Member", note: "I tried the brush pack on my own study." },
];

export function Memberships() {
  return (
    <section id="modules" className="relative overflow-hidden bg-[#181214] py-24 md:py-36">
      <div className="relative mx-auto max-w-wall px-5">
        <div className="mb-12 max-w-narrow">
          <SectionTag index="05" label="how memberships work" />
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,3.4rem)] text-bone">
            Every fan in{" "}
            <span className="marker">one room</span>.
          </h2>
          <p className="serif-lead mt-4 text-lg text-bone-dim">
            Not five accounts on five platforms. Free followers and your most
            devoted collectors live in the same creator space &mdash; the only thing
            that changes is how close they get.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          {/* the access ladder */}
          <div className="relative border border-line bg-[#130f11] p-6 md:p-8">
            <span className="absolute right-4 top-4 font-display text-[0.62rem] uppercase tracking-[0.14em] text-bone-dim">
              one room · many ways closer
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
              You set the levels, the perks, and the prices. Fans move up when
              they&apos;re ready &mdash; and never have to leave to do it.
            </p>
          </div>

          {/* a community room, not a control panel */}
          <div className="relative lg:mt-10">
            <div className="absolute -right-4 -top-6 hidden rotate-3 border border-line bg-bone px-4 py-3 font-display text-xs uppercase tracking-[0.12em] text-ink md:block">
              Friday drop night
            </div>
            <div className="border border-line bg-[#21191d] p-5 md:p-7">
              <div className="flex flex-wrap items-center gap-3 border-b border-line pb-5">
                {["Free", "Member", "Supporter", "Collector", "Early"].map((label, i) => (
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
                    <span>Room receipt</span>
                    <span>#0312</span>
                  </div>
                  <div className="my-3 border-t border-dashed border-black/40" />
                  <ul className="space-y-1.5 text-[0.72rem] text-black/75">
                    <li>✓ new chapter unlocked early</li>
                    <li>✓ collector bundle claimed</li>
                    <li>✓ creator replied in the thread</li>
                    <li>✓ support went straight to the maker</li>
                  </ul>
                  <div className="my-3 border-t border-dashed border-black/40" />
                  <div className="font-display text-[0.6rem] uppercase tracking-[0.12em] text-black/55">
                    Thank you for keeping art human.
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
