import Image from "next/image";

/**
 * Creator profile card — a laminated creator credential / archive card.
 */
export function CreatorIdCard({
  handle,
  discipline,
  id,
  avatarSrc,
  verified = true,
  rotate = -1.5,
  swatch = "var(--shobbl-red)",
}: {
  handle: string;
  discipline: string;
  id: string;
  avatarSrc?: string;
  verified?: boolean;
  rotate?: number;
  swatch?: string;
}) {
  return (
    <div
      className="jitter relative w-[270px] border border-line bg-[#21191d] p-4 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="flex items-center justify-between border-b border-line pb-2">
        <span className="font-display text-[0.72rem] uppercase tracking-[0.1em] text-bone-dim">
          Creator profile
        </span>
        <span
          className="h-3 w-3 rounded-full"
          style={{ background: swatch }}
        />
      </div>

      <div className="mt-3 flex gap-3">
        <div
          className="relative h-[68px] w-[56px] shrink-0 border border-line bg-[rgba(240,229,212,0.08)]"
          aria-hidden
        >
          {avatarSrc && (
            <Image
              src={avatarSrc}
              alt=""
              fill
              className="object-cover"
              sizes="56px"
            />
          )}
          <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-lg leading-none text-bone">{handle}</div>
          <div className="mt-1 font-display text-[0.72rem] uppercase tracking-[0.12em] text-bone-dim">
            {discipline}
          </div>
          <div className="mt-3 font-display text-[0.68rem] text-bone-dim">
            Verified creator {id.slice(-4)}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2" aria-hidden>
        <span className="h-2 bg-bone/35" />
        <span className="h-2 bg-bone/20" />
        <span className="h-2 bg-bone/30" />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="font-display text-[0.62rem] uppercase tracking-[0.12em] text-bone-dim">
          HUMAN-MADE
        </span>
        {verified && (
          <span className="flex items-center gap-1 font-display text-[0.62rem] uppercase tracking-[0.12em] text-[var(--signal-green)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--signal-green)]" />
            VERIFIED
          </span>
        )}
      </div>
    </div>
  );
}
