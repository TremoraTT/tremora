import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { FadeIn } from "@/components/FadeIn";
import {
  DEFAULT_DEVICE_SECTION,
  type DeviceSectionContent,
} from "@/lib/device-section";
import { SECTION_INSET_CLASS } from "@/lib/constants";

export interface DeviceSectionProps {
  content?: DeviceSectionContent;
}

function renderDeviceHeadline(headline: string): React.ReactNode {
  const accentIndex = headline.indexOf("clinical question");

  if (accentIndex === -1) {
    return headline;
  }

  return (
    <>
      {headline.slice(0, accentIndex)}
      <span className="text-green-600">clinical question</span>
      {headline.slice(accentIndex + "clinical question".length)}
    </>
  );
}

interface DevicePointProps {
  point: string;
  delay: number;
}

function DevicePoint({ point, delay }: DevicePointProps): React.ReactElement {
  return (
    <FadeIn delay={delay}>
      <div className="flex gap-4 md:gap-5">
        <div
          className="mt-1.5 w-[3px] shrink-0 self-stretch rounded-full bg-green-600"
          aria-hidden="true"
        />
        <p className="text-[0.9375rem] leading-[1.7] text-slate-500">{point}</p>
      </div>
    </FadeIn>
  );
}

export function DeviceSection({
  content = DEFAULT_DEVICE_SECTION,
}: DeviceSectionProps): React.ReactElement {
  const { eyebrow, headline, bodyPoints } = content;

  return (
    <section id="device" className="section-spacing bg-bg">
      <Container as="div" className={SECTION_INSET_CLASS}>
        <SectionHeader
          title={eyebrow}
          subhead={renderDeviceHeadline(headline)}
        />

        <div className="mx-auto mt-10 max-w-2xl space-y-5 md:mt-12 md:space-y-6">
          {bodyPoints.map((point, index) => (
            <DevicePoint key={point} point={point} delay={120 + index * 60} />
          ))}
        </div>
      </Container>
    </section>
  );
}
