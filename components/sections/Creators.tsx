import { SectionTag } from "@/components/artifacts/SectionTag";
import { CreatorCard, type Creator } from "@/components/artifacts/CreatorCard";

/**
 * Creators - the page's "this place is alive" moment.
 * Mock creator profiles (artist, musician, game dev, writer + more) shown as
 * believable studio cards. Drop real images into /public/Shobbl and set
 * coverSrc / avatarSrc on each entry to replace the placeholder art.
 */
const featured: Creator = {
  name: "Gabe Martinez",
  handle: "gabemtnz",
  discipline: "Musician",
  tags: ["Breakcore", "Jungle", "Experimental hip-hop"],
  bio: "Bay Area producer, vocalist, DJ, and visual artist. Early-internet and web-aesthetic visuals, with frantic drums, distorted bass, and melancholic vocals.",
  accent: "var(--signal-green)",
  cover:
    "radial-gradient(circle at 30% 30%, #d8d8d8, transparent 55%), linear-gradient(140deg, #3a3a3a, #111111)",
  coverSrc: "/Shobbl/gabemtnz.png",
  coverAlt: "Black-and-white photo of Gabe Martinez",
  avatarSrc: "/Shobbl/gabemtnz.png",
  latest: "Independent albums including Desert, OUTSIDE, and Computer Angels, plus newer singles such as killer fish from san diego.",
  roomNote: "Breakcore, jungle, melodic rap, and experimental hip-hop.",
};

const creators: Creator[] = [
  {
    name: "Bunny Jane Artist",
    handle: "bunnyjaneartist",
    discipline: "Artist",
    tags: ["Anthro art", "Digital illustration", "Character art"],
    bio: "Anthro-styled digital paintings of original characters. Soft portraits, costume pieces, and seasonal scenes, drawn and painted by hand.",
    accent: "var(--shobbl-red)",
    cover:
      "radial-gradient(circle at 30% 24%, #f3b4d0, transparent 52%), linear-gradient(145deg, #c47aa4, #2a1524)",
    coverSrc: "/Shobbl/bunnyjaneartist.jpg",
    avatarSrc: "/Shobbl/bunnyjaneartist.jpg",
    latest: "Anthro art, including painted portraits and costumed or seasonal pieces.",
    roomNote: "Commissions are open. Say hello at @bunnyjaneartist.",
  },
  {
    name: "Luis Zuno",
    handle: "ansimuz",
    discipline: "Pixel artist",
    tags: ["16-bit assets", "Pixel art", "Game music"],
    bio: "Mexican indie game developer, composer, and pixel artist in Guadalajara. 15+ years of 16-bit assets inspired by the SNES and Sega Genesis.",
    accent: "var(--shobbl-red)",
    cover:
      "radial-gradient(circle at 70% 30%, #e07a4a, transparent 52%), linear-gradient(135deg, #3a2418, #120e0c)",
    coverSrc: "/Shobbl/luiz-zuno.png",
    avatarSrc: "/Shobbl/luiz-zuno.png",
    latest: "16-bit packs such as Gothicvania, Sunny Land, and the complete collection of tiles, sprites, and effects.",
    roomNote: "Hand-made assets for Godot, Unity, GameMaker, and RPG Maker, plus standalone games and music.",
  },
  {
    name: "Sasha Sanders",
    discipline: "CG artist",
    tags: ["Game art", "Concept art", "Environments"],
    bio: "CG artist and founder of DreamSail Games. Previously at Insomniac Games. Game art, from concept sheets to finished environments.",
    accent: "var(--amber-soft)",
    cover:
      "radial-gradient(circle at 50% 30%, #e7c27a, transparent 55%), linear-gradient(160deg, #c4783a, #2a1810)",
    coverSrc: "/Shobbl/sasha-sanders-concepts.jpg",
    coverAlt: "Game concept sheet of building studies, dragon-headed roofs, and a creature study, by Sasha Sanders",
    coverRatio: "1024 / 703",
    avatarSrc: "/Shobbl/sasha-sanders-profile.jpg",
    latest: "A floating village of wooden houses, rope bridges, and cliff dwellings.",
    roomNote: "Concept art for game worlds.",
  },
];

export function Creators() {
  return (
    <section id="creators" className="relative overflow-hidden py-24 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(231,55,61,0.10),transparent_28rem)]" aria-hidden />
      <div className="relative mx-auto max-w-wall px-5">
        <div className="mb-12 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <SectionTag index="01" label="who's already here" />
            <h2 className="headline mt-6 text-[clamp(2.4rem,6.5vw,5rem)] text-bone">
              Real people,
              <br />
              <em>real studios</em>.
            </h2>
            <p className="serif-lead mt-6 max-w-narrow text-xl leading-relaxed text-bone-dim">
              Not logos. Not "users." Artists, musicians, writers, and game devs
              running actual creator businesses - each with their own shop,
              members, and galleries. Check out some of our featured creators.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Artists", "Illustrations and commissions"],
              ["Musicians", "Tracks and albums"],
              ["Writers", "Books and comics"],
              ["Game Developers", "Games and assets"],
            ].map(([room, detail]) => (
              <div key={room} className="jitter border border-line bg-[#21191d] p-4">
                <div className="font-display text-sm uppercase tracking-[0.12em] text-bone">{room}</div>
                <p className="mt-1 text-sm text-bone-dim">{detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* featured spotlight */}
        <div className="mb-6">
          <CreatorCard creator={featured} featured />
        </div>

        {/* the populated wall */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {creators.map((c) => (
            <CreatorCard key={c.handle ?? c.name} creator={c} />
          ))}
        </div>

        <p className="mt-10 font-display text-sm uppercase tracking-[0.12em] text-bone-dim">
          Verified talented independent makers moving in every week.
        </p>
      </div>
    </section>
  );
}
