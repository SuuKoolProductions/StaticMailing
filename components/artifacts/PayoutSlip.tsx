/**
 * Payout slip — a receipt-like artifact. Used two ways:
 *  - On the evidence wall as a "FROZEN / WITHHELD" slip (other platforms).
 *  - In the ownership section as a clean "RELEASED" Shobbl payout.
 */
export function PayoutSlip({
  payee,
  amount,
  status,
  note,
  rotate = -2,
  slipId,
}: {
  payee: string;
  amount: string;
  status: "RELEASED" | "FROZEN" | "WITHHELD" | "UNDER REVIEW";
  note?: string;
  rotate?: number;
  slipId?: string;
}) {
  const frozen = status !== "RELEASED";
  const fallbackId = String(
    [...payee, ...status].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 9000 + 1000
  );
  return (
    <div
      className="receipt jitter relative w-[234px] px-5 py-4 text-[#161616]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="flex items-center justify-between font-display text-[0.62rem] uppercase tracking-[0.1em]">
        <span>PAYOUT SLIP</span>
        <span>#{slipId ?? fallbackId}</span>
      </div>
      <div className="my-2 border-t border-dashed border-black/40" />
      <div className="font-display text-[0.64rem] uppercase tracking-[0.08em] text-black/60">Payee</div>
      <div className="font-display text-[0.95rem] font-bold">{payee}</div>
      <div className="mt-3 flex items-end justify-between">
        <span className="font-display text-[0.64rem] uppercase tracking-[0.08em] text-black/60">Amount</span>
        <span className="font-display text-[1.35rem] font-bold">{amount}</span>
      </div>
      <div className="my-2 border-t border-dashed border-black/40" />
      <div
        className="inline-block border-2 px-2 py-0.5 font-display text-[0.64rem] font-bold uppercase tracking-[0.1em]"
        style={{
          color: frozen ? "var(--shobbl-red-deep)" : "var(--signal-green)",
          borderColor: frozen ? "var(--shobbl-red-deep)" : "var(--signal-green)",
          transform: "rotate(-3deg)",
        }}
      >
        {status}
      </div>
      {note && <p className="mt-3 text-[0.64rem] leading-snug text-black/70">{note}</p>}
    </div>
  );
}
