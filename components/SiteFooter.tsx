export function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-[#111113]">
      <div className="mx-auto grid max-w-wall gap-12 px-5 py-14 md:grid-cols-[1.35fr_0.65fr_0.75fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-display text-xl text-red-shobbl">Shobbl</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-bone-dim">
            The platform built for creators, by creators. Your content, your
            rules, your success.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-bold text-bone">
            Platform
          </h4>
          <ul className="space-y-3 text-sm text-bone-dim">
            <li><a href="#control" className="hover:text-red-shobbl">About</a></li>
            <li><a href="#modules" className="hover:text-red-shobbl">Features</a></li>
            <li><a href="#gallery" className="hover:text-red-shobbl">Gallery</a></li>
            <li><a href="#access" className="hover:text-red-shobbl">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-bold text-bone">
            Resources
          </h4>
          <ul className="space-y-3 text-sm text-bone-dim">
            <li><a href="/shobbl_enterprise_press_kit.html" className="hover:text-red-shobbl">Press Kit</a></li>
            <li>
              <a href="https://discord.gg/9eRQhybKaW" className="hover:text-red-shobbl">
                Discord
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-wall border-t border-line px-5 py-6 text-center text-xs text-bone-dim">
        © 2025 Shobbl LLC. All rights reserved.
      </div>
    </footer>
  );
}
