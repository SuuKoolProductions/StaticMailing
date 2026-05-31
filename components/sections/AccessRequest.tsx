"use client";

import { useState, FormEvent } from "react";
import { SectionTag } from "@/components/artifacts/SectionTag";
import { Stamp } from "@/components/artifacts/Stamp";

type Status = "idle" | "loading" | "ok" | "dupe" | "error";

/**
 * Section 10 — Waitlist reframed as an ACCESS REQUEST.
 * Looks like an intake form / application stamped on arrival, not an email box.
 * Posts to the existing /api/subscribe MailerLite endpoint.
 */
export function AccessRequest() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("ok");
        setMessage("Request received. Watch your inbox for the access note.");
        setEmail("");
      } else if (res.status === 409) {
        setStatus("dupe");
        setMessage("You're already on file. Sit tight.");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(data.error || "Something jammed. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  const granted = status === "ok" || status === "dupe";

  return (
    <section id="access" className="relative overflow-hidden bg-coal py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,162,78,0.08),transparent_24rem)]" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-5">
        <div className="relative border border-line bg-[#21191d] shadow-[0_28px_90px_-60px_rgba(0,0,0,0.95)]">
          <div className="relative p-8 md:p-12">
            {/* slammed stamp */}
            <div className="pointer-events-none absolute right-6 top-6 md:right-10">
              <Stamp rotate={-14} reveal className="text-sm">
                {granted ? "Received" : "Pending"}
              </Stamp>
            </div>

            <SectionTag index="08" label="your invite" />
            <h2 className="headline mt-4 max-w-[16ch] text-[clamp(2.2rem,5.5vw,4rem)] text-bone">
              Come run your
              <br />
              business in{" "}
              <span className="marker">one place</span>.
            </h2>
            <p className="serif-lead mt-4 max-w-prose text-lg text-bone-dim">
              Shobbl opens in waves. Join the creator invite list for early
              storefront slots, founding-creator standing, and a real say in what
              we build next.
            </p>

            <form onSubmit={onSubmit} className="mt-8" noValidate>
              <label className="mb-2 block font-display text-xs uppercase tracking-[0.12em] text-bone-dim">
                Email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <input
                    type="email"
                    inputMode="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@studio.example"
                    aria-label="Email address"
                    className="w-full border border-line bg-[#130f11] px-3 py-3 font-display text-bone outline-none transition-colors placeholder:text-bone-dim/50 focus:border-red-shobbl"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative inline-flex items-center justify-center gap-2 bg-red-shobbl px-6 py-3 font-display text-sm uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === "loading" ? "Sending…" : "Submit request"}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>

              {message && (
                <p
                  className="mt-4 font-display text-sm"
                  style={{
                    color: granted
                      ? "var(--signal-green)"
                      : status === "error"
                        ? "var(--shobbl-red)"
                        : "var(--bone-dim)",
                  }}
                  role="status"
                >
                  {granted ? "✓ " : status === "error" ? "✗ " : ""}
                  {message}
                </p>
              )}

              <p className="mt-6 border-t border-line pt-4 font-display text-xs uppercase leading-relaxed tracking-[0.1em] text-bone-dim">
                No scraping · no resale of this list · unsubscribe any time ·
                your data stays yours
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
