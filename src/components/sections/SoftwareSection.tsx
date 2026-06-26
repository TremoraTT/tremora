import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { FadeIn } from "@/components/FadeIn";
import {
  DEFAULT_SOFTWARE_SECTION,
  type SoftwareCard,
  type SoftwareSectionContent,
} from "@/lib/software-section";
import { SECTION_INSET_CLASS } from "@/lib/constants";

export interface SoftwareSectionProps {
  content?: SoftwareSectionContent;
}

interface PillTagProps {
  label: string;
}

function PillTag({ label }: PillTagProps): React.ReactElement {
  return (
    <span className="inline-flex rounded-full bg-green-600/15 px-2.5 py-1 text-xs text-green-600">
      {label}
    </span>
  );
}

interface AiReadoutProps {
  text: string;
}

function AiReadout({ text }: AiReadoutProps): React.ReactElement {
  return (
    <div
      className="rounded-md border-[0.5px] border-border bg-green-50 p-3 sm:p-4"
      aria-label="Sample AI-generated clinical readout"
    >
      <p className="font-mono text-xs leading-relaxed text-slate-500">
        {text}
        <span
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-px bg-green-600 motion-safe:animate-caret-blink"
          aria-hidden="true"
        />
      </p>
    </div>
  );
}

interface SoftwareFeatureCardProps {
  card: SoftwareCard;
}

function SoftwareFeatureCard({
  card,
}: SoftwareFeatureCardProps): React.ReactElement {
  return (
    <article className="flex h-full flex-col rounded-lg border-[0.5px] border-border bg-bg p-6 lg:p-8">
      <h3 className="font-heading text-xl font-medium leading-snug tracking-normal text-ink">
        {card.title}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-[1.7] text-slate-500">
        {card.body}
      </p>
      <div className="mt-auto pt-4">
        {card.variant === "standard" ? (
          <PillTag label={card.pillLabel} />
        ) : (
          <AiReadout text={card.readoutText} />
        )}
      </div>
    </article>
  );
}

function renderSoftwareHeadline(headline: string): React.ReactNode {
  const accentIndex = headline.indexOf("AI features");

  if (accentIndex === -1) {
    return headline;
  }

  return (
    <>
      {headline.slice(0, accentIndex)}
      <span className="text-green-600">AI features</span>
      {headline.slice(accentIndex + "AI features".length)}
    </>
  );
}

export function SoftwareSection({
  content = DEFAULT_SOFTWARE_SECTION,
}: SoftwareSectionProps): React.ReactElement {
  const { eyebrow, headline, cards } = content;

  return (
    <section id="software" className="section-spacing bg-bg">
      <Container as="div" className={SECTION_INSET_CLASS}>
        <SectionHeader title={eyebrow} subhead={renderSoftwareHeadline(headline)} />

        <div className="mt-12 grid items-stretch gap-6 md:mt-16 md:grid-cols-3 lg:mt-20">
          {cards.map((card, index) => (
            <FadeIn key={card.id} delay={100 + index * 100} className="h-full">
              <SoftwareFeatureCard card={card} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
