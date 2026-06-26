import { BlindSpotSection } from "@/components/sections/BlindSpotSection";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { CompetitiveLandscapeSection } from "@/components/sections/CompetitiveLandscapeSection";
import { DeviceSection } from "@/components/sections/DeviceSection";
import { Hero } from "@/components/sections/Hero";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { MedicationResponseCurveSection } from "@/components/sections/MedicationResponseCurveSection";
import { SoftwareSection } from "@/components/sections/SoftwareSection";

export default function HomePage(): React.ReactElement {
  return (
    <main className="flex-1">
      <Hero />
      <BlindSpotSection />
      <HowItWorksSection />
      <DeviceSection />
      <SoftwareSection />
      <MedicationResponseCurveSection />
      <CompetitiveLandscapeSection />
      <ClosingCtaSection />
    </main>
  );
}
