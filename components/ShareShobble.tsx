"use client";

import { useEffect, useState, type ReactNode } from "react";

const SHARE_URL = "https://www.shobble.com";
const SHARE_TEXT = "Shobble - the all-in-one social platform for human creativity. Join the invite list:";

const url = encodeURIComponent(SHARE_URL);
const text = encodeURIComponent(SHARE_TEXT);
const textWithUrl = encodeURIComponent(`${SHARE_TEXT} ${SHARE_URL}`);

const filled = (path: string) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d={path} />
  </svg>
);

const stroked = (children: ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const targets: { name: string; href: string; icon: ReactNode }[] = [
  {
    name: "X",
    href: `https://x.com/intent/post?text=${text}&url=${url}`,
    icon: filled(
      "M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.8-6.3L6.4 22H3.3l7.3-8.3L1 2h6.3l4.4 5.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z",
    ),
  },
  {
    name: "Facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    icon: filled(
      "M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z",
    ),
  },
  {
    name: "Threads",
    href: `https://www.threads.net/intent/post?text=${textWithUrl}`,
    icon: stroked(
      <path d="M9 11.8c.4 2.2 2 3.5 4 3.2 2.2-.3 3.4-1.8 3.4-3.6 0-1.6-1.1-2.7-2.6-2.7-1.9 0-3.2 1.5-3.2 3.6 0 3.2 2.4 5.4 5.8 5.2 3.6-.2 6.1-2.8 6.1-6.6C22.5 6.4 18.8 3 14.2 3 9.2 3 5.5 6.6 5.5 11.6c0 4.6 3.2 8.2 7.8 8.4" />,
    ),
  },
  {
    name: "Bluesky",
    href: `https://bsky.app/intent/compose?text=${textWithUrl}`,
    icon: (
      <svg viewBox="0 0 32 32" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 10.8c-1.1-2.1-4.1-6-6.9-7.9C2.4 1.1 1.4 1.4.8 1.7.2 2 .1 3.1.1 3.7c0 .7.4 5.8.7 6.6 1 3.3 4.6 4.4 7.9 3.8-5.7 1-10.7 3.3-4.1 10.6 7.3 7.5 10-1.6 10.8-4.4.1-.5.2-.7.4-.7s.3.2.4.7c.8 2.8 3.5 11.9 10.8 4.4 6.6-7.3 1.6-9.6-4.1-10.6 3.3.6 6.9-.5 7.9-3.8.3-.8.7-5.9.7-6.6 0-.6-.1-1.7-.7-2-.6-.3-1.6-.6-4.3 1.2-2.8 1.9-5.8 5.8-6.9 7.9Z" />
      </svg>
    ),
  },
  {
    name: "Reddit",
    href: `https://www.reddit.com/submit?url=${url}&title=${text}`,
    icon: stroked(
      <>
        <ellipse cx="12" cy="14.5" rx="7.5" ry="5" />
        <circle cx="4.6" cy="11" r="1.6" />
        <circle cx="19.4" cy="11" r="1.6" />
        <circle cx="9.2" cy="13.8" r="0.6" fill="currentColor" />
        <circle cx="14.8" cy="13.8" r="0.6" fill="currentColor" />
        <path d="M9.6 16.7c1.4.9 3.4.9 4.8 0" />
        <path d="M12 9.5 13.1 4.5l3.4.8" />
        <circle cx="18" cy="5.3" r="1.4" />
      </>,
    ),
  },
  {
    name: "LinkedIn",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    icon: filled(
      "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5Z",
    ),
  },
  {
    name: "WhatsApp",
    href: `https://wa.me/?text=${textWithUrl}`,
    icon: stroked(
      <>
        <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4l-4.5 1.1Z" />
        <path
          d="M9.2 8.6c.3 2.8 3.4 5.9 6.2 6.2l.9-1.4-1.7-1-1 .8c-1-.5-1.9-1.4-2.4-2.4l.8-1-1-1.7-1.8.5Z"
          fill="currentColor"
          strokeWidth="1"
        />
      </>,
    ),
  },
  {
    name: "Telegram",
    href: `https://t.me/share/url?url=${url}&text=${text}`,
    icon: filled(
      "M21.4 3.6 2.9 10.7c-1 .4-1 1.6 0 1.9l4.6 1.5 1.8 5.5c.2.7 1.1.9 1.6.4l2.6-2.5 4.8 3.5c.6.4 1.4.1 1.6-.6l3.1-15.3c.2-1-.6-1.8-1.5-1.5ZM9.7 14.3l8.4-7.5-6.7 8.7-.4 3-1.3-4.2Z",
    ),
  },
  {
    name: "Email",
    href: `mailto:?subject=${encodeURIComponent("Check out Shobble")}&body=${textWithUrl}`,
    icon: stroked(
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
      </>,
    ),
  },
];

const square =
  "inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-line text-bone/80 transition-colors hover:border-red-shobbl hover:text-bone";

export function ShareShobble() {
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const nativeShare = () => {
    navigator.share({ title: "Shobble", text: SHARE_TEXT, url: SHARE_URL }).catch(() => {});
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <span className="font-display text-sm font-bold text-bone">Share Shobble</span>
      <div className="flex flex-wrap items-center gap-2">
        {canNativeShare && (
          <button
            type="button"
            onClick={nativeShare}
            aria-label="Share Shobble"
            title="Share"
            className={`${square} border-red-shobbl text-bone`}
          >
            {stroked(
              <>
                <path d="M12 3v12" />
                <path d="M7.5 7.5 12 3l4.5 4.5" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
              </>,
            )}
          </button>
        )}
        {targets.map((target) => (
          <a
            key={target.name}
            href={target.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share Shobble on ${target.name}`}
            title={target.name}
            className={square}
          >
            {target.icon}
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          aria-label={copied ? "Link copied" : "Copy link to Shobble"}
          title={copied ? "Copied!" : "Copy link"}
          className={`${square} ${copied ? "border-red-shobbl text-bone" : ""}`}
        >
          {copied
            ? stroked(<path d="m5 12.5 4.5 4.5L19 7.5" />)
            : stroked(
                <>
                  <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
                  <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
                </>,
              )}
        </button>
      </div>
    </div>
  );
}
