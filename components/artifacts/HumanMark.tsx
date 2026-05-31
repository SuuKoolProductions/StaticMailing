/**
 * Human-created verification mark — a hand-inked seal, deliberately imperfect.
 * Not a clean checkmark badge. Drawn as an irregular wax-seal-ish blob + glyph.
 */
export function HumanMark({ size = 84, label = true }: { size?: number; label?: boolean }) {
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
        className="drop-shadow-[0_6px_14px_rgba(231,55,61,0.35)]"
      >
        <path
          d="M50 6c14 0 18 8 30 12s10 18 6 30 2 22-6 30-22 4-30 10-22-2-30-10-10-18-6-30-2-22 6-30S36 6 50 6Z"
          fill="rgba(231,55,61,0.12)"
          stroke="var(--shobbl-red)"
          strokeWidth="2"
          strokeDasharray="3 4"
        />
        <path
          d="M34 52c5 8 11 12 16 12s11-4 16-12"
          stroke="var(--shobbl-red)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="40" cy="42" r="3" fill="var(--shobbl-red)" />
        <circle cx="60" cy="42" r="3" fill="var(--shobbl-red)" />
      </svg>
      {label && (
        <span className="text-center font-display text-[0.62rem] uppercase leading-tight tracking-[0.12em] text-bone-dim">
          MADE BY
          <br />A HUMAN
        </span>
      )}
    </span>
  );
}
