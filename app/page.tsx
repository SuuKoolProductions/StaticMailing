import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { RevealRoot } from "@/components/RevealRoot";
import { Manifesto } from "@/components/sections/Manifesto";
import { Creators } from "@/components/sections/Creators";
import { WhyCreators } from "@/components/sections/WhyCreators";
import { Memberships } from "@/components/sections/Memberships";
import { ProtectionLayer } from "@/components/sections/ProtectionLayer";
import { PlatformWall } from "@/components/sections/PlatformWall";
import { AccessRequest } from "@/components/sections/AccessRequest";
import { RoughDivider } from "@/components/artifacts/Motifs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/");

export default function Home() {
  return (
    <div id="top" className="relative">
      <SiteNav />
      <RevealRoot>
        <main className="relative">
          {/* Q1 - What is Shobble? */}
          <Manifesto />
          <RoughDivider />
          {/* Who's already here - the place is alive */}
          <Creators />
          <RoughDivider />
          {/* Q2 - Why do creators need it? */}
          <WhyCreators />
          <RoughDivider />
          {/* Q3 - How do memberships work? */}
          <Memberships />
          <RoughDivider />
          {/* Q4 - How is content protected? */}
          <ProtectionLayer />
          <RoughDivider />
          {/* Q5 - What does the platform actually look like? */}
          <PlatformWall />
          <RoughDivider />
          {/* Closing - the invite */}
          <AccessRequest />
        </main>
      </RevealRoot>
      <SiteFooter />
    </div>
  );
}
