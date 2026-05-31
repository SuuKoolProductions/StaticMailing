import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { RevealRoot } from "@/components/RevealRoot";
import { Manifesto } from "@/components/sections/Manifesto";
import { Creators } from "@/components/sections/Creators";
import { WhyCreators } from "@/components/sections/WhyCreators";
import { WhatItReplaces } from "@/components/sections/WhatItReplaces";
import { OwnershipSystem } from "@/components/sections/OwnershipSystem";
import { Memberships } from "@/components/sections/Memberships";
import { ProtectionLayer } from "@/components/sections/ProtectionLayer";
import { PlatformWall } from "@/components/sections/PlatformWall";
import { AccessRequest } from "@/components/sections/AccessRequest";
import { RoughDivider } from "@/components/artifacts/Motifs";

export default function Home() {
  return (
    <div id="top" className="relative">
      <SiteNav />
      <RevealRoot>
        <main className="relative">
          {/* Q1 — What is Shobbl? */}
          <Manifesto />
          <RoughDivider />
          {/* Who's already here — the place is alive */}
          <Creators />
          <RoughDivider />
          {/* Q2 — Why do creators need it? */}
          <WhyCreators />
          <RoughDivider />
          {/* Q3 — What does it replace? */}
          <WhatItReplaces />
          <RoughDivider />
          {/* Q4 — How does creator ownership work? */}
          <OwnershipSystem />
          <RoughDivider />
          {/* Q5 — How do memberships work? */}
          <Memberships />
          <RoughDivider />
          {/* Q6 — How is content protected? */}
          <ProtectionLayer />
          <RoughDivider />
          {/* Q7 — What does the platform actually look like? */}
          <PlatformWall />
          <RoughDivider />
          {/* Closing — the invite */}
          <AccessRequest />
        </main>
      </RevealRoot>
      <SiteFooter />
    </div>
  );
}
