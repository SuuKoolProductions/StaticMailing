/**
 * "NOT FOR SCRAPING" protection stamp — diagonal warning tape feel.
 * Sits over content to signal anti-AI / anti-scrape protection.
 */
export function NotForScraping({
  rotate = -8,
  className = "",
}: {
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-flex items-center gap-2 border-y-2 border-red-shobbl bg-[repeating-linear-gradient(45deg,rgba(231,55,61,0.14)_0_10px,transparent_10px_20px)] px-3 py-1.5 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="font-display text-[0.76rem] font-bold uppercase tracking-[0.12em] text-red-shobbl">
        Not for scraping
      </span>
      <span className="font-display text-[0.66rem] uppercase tracking-[0.1em] text-bone-dim">
        No AI training
      </span>
    </span>
  );
}
