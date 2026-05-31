import Image from "next/image";

export type Creator = {
  name: string;
  handle: string;
  /** Short creator type, e.g. "Illustrator", "Musician", "Writer" */
  discipline: string;
  /** comma-free list of disciplines, shown as "· " separated tags */
  tags: string[];
  bio: string;
  members: string;
  posts: string;
  joined: string;
  /** "From $5/mo" style hook */
  from: string;
  /** CSS color (token or hex) used for accents on this card */
  accent: string;
  /** Cover gradient used until a real cover image is added */
  cover: string;
  /** Optional real cover image, e.g. "/Shobbl/pixelwitch-cover.jpg" */
  coverSrc?: string;
  /** Optional real avatar image, e.g. "/Shobbl/pixelwitch.jpg" */
  avatarSrc?: string;
  /** Small status pill, e.g. "New", "Open" */
  status?: string;
  /** A recent human action inside the creator's space */
  roomNote: string;
  /** A current drop, scene, chapter, or build that makes the card feel alive */
  latest: string;
};

/**
 * CreatorCard — a believable artist-alley / gallery card for one creator.
 * Cover + avatar fall back to styled placeholders until real photos are added
 * (drop files in /public/Shobbl and set coverSrc / avatarSrc on the data).
 */
export function CreatorCard({
  creator,
  featured = false,
}: {
  creator: Creator;
  featured?: boolean;
}) {
  const initials = creator.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <article
      className={`group panel jitter relative flex flex-col overflow-hidden ${
        featured ? "md:flex-row" : ""
      }`}
    >
      {/* cover */}
      <div
        className={`relative overflow-hidden ${
          featured ? "md:w-1/2" : ""
        }`}
        style={{ aspectRatio: featured ? "4 / 3" : "16 / 10" }}
      >
        <div className="absolute inset-0" style={{ background: creator.cover }} aria-hidden />
        {creator.coverSrc && (
          <Image
            src={creator.coverSrc}
            alt={`${creator.name}'s work`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
        {/* a faint brush-stroke texture so the placeholder reads as art */}
        <div className="absolute inset-0 opacity-50 bg-[repeating-linear-gradient(125deg,transparent_0_26px,rgba(0,0,0,0.05)_26px_28px)]" aria-hidden />

        <span className="absolute left-3 top-3 bg-ink/80 px-2.5 py-1 font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-bone">
          {creator.discipline}
        </span>
        {creator.status && (
          <span className="absolute bottom-3 left-3 bg-bone px-2.5 py-1 font-display text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink">
            {creator.status}
          </span>
        )}
        <span className="absolute right-3 top-3 bg-bone px-2.5 py-1 font-display text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink">
          {creator.from}
        </span>
      </div>

      {/* body */}
      <div className={`relative flex flex-1 flex-col p-5 ${featured ? "md:p-7" : ""}`}>
        {/* Small cards overlap the cover; featured cards keep the avatar inside the panel so it doesn't clip. */}
        <div
          className={`absolute left-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#21191d] font-display text-lg font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] ${
            featured ? "top-5" : "-top-8"
          }`}
          style={{ background: creator.accent }}
        >
          {creator.avatarSrc ? (
            <Image src={creator.avatarSrc} alt={creator.name} fill className="object-cover" sizes="64px" />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        <div className={`${featured ? "mt-20" : "mt-8"} flex items-start justify-between gap-3`}>
          <div>
            <h3 className={`font-display font-bold text-bone ${featured ? "text-2xl" : "text-xl"}`}>
              {creator.name}
            </h3>
            <div className="font-display text-sm text-bone-dim">@{creator.handle}</div>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 font-display text-xs text-bone-dim">
          {creator.tags.map((t, i) => (
            <span key={t} className="flex items-center gap-2">
              {i > 0 && <span className="text-bone-dim/40">·</span>}
              {t}
            </span>
          ))}
        </div>

        <p className="serif-lead mt-3 flex-1 text-sm leading-relaxed text-bone-dim">
          {creator.bio}
        </p>

        <div className="mt-4 border border-line bg-[#171113] p-3">
          <div className="font-display text-[0.62rem] uppercase tracking-[0.12em] text-bone-dim">
            Latest in the room
          </div>
          <p className="mt-1 text-sm leading-snug text-bone">{creator.latest}</p>
          <p className="mt-2 text-xs leading-snug text-bone-dim">{creator.roomNote}</p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-display text-[0.7rem] uppercase tracking-[0.08em] text-bone-dim">
          <span><strong className="text-bone">{creator.members}</strong> members</span>
          <span><strong className="text-bone">{creator.posts}</strong> posts</span>
          <span>joined {creator.joined}</span>
        </div>

        <span
          className="mt-4 inline-flex w-fit items-center gap-2 font-display text-sm font-semibold transition-transform group-hover:translate-x-0.5"
          style={{ color: creator.accent }}
        >
          Visit studio
          <span aria-hidden>→</span>
        </span>
      </div>
    </article>
  );
}
