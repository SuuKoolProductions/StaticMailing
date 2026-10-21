"use client";

import { FormEvent, useMemo, useState } from "react";

type Severity = "blocker" | "major" | "minor";

const SEVERITIES: Array<{ value: Severity; label: string; description: string }> = [
  { value: "blocker", label: "Blocker", description: "Prevents you from using a core feature" },
  { value: "major", label: "Major", description: "Feature is broken or seriously impaired" },
  { value: "minor", label: "Minor", description: "Small issue with a workaround" },
];

const AREAS = ["Upload", "Player", "Subtitles", "Tagging", "Auth", "Payments", "Wallet", "Explore", "Other"] as const;

const fieldClass =
  "w-full border border-line bg-[#130f11] px-3 py-3 font-display text-sm text-bone outline-none transition-colors placeholder:text-bone-dim/50 focus:border-red-shobbl";

export function BugReportForm() {
  const [title, setTitle] = useState("");
  const [happened, setHappened] = useState("");
  const [expected, setExpected] = useState("");
  const [stepsToReproduce, setStepsToReproduce] = useState("");
  const [severity, setSeverity] = useState<Severity>("major");
  const [area, setArea] = useState<(typeof AREAS)[number]>("Other");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);

  const captured = useMemo(() => {
    if (typeof window === "undefined") return null;
    return {
      url: window.location.href,
      userAgent: window.navigator.userAgent,
      viewportW: window.innerWidth,
      viewportH: window.innerHeight,
    };
  }, []);

  function reset() {
    setTitle("");
    setHappened("");
    setExpected("");
    setStepsToReproduce("");
    setSeverity("major");
    setArea("Other");
    setAttachment(null);
    setError(null);
    setReportId(null);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      setError("Please add a short title.");
      return;
    }
    if (attachment && attachment.size > 5 * 1024 * 1024) {
      setError("Attachment too large (max 5MB).");
      return;
    }

    setSubmitting(true);
    try {
      const form = new FormData();
      form.set("title", normalizedTitle);
      form.set("happened", happened.trim());
      form.set("expected", expected.trim());
      form.set("stepsToReproduce", stepsToReproduce.trim());
      form.set("severity", severity);
      form.set("area", area.toLowerCase());
      form.set("source", "page");
      if (captured?.url) form.set("url", captured.url);
      if (captured?.userAgent) form.set("userAgent", captured.userAgent);
      if (captured?.viewportW) form.set("viewportW", String(captured.viewportW));
      if (captured?.viewportH) form.set("viewportH", String(captured.viewportH));
      if (attachment) form.set("attachment", attachment, attachment.name);

      const response = await fetch("/api/bug-reports", { method: "POST", body: form });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "Failed to submit bug report.");
        return;
      }
      setReportId(typeof data.id === "string" ? data.id : "submitted");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (reportId) {
    return (
      <div className="border border-line bg-[#130f11] px-6 py-10 text-center">
        <p className="font-display text-xs uppercase tracking-[0.18em] text-red-shobbl">Received</p>
        <h2 className="mt-3 font-headline text-3xl text-bone">Report submitted</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-bone-dim">
          Thanks for helping us improve Shobble. Your report ID is{" "}
          <span className="font-mono text-bone">{reportId}</span>.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 border border-line px-5 py-3 font-display text-xs uppercase tracking-[0.12em] text-bone hover:border-red-shobbl"
        >
          Submit another bug
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {error ? (
        <p className="border border-red-shobbl/40 bg-red-shobbl/10 px-4 py-3 text-sm text-bone" role="alert">
          {error}
        </p>
      ) : null}

      <div>
        <label htmlFor="bug-page-title" className="mb-2 block font-display text-xs uppercase tracking-[0.12em] text-bone-dim">
          Title
        </label>
        <input
          id="bug-page-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="One sentence summary"
          maxLength={200}
          required
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bug-page-severity" className="mb-2 block font-display text-xs uppercase tracking-[0.12em] text-bone-dim">
            Severity
          </label>
          <select
            id="bug-page-severity"
            value={severity}
            onChange={(event) => setSeverity(event.target.value as Severity)}
            className={fieldClass}
          >
            {SEVERITIES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-bone-dim">
            {SEVERITIES.find((item) => item.value === severity)?.description}
          </p>
        </div>
        <div>
          <label htmlFor="bug-page-area" className="mb-2 block font-display text-xs uppercase tracking-[0.12em] text-bone-dim">
            Area
          </label>
          <select
            id="bug-page-area"
            value={area}
            onChange={(event) => setArea(event.target.value as (typeof AREAS)[number])}
            className={fieldClass}
          >
            {AREAS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="bug-page-happened" className="mb-2 block font-display text-xs uppercase tracking-[0.12em] text-bone-dim">
          What happened?
        </label>
        <textarea
          id="bug-page-happened"
          value={happened}
          onChange={(event) => setHappened(event.target.value)}
          placeholder="Describe what you saw, including any error message"
          rows={4}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="bug-page-expected" className="mb-2 block font-display text-xs uppercase tracking-[0.12em] text-bone-dim">
          What did you expect?
        </label>
        <textarea
          id="bug-page-expected"
          value={expected}
          onChange={(event) => setExpected(event.target.value)}
          placeholder="Describe the expected behavior"
          rows={3}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="bug-page-steps" className="mb-2 block font-display text-xs uppercase tracking-[0.12em] text-bone-dim">
          Steps to reproduce
        </label>
        <textarea
          id="bug-page-steps"
          value={stepsToReproduce}
          onChange={(event) => setStepsToReproduce(event.target.value)}
          placeholder={"1. Open...\n2. Select...\n3. See the issue"}
          rows={5}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="bug-page-attachment" className="mb-2 block font-display text-xs uppercase tracking-[0.12em] text-bone-dim">
          Screenshot or video (optional, max 5MB)
        </label>
        <input
          id="bug-page-attachment"
          type="file"
          accept="image/*,video/*"
          onChange={(event) => setAttachment(event.target.files?.[0] || null)}
          className={`${fieldClass} file:mr-3 file:border-0 file:bg-transparent file:font-display file:text-xs file:uppercase file:tracking-[0.12em] file:text-bone`}
        />
        {attachment ? (
          <p className="mt-2 text-xs text-bone-dim">
            Attached: {attachment.name} ({Math.ceil(attachment.size / 1024)} KB)
          </p>
        ) : null}
      </div>

      <p className="border border-line bg-[#130f11] px-4 py-3 text-xs leading-5 text-bone-dim">
        We automatically include this page URL, browser, and viewport size to help reproduce the issue.
        Do not include passwords, payment details, or other sensitive information.
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center bg-red-shobbl px-6 py-3 font-display text-sm uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {submitting ? "Sending" : "Submit bug"}
      </button>
    </form>
  );
}
