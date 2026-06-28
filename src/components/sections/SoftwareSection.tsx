import { MedicationResponseChart } from "@/components/MedicationResponseChart";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { FadeIn } from "@/components/FadeIn";
import {
  DEFAULT_SOFTWARE_SECTION,
  type SoftwareFeatureCard,
  type SoftwareSectionContent,
} from "@/lib/software-section";
import { SECTION_INSET_CLASS } from "@/lib/constants";
import type { DashboardStatCard } from "@/lib/medication-response-curve";
import { cn } from "@/lib/utils";

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
  className?: string;
}

function AiReadout({ text, className }: AiReadoutProps): React.ReactElement {
  return (
    <div
      className={cn(
        "rounded-md border-[0.5px] border-border bg-green-50 p-3 sm:p-4",
        className,
      )}
      aria-label="Sample AI-generated readout"
    >
      <p className="whitespace-pre-line font-mono text-xs leading-relaxed text-slate-500">
        {text}
        <span
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-px bg-green-600 motion-safe:animate-caret-blink"
          aria-hidden="true"
        />
      </p>
    </div>
  );
}

interface StatCardProps {
  card: DashboardStatCard;
}

function StatCard({ card }: StatCardProps): React.ReactElement {
  const accentBarClass =
    card.accentColor === "red-500" ? "bg-red-500" : "bg-green-600";

  return (
    <article className="flex min-w-0 gap-4 rounded-lg border-[0.5px] border-border bg-bg p-5 md:p-6">
      <div
        className={cn("w-[3px] shrink-0 self-stretch rounded-full", accentBarClass)}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="text-xs leading-none text-slate-500">{card.label}</p>
        <p className="mt-2 font-heading text-2xl font-medium leading-none tracking-normal text-ink">
          {card.value}
        </p>
      </div>
    </article>
  );
}

interface SoftwareFeatureCardProps {
  card: SoftwareFeatureCard;
}

function SoftwareFeatureCard({
  card,
}: SoftwareFeatureCardProps): React.ReactElement {
  const isHero = card.emphasis === "hero";
  const isProminent = card.emphasis === "prominent";

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-lg border-[0.5px] border-border bg-bg",
        isHero && "border-green-600/20 lg:p-10",
        isProminent && "border-green-600/25 bg-green-50/40",
        !isHero && !isProminent && "p-6 lg:p-8",
        isHero && "p-8",
        isProminent && "p-6 lg:p-8",
      )}
    >
      <h3
        className={cn(
          "font-heading font-medium leading-snug tracking-normal text-ink",
          isHero && "text-2xl md:text-[1.75rem]",
          isProminent && "text-xl md:text-2xl",
          !isHero && !isProminent && "text-xl",
        )}
      >
        {card.title}
      </h3>
      <p
        className={cn(
          "mt-3 leading-[1.7] text-slate-500",
          isHero ? "max-w-3xl text-base md:text-[1.0625rem]" : "text-[0.9375rem]",
        )}
      >
        {card.body}
      </p>
      <div className="mt-auto pt-4">
        {card.readoutText !== undefined ? (
          <AiReadout
            text={card.readoutText}
            className={isProminent ? "bg-bg" : undefined}
          />
        ) : (
          <PillTag label={card.pillLabel} />
        )}
      </div>
    </article>
  );
}

function renderSoftwareHeadline(headline: string): React.ReactNode {
  const accentIndex = headline.indexOf("intelligence layer");

  if (accentIndex === -1) {
    return headline;
  }

  return (
    <>
      {headline.slice(0, accentIndex)}
      <span className="text-green-600">intelligence layer</span>
      {headline.slice(accentIndex + "intelligence layer".length)}
    </>
  );
}

