/**
 * Printed section label: file-tab energy without developer styling.
 */
export function SectionTag({
  index,
  label,
  align = "left",
}: {
  index: string;
  label: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "right" ? "flex-row-reverse text-right" : ""
      }`}
    >
      <span className="inline-flex items-center justify-center border border-line bg-[#21191d] px-2 py-1 font-display text-[0.72rem] text-bone-dim">
        {index}
      </span>
      <span className="h-px flex-1 max-w-[60px] bg-line" />
      <span className="font-display text-xs uppercase tracking-[0.12em] text-bone-dim">{label}</span>
    </div>
  );
}
