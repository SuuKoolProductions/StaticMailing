import Image from "next/image";
import { ReactNode } from "react";

type Variant = "pinned" | "taped" | "stamped" | "filed";

/**
 * EvidenceFrame — screenshots presented like portfolio/storefront previews.
 * Each variant has a distinct frame so screenshots never sit in identical
 * rounded rectangles. Accepts an optional overlay (stamps, labels).
 */
export function EvidenceFrame({
  src,
  alt,
  caption,
  exhibit,
  variant = "pinned",
  rotate = 0,
  ratio = "16 / 10",
  overlay,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  exhibit?: string;
  variant?: Variant;
  rotate?: number;
  ratio?: string;
  overlay?: ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={`jitter relative ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {variant === "pinned" && (
        <div className="tape tape-right border border-line bg-[#21191d] p-3 shadow-[0_28px_70px_-42px_rgba(0,0,0,0.9)]">
          <div className="relative w-full overflow-hidden border border-line/70 bg-coal" style={{ aspectRatio: ratio }}>
            <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        </div>
      )}

      {variant === "taped" && (
        <div className="tape tape-left border border-line bg-bone p-2">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: ratio }}>
            <Image src={src} alt={alt} fill className="object-cover grayscale-[0.15]" sizes="(max-width:768px) 100vw, 40vw" />
          </div>
        </div>
      )}

      {variant === "stamped" && (
        <div className="relative border border-line bg-[#21191d] p-3">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: ratio }}>
            <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
          </div>
        </div>
      )}

      {variant === "filed" && (
        <div className="relative border border-line bg-[#2b2025] p-3">
          <div className="relative w-full overflow-hidden border border-line/70" style={{ aspectRatio: ratio }}>
            <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 25vw" />
          </div>
        </div>
      )}

      {overlay}

      {(caption || exhibit) && (
        <figcaption className="mt-2 flex items-center gap-2">
          {exhibit && (
            <span className="shrink-0 bg-bone px-2 py-1 font-display text-[0.72rem] uppercase tracking-[0.08em] text-ink">
              {exhibit}
            </span>
          )}
          {caption && (
            <span className="font-display text-[0.72rem] leading-tight text-bone-dim">{caption}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