export function SoftwareSection({
  content = DEFAULT_SOFTWARE_SECTION,
}: SoftwareSectionProps): React.ReactElement {
  const {
    eyebrow,
    headline,
    betweenVisitsLead,
    curveHeadlineBeforeAccent,
    curveHeadlineAccent,
    curveHeadlineAfterAccent,
    curveSubline,
    featuresIntro,
    featureCards,
    patientManagement,
    beforeAfter,
    statCards,
    chartConfig,
  } = content;

  const heroCard = featureCards.find((card) => card.emphasis === "hero");
  const prominentCard = featureCards.find((card) => card.emphasis === "prominent");
  const standardCards = featureCards.filter((card) => card.emphasis === "standard");

  return (
    <section
      id="software"
      className="section-spacing bg-bg pb-24 md:pb-32 lg:pb-40"
    >
      <Container as="div" className={SECTION_INSET_CLASS}>
        <SectionHeader
          title={eyebrow}
          subhead={renderSoftwareHeadline(headline)}
        />

        <FadeIn delay={140}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-[1.7] text-slate-500 md:mt-10">
            {betweenVisitsLead}
          </p>
        </FadeIn>

        <div className="mt-16 md:mt-20 lg:mt-24">
          <FadeIn delay={160}>
            <h3 className="mx-auto max-w-4xl text-center font-heading text-[1.75rem] font-medium leading-[1.25] tracking-normal text-ink sm:text-[2.125rem]">
              {curveHeadlineBeforeAccent}
              <span className="text-green-600">{curveHeadlineAccent}</span>
              {curveHeadlineAfterAccent}
            </h3>
          </FadeIn>

          <FadeIn delay={180}>
            <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-[1.7] text-slate-500">
              {curveSubline}
            </p>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-12 grid gap-4 sm:grid-cols-3 md:mt-14">
              {statCards.map((card) => (
                <StatCard key={card.id} card={card} />
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={220}>
            <div className="mt-6 rounded-lg border-[0.5px] border-border bg-bg p-4 sm:p-5 md:mt-8 md:p-6 lg:p-8">
              <MedicationResponseChart config={chartConfig} />
            </div>
          </FadeIn>
        </div>

        <div className="mt-20 md:mt-24 lg:mt-28">
          <FadeIn delay={240}>
            <p className="mx-auto max-w-2xl text-center text-base leading-[1.7] text-slate-500">
              {featuresIntro}
            </p>
          </FadeIn>

          <div className="mt-10 space-y-6 md:mt-12 lg:mt-14">
            {heroCard !== undefined ? (
              <FadeIn delay={260} className="h-full">
                <SoftwareFeatureCard card={heroCard} />
              </FadeIn>
            ) : null}

            <div className="grid items-stretch gap-6 md:grid-cols-2">
              {standardCards.map((card, index) => (
                <FadeIn
                  key={card.id}
                  delay={280 + index * 80}
                  className="h-full"
                >
                  <SoftwareFeatureCard card={card} />
                </FadeIn>
              ))}
            </div>

            {prominentCard !== undefined ? (
              <FadeIn delay={440} className="h-full">
                <SoftwareFeatureCard card={prominentCard} />
              </FadeIn>
            ) : null}
          </div>
        </div>

        <FadeIn delay={480}>
          <div className="mt-20 rounded-lg border-[0.5px] border-border bg-bg p-8 md:mt-24 md:p-10 lg:mt-28 lg:p-12">
            <p className="font-heading text-lg font-medium leading-snug text-green-600 md:text-xl">
              {patientManagement.timeSavedLead}
            </p>
            <h3 className="mt-4 max-w-3xl font-heading text-[1.75rem] font-medium leading-[1.25] tracking-normal text-ink sm:text-[2.125rem]">
              {patientManagement.headline}
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-[1.7] text-slate-500">
              {patientManagement.body}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={520}>
          <div className="mt-12 grid gap-8 border-t border-border pt-10 md:mt-14 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border md:pt-12 lg:mt-16">
            <div className="min-w-0 md:pr-8">
              <p className="text-sm text-slate-500">{beforeAfter.beforeLabel}</p>
              <p className="mt-2 text-[0.9375rem] leading-[1.7] text-slate-500">
                {beforeAfter.beforeBody}
              </p>
            </div>
            <div className="min-w-0 md:pl-8">
              <div className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-600"
                  aria-hidden="true"
                />
                <p className="text-sm text-slate-500">{beforeAfter.afterLabel}</p>
              </div>
              <p className="mt-2 text-[0.9375rem] leading-[1.7] text-slate-500">
                {beforeAfter.afterBody}
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
