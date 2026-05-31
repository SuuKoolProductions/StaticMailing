import { SectionTag } from "@/components/artifacts/SectionTag";
import { PayoutSlip } from "@/components/artifacts/PayoutSlip";
import { ModerationLabel } from "@/components/artifacts/ModerationLabel";
import { FolderTab } from "@/components/artifacts/Motifs";

/**
 * Q2 — Why do creators need it?
 * Emotional story of building a living on borrowed platforms, with the
 * receipt wall as lived proof rather than an investigation board.
 */
export function WhyCreators() {
  return (
    <section className="relative overflow-hidden bg-coal py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(214,162,78,0.08),transparent_24rem)]" aria-hidden />
      <div className="relative mx-auto max-w-wall px-5">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:pt-6">
            <SectionTag index="02" label="why creators need it" />
            <h2 className="headline mt-4 text-[clamp(2rem,5vw,3.8rem)] text-bone">
              You built a living
              <br />
              on <span className="text-red-shobbl">rented land</span>.
            </h2>
            <p className="serif-lead mt-5 max-w-narrow text-lg text-bone-dim">
              You poured years into the work. Then a feed decided who got to see
              it. A payout got frozen the week rent was due. An account you didn&apos;t
              own held the people you spent years gathering.
            </p>
            <p className="serif-lead mt-4 max-w-narrow text-lg text-bone-dim">
              None of it was yours to keep. That&apos;s the part that has to change.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ModerationLabel code="Sound familiar" text="Payout on hold" tone="warn" rotate={-2} />
              <ModerationLabel code="Sound familiar" text="Reach throttled" tone="kill" rotate={1.5} />
            </div>
          </div>

          {/* the receipts: real creator pain, pinned up like a kitchen drawer */}
          <div className="relative mt-7 grid gap-6 border border-line bg-[#21191d] p-6 lg:min-h-[540px] lg:block lg:p-8">
            <div className="absolute -top-[1.65rem] left-5">
              <FolderTab>the receipts</FolderTab>
            </div>
            <span className="absolute right-3 top-2 font-display text-[0.62rem] uppercase tracking-[0.14em] text-bone-dim">
              Payouts that never came
            </span>

            <div className="relative mt-8 lg:absolute lg:left-10 lg:top-[72px] lg:z-20 lg:mt-0">
              <PayoutSlip payee="@pixel_witch" amount="$6,120" status="FROZEN" note="No explanation. 90-day review. Rent was due Friday." rotate={-4} slipId="2769" />
            </div>
            <div className="relative justify-self-end lg:absolute lg:right-10 lg:top-20 lg:z-10">
              <PayoutSlip payee="@lofi_ghost" amount="$842" status="WITHHELD" note="Flagged by review. No human ever replied." rotate={5} slipId="1330" />
            </div>
            <div className="relative lg:absolute lg:left-[220px] lg:top-[296px] lg:z-30">
              <PayoutSlip payee="@inkbones" amount="$3,300" status="UNDER REVIEW" note="A chargeback I never saw froze a year of work." rotate={2} slipId="1530" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
