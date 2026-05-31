import Image from "next/image";

export function SiteNav() {
  const links = [
    { href: "#top", label: "Home" },
    { href: "#control", label: "About" },
    { href: "#modules", label: "Features" },
    { href: "#gallery", label: "Gallery" },
    { href: "#access", label: "Contact" },
  ];

  return (
    <div className="sticky top-0 z-50 border-b border-line bg-[#0f0f10]/95 shadow-[0_12px_28px_-24px_rgba(0,0,0,0.9)] backdrop-blur">
      <div className="mx-auto flex max-w-wall items-center justify-between gap-6 px-5 py-4">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/shobbl-icon.svg"
            alt=""
            width={34}
            height={34}
            className="h-8 w-8"
          />
          <span className="brand-word text-[1rem] text-bone">SHOBBL</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-sm text-bone-dim transition-colors hover:text-bone"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
