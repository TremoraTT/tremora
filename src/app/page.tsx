import { BlindSpotSection } from "@/components/sections/BlindSpotSection";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { Hero } from "@/components/sections/Hero";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { MedicationResponseCurveSection } from "@/components/sections/MedicationResponseCurveSection";

export default function HomePage(): React.ReactElement {
  return (
    <main className="flex-1">
      <Hero />
      <BlindSpotSection />
      <HowItWorksSection />
      <MedicationResponseCurveSection />
      <ClosingCtaSection />
    </main>
  );
}
