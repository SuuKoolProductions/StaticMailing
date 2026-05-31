import { ReactNode } from "react";

/**
 * RoughDivider — a warm paper-gallery divider. Full-bleed; sits between sections.
 */
export function RoughDivider() {
  return (
    <div className="relative h-8 w-full overflow-visible bg-transparent" aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
      >
        {/* soft paper-gallery rule */}
        <path
          d="M0 17 C 60 12, 130 22, 210 16 S 360 11, 450 18 S 620 23, 720 15 S 900 11, 1010 19 S 1150 22, 1200 16"
          fill="none"
          stroke="var(--bone-dim)"
          strokeWidth="1.1"
          strokeOpacity="0.24"
          strokeLinecap="round"
        />
        {/* a second, lighter pass for a sketched double-line feel */}
        <path
          d="M0 20 C 80 16, 160 25, 260 19 S 430 15, 540 21 S 720 25, 840 18 S 1020 15, 1120 21 L 1200 19"
          fill="none"
          stroke="var(--line)"
          strokeWidth="1"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/**
 * Annotation — a red hand-written margin note, like a founder scribbled on a
 * printout. Optional circled emphasis + arrow.
 */
export function Annotation({
  children,
  rotate = -3,
  circle = false,
  arrow,
  className = "",
}: {
  children: ReactNode;
  rotate?: number;
  circle?: boolean;
  arrow?: "left" | "right" | "down";
  className?: string;
}) {
  const arrows = { left: "↙", right: "↗", down: "↓" };
  return (
    <span
      className={`annotate text-sm ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {arrow && arrow !== "down" && arrow === "left" && (
        <span className="annotate-arrow mr-1">{arrows.left}</span>
      )}
      <span className={circle ? "annotate-circle" : ""}>{children}</span>
      {arrow && arrow !== "left" && (
        <span className="annotate-arrow ml-1">{arrows[arrow]}</span>
      )}
    </span>
  );
}

/** FolderTab — a clipped file tab that sits on top of a panel. */
export function FolderTab({ children }: { children: ReactNode }) {
  return <span className="folder-tab">{children}</span>;
}

/** PolicyStamp — circular rubber policy stamp. */
export function PolicyStamp({
  top,
  bottom,
  center,
  rotate = -12,
  className = "",
}: {
  top: string;
  bottom: string;
  center: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      className={`policy-stamp ${className}`}
      style={{ ["--rot" as string]: `${rotate}deg` }}
    >
      <span className="text-[0.46rem] tracking-[0.18em]">{top}</span>
      <span className="my-0.5 text-[0.8rem] font-bold leading-none tracking-[0.04em]">
        {center}
      </span>
      <span className="text-[0.46rem] tracking-[0.18em]">{bottom}</span>
    </span>
  );
}
