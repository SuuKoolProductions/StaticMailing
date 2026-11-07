import { ProtectedImage } from "@/components/artifacts/ProtectedImage";
import { ShareShobble } from "@/components/ShareShobble";

const socials = [
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@shobble.app",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
        <path d="M14.5 3c.4 2.6 1.9 4.4 4.5 4.7v2.5c-1.5 0-2.9-.5-4.1-1.3v6.6c0 3.4-2.7 6-6.1 6S2.7 18.9 2.7 15.5c0-3.3 2.6-5.9 5.9-6v2.6c-1.8.1-3.3 1.6-3.3 3.4 0 1.9 1.5 3.4 3.4 3.4s3.4-1.5 3.4-3.4V3h2.4Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/shobble.app",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Threads",
    href: "https://www.threads.com/@shobble.app",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" d="M9 11.8c.4 2.2 2 3.5 4 3.2 2.2-.3 3.4-1.8 3.4-3.6 0-1.6-1.1-2.7-2.6-2.7-1.9 0-3.2 1.5-3.2 3.6 0 3.2 2.4 5.4 5.8 5.2 3.6-.2 6.1-2.8 6.1-6.6C22.5 6.4 18.8 3 14.2 3 9.2 3 5.5 6.6 5.5 11.6c0 4.6 3.2 8.2 7.8 8.4" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Shobble",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
        <path d="M22 8.2c-.2-1.6-.9-2.7-2.6-2.9C16.8 5 12 5 12 5s-4.8 0-7.4.3C2.9 5.5 2.2 6.6 2 8.2 1.8 9.6 1.8 12 1.8 12s0 2.4.2 3.8c.2 1.6.9 2.7 2.6 2.9 2.6.3 7.4.3 7.4.3s4.8 0 7.4-.3c1.7-.2 2.4-1.3 2.6-2.9.2-1.4.2-3.8.2-3.8s0-2.4-.2-3.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/Shobble.inc/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
      </svg>
    ),
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/shobble.bsky.social",
    icon: (
      <svg viewBox="0 0 32 32" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
        <path d="M12 10.8c-1.1-2.1-4.1-6-6.9-7.9C2.4 1.1 1.4 1.4.8 1.7.2 2 .1 3.1.1 3.7c0 .7.4 5.8.7 6.6 1 3.3 4.6 4.4 7.9 3.8-5.7 1-10.7 3.3-4.1 10.6 7.3 7.5 10-1.6 10.8-4.4.1-.5.2-.7.4-.7s.3.2.4.7c.8 2.8 3.5 11.9 10.8 4.4 6.6-7.3 1.6-9.6-4.1-10.6 3.3.6 6.9-.5 7.9-3.8.3-.8.7-5.9.7-6.6 0-.6-.1-1.7-.7-2-.6-.3-1.6-.6-4.3 1.2-2.8 1.9-5.8 5.8-6.9 7.9Z" />
      </svg>
    ),
  },
];

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Why Us?", href: "/#why-us" },
      { label: "Memberships", href: "/#features" },
      { label: "Preview", href: "/#gallery" },
      { label: "Join the invite list", href: "/#access" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Community Guidelines", href: "/policies/community-content-guidelines" },
      { label: "Monetization Terms", href: "/policies/monetization-terms" },
      { label: "DMCA / Copyright", href: "/policies/dmca-policy" },
      { label: "Cookie Notice", href: "/policies/cookies-notice" },
      { label: "All policies", href: "/policies" },
    ],
  },
  {
    title: "Help & Company",
    links: [
      { label: "Contact us", href: "mailto:team@shobble.com" },
      { label: "Discord community", href: "https://discord.gg/9eRQhybKaW", external: true },
      { label: "Submit a bug", href: "/submit-a-bug" },
      { label: "Press kit", href: "/press-kit" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-[#111113]">
      <div className="mx-auto grid max-w-wall grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 lg:grid-cols-[1.3fr_0.7fr_0.85fr_0.85fr]">
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="relative block h-8 w-8">
              <ProtectedImage src="/shobble-icon.svg" alt="" />
            </span>
            <span className="brand-word text-sm text-bone">SHOBBLE</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone-dim">
            The social platform for human creativity. Human-made content, creator-first tools, no AI slop.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Shobble on ${social.name}`}
                title={social.name}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-current/35 text-bone/80 transition-colors hover:border-bone hover:text-bone"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h4 className="mb-4 font-display text-sm font-bold text-bone">{column.title}</h4>
            <ul className="space-y-3 text-sm text-bone-dim">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-red-shobbl"
                    {...("external" in link && link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-wall border-t border-line px-5 py-6">
        <ShareShobble />
      </div>

      <div className="mx-auto max-w-wall border-t border-line px-5 py-5 text-xs text-bone-dim">
        © {year} Shobbl Incorporated. All rights reserved.
      </div>
    </footer>
  );
}
