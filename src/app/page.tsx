import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { CompetitiveLandscapeSection } from "@/components/sections/CompetitiveLandscapeSection";
import { DeviceSection } from "@/components/sections/DeviceSection";
import { Hero } from "@/components/sections/Hero";
import { SoftwareSection } from "@/components/sections/SoftwareSection";

export default function HomePage(): React.ReactElement {
  return (
    <main className="flex-1">
      <Hero />
      <SoftwareSection />
      <DeviceSection />
      <CompetitiveLandscapeSection />
      <ClosingCtaSection />
    </main>
  );
}
