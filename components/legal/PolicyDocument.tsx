import Link from "next/link";
import {
  extractBodyHtml,
  formatPlaintextPolicyForDisplay,
  pickHeaderValue,
  type PolicyDoc,
} from "@/lib/policies";

export function PolicyDocument({
  title,
  raw,
  type,
}: {
  title: string;
  raw: string;
  type: PolicyDoc["type"];
}) {
  const body = type === "html"
    ? extractBodyHtml(formatPlaintextPolicyForDisplay(raw))
    : formatPlaintextPolicyForDisplay(raw);
  const lastUpdated = pickHeaderValue(raw, "Last updated");
  const effective = pickHeaderValue(raw, "Effective date");

  return (
    <article className="legal-prose">
      <div className="legal-card">
        <div className="legal-card-head">
          <h2>{title}</h2>
          <p>
            {lastUpdated ? <>Last updated: {lastUpdated}{" · "}</> : null}
            {effective ? <>Effective: {effective}{" · "}</> : null}
            <Link href="/terms">Terms of Use</Link>
            {" · "}
            <Link href="/policies">All policies</Link>
          </p>
        </div>
        {type === "html" ? (
          <div className="legal-html" dangerouslySetInnerHTML={{ __html: body }} />
        ) : (
          <div className="legal-pre">{body}</div>
        )}
      </div>
    </article>
  );
}
