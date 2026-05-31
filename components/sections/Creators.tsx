import { SectionTag } from "@/components/artifacts/SectionTag";
import { CreatorCard, type Creator } from "@/components/artifacts/CreatorCard";

/**
 * Creators — the page's "this place is alive" moment.
 * Mock creator profiles (artist, musician, game dev, writer + more) shown as
 * believable studio cards. Drop real images into /public/Shobbl and set
 * coverSrc / avatarSrc on each entry to replace the placeholder art.
 */
const featured: Creator = {
  name: "Maya Render",
  handle: "pixel_witch",
  discipline: "Artist",
  tags: ["Illustration", "Live2D models", "Brush packs"],
  bio: "Painterly portraits, monthly brush drops, and a sketch club that critiques every WIP. Members get the layered files, not just the flats.",
  members: "2,480",
  posts: "312",
  joined: "Jan 2026",
  from: "From $5/mo",
  accent: "var(--shobbl-red)",
  cover:
    "radial-gradient(circle at 26% 28%, #e98a98, transparent 56%), radial-gradient(circle at 76% 70%, #8e6f96, transparent 52%), linear-gradient(135deg, #b66a70, #241116)",
  status: "Open for members",
  coverSrc: "/Shobbl/mayarenderbanner.png",
  avatarSrc: "/Shobbl/mayarenderprofile.png",
  latest: "Layered portrait file, palette notes, and a messy brush test for the next pack.",
  roomNote: "Collectors are voting between rose-gold lighting and rainy-window blues.",
};

const creators: Creator[] = [
  {
    name: "Theo Vale",
    handle: "lofi_ghost",
    discipline: "Musician",
    tags: ["Lo-fi", "Sample packs", "Stems"],
    bio: "Late-night beats and the loops behind them. Supporters get stems, project files, and first listens.",
    members: "1,120",
    posts: "540",
    joined: "Feb 2026",
    from: "From $3/mo",
    accent: "var(--signal-amber)",
    cover:
      "radial-gradient(circle at 30% 30%, #e7c66a, transparent 55%), linear-gradient(140deg, #6f5a74, #16121a)",
    coverSrc: "/Shobbl/theovalebanner.png",
    avatarSrc: "/Shobbl/theovaleprofilepic.png",
    latest: "A four-track sleep tape with the unmastered stems tucked behind the member door.",
    roomNote: "Supporters are leaving rain samples and naming the midnight mix.",
  },
  {
    name: "Sam Koto",
    handle: "inkbones",
    discipline: "Game developer",
    tags: ["Pixel art", "Tilesets", "Devlogs"],
    bio: "Building a pixel RPG in the open. Members vote on mechanics and get every tileset I make along the way.",
    members: "860",
    posts: "198",
    joined: "Dec 2025",
    from: "From $8/mo",
    accent: "var(--signal-green)",
    cover:
      "radial-gradient(circle at 70% 30%, #4fbf7d, transparent 52%), linear-gradient(135deg, #234b3a, #10130f)",
    coverSrc: "/Shobbl/samkotobanner.png",
    avatarSrc: "/Shobbl/samkotoprofile.png",
    latest: "Forest shrine tiles, a boss-room sketch, and the build notes that made it work.",
    roomNote: "Members picked the lantern color before it went into the demo.",
  },
  {
    name: "Wren Ash",
    handle: "margins",
    discipline: "Writer",
    tags: ["Serial fiction", "Essays", "Zines"],
    bio: "A chapter a week, plus the messy drafts and margin notes. Collectors get the print zine when each arc wraps.",
    members: "1,940",
    posts: "421",
    joined: "Nov 2025",
    from: "From $4/mo",
    accent: "var(--purple-dust)",
    cover:
      "radial-gradient(circle at 28% 70%, #9b86a2, transparent 55%), linear-gradient(135deg, #2b2330, #14101a)",
    coverSrc: "/Shobbl/wrenash%20banner.jpg",
    avatarSrc: "/Shobbl/Wren%20Ash%20Profile%20Pic.jpg",
    latest: "Chapter seven, a deleted scene, and the margin note that explains the ending.",
    roomNote: "Readers are trading theories in the spoiler thread before Friday's drop.",
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
              running actual creator businesses &mdash; each with their own shop,
              members, and catalog. Imagine your card on this wall.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["artist alley", "brush packs, commissions, layered files"],
              ["listening room", "stems, demos, sample drops"],
              ["writer table", "chapters, zines, margin notes"],
              ["dev corner", "builds, tilesets, playable updates"],
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {creators.map((c) => (
            <CreatorCard key={c.handle} creator={c} />
          ))}
        </div>

        <p className="mt-10 font-display text-sm uppercase tracking-[0.12em] text-bone-dim">
          Verified talented independent makers moving in every week.
        </p>
      </div>
    </section>
  );
}
