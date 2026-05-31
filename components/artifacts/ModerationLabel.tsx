/**
 * Moderation / classification label — like a card pinned to a case file.
 * tone drives the color: neutral system tag, warn (restricted), kill (takedown).
 */
export function ModerationLabel({
  code,
  text,
  tone = "neutral",
  rotate = 0,
}: {
  code: string;
  text: string;
  tone?: "neutral" | "warn" | "kill" | "ok";
  rotate?: number;
}) {
  const tones: Record<string, { fg: string; bar: string }> = {
    neutral: { fg: "var(--bone)", bar: "var(--graphite)" },
    warn: { fg: "var(--signal-amber)", bar: "var(--signal-amber)" },
    kill: { fg: "var(--shobbl-red)", bar: "var(--shobbl-red)" },
    ok: { fg: "var(--signal-green)", bar: "var(--signal-green)" },
  };
  const t = tones[tone];
  return (
    <div
      className="inline-flex items-stretch border border-line bg-ash"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="w-1.5" style={{ background: t.bar }} />
      <span className="px-2 py-1">
        <span className="block font-display text-[0.62rem] uppercase tracking-[0.12em] text-bone-dim">
          {code}
        </span>
        <span
          className="block font-display text-[0.78rem] font-bold uppercase tracking-[0.08em]"
          style={{ color: t.fg }}
        >
          {text}
        </span>
      </span>
    </div>
  );
}
