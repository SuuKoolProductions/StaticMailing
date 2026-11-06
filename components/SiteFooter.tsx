import { ProtectedImage } from "@/components/artifacts/ProtectedImage";

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
    name: "Bluesky",
    href: "https://bsky.app/profile/shobble.bsky.social",
    icon: (
      <svg viewBox="0 0 32 32" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
        <path d="M12 10.8c-1.1-2.1-4.1-6-6.9-7.9C2.4 1.1 1.4 1.4.8 1.7.2 2 .1 3.1.1 3.7c0 .7.4 5.8.7 6.6 1 3.3 4.6 4.4 7.9 3.8-5.7 1-10.7 3.3-4.1 10.6 7.3 7.5 10-1.6 10.8-4.4.1-.5.2-.7.4-.7s.3.2.4.7c.8 2.8 3.5 11.9 10.8 4.4 6.6-7.3 1.6-9.6-4.1-10.6 3.3.6 6.9-.5 7.9-3.8.3-.8.7-5.9.7-6.6 0-.6-.1-1.7-.7-2-.6-.3-1.6-.6-4.3 1.2-2.8 1.9-5.8 5.8-6.9 7.9Z" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-[#111113]">
      <div className="mx-auto grid max-w-wall gap-12 px-5 py-14 md:grid-cols-[1.35fr_0.65fr_0.75fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative block h-8 w-8">
              <ProtectedImage src="/shobble-icon.svg" alt="" />
            </span>
            <span className="brand-word text-sm text-bone">SHOBBLE</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-bone-dim">
            The social platform for human creativity.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-bold text-bone">
            Platform
          </h4>
          <ul className="space-y-3 text-sm text-bone-dim">
            <li><a href="/#why-us" className="hover:text-red-shobbl">Why Us?</a></li>
            <li><a href="/#features" className="hover:text-red-shobbl">Features</a></li>
            <li><a href="/#gallery" className="hover:text-red-shobbl">Gallery</a></li>
            <li><a href="/#access" className="hover:text-red-shobbl">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-bold text-bone">
            Resources
          </h4>
          <ul className="space-y-3 text-sm text-bone-dim">
            <li><a href="/privacy" className="hover:text-red-shobbl">Privacy</a></li>
            <li><a href="/terms" className="hover:text-red-shobbl">Terms</a></li>
            <li><a href="/policies" className="hover:text-red-shobbl">All policies</a></li>
            <li><a href="/submit-a-bug" className="hover:text-red-shobbl">Submit a bug</a></li>
            <li><a href="/shobble_enterprise_press_kit.html" className="hover:text-red-shobbl">Press Kit</a></li>
            <li>
              <a href="https://discord.gg/9eRQhybKaW" className="hover:text-red-shobbl">
                Discord
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-wall flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line px-5 py-6 text-xs text-bone-dim">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
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
          <span>© {year} Shobbl Incorporated</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <a href="/privacy" className="hover:text-red-shobbl">
          Privacy
        </a>
        <a href="/terms" className="hover:text-red-shobbl">
          Terms
        </a>
        <a href="/policies" className="hover:text-red-shobbl">
          All policies
        </a>
        <a href="/submit-a-bug" className="hover:text-red-shobbl">
          Submit a bug
        </a>
        </div>
      </div>
    </footer>
  );
}
