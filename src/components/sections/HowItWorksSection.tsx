import { Fragment } from "react";

import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { FadeIn } from "@/components/FadeIn";
import { SECTION_INSET_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface HowItWorksStep {
  id: string;
  stepLabel: string;
  title: string;
  body: string;
}

export interface HowItWorksSectionProps {
  eyebrow?: string;
  headline?: string;
  steps?: HowItWorksStep[];
}

const DEFAULT_STEPS: HowItWorksStep[] = [
  {
    id: "wear",
    stepLabel: "Step 01",
    title: "Patient wears Tremora.",
    body: "Continuous motion data captured throughout the day. Medication events logged with a single button press.",
  },
  {
    id: "score",
    stepLabel: "Step 02",
    title: "Device scores in real time.",
    body: "Onboard signal processing identifies tremor frequency and amplitude and generates UPDRS or TETRAS proxy scores, filtering out voluntary movement.",
  },
  {
    id: "insight",
    stepLabel: "Step 03",
    title: "Neurologist gets the full picture.",
    body: "Clinical summary, medication response curves, and trend data, ready for the appointment.",
  },
];

interface StepCardProps {
  step: HowItWorksStep;
  className?: string;
}

function StepCard({ step, className }: StepCardProps): React.ReactElement {
  return (
    <article
      className={cn(
        "relative flex min-w-0 flex-col overflow-hidden rounded-lg border-[0.5px] border-border bg-bg p-6 lg:p-8",
        className,
      )}
    >
      <div className="relative z-10 flex items-start justify-between gap-4">
        <p className="text-[0.8125rem] leading-none text-green-600">
          {step.stepLabel}
        </p>
      </div>

      <h3 className="relative z-10 mt-5 font-heading text-xl font-medium leading-snug tracking-normal text-ink">
        {step.title}
      </h3>
      <p className="relative z-10 mt-3 text-[0.9375rem] leading-[1.7] text-slate-500">
        {step.body}
      </p>
    </article>
  );
}

interface StepConnectorProps {
  className?: string;
}

function StepConnector({ className }: StepConnectorProps): React.ReactElement {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "hidden shrink-0 self-start pt-7 md:block md:w-5 lg:w-8",
        className,
      )}
    >
      <div className="h-px w-full border-t border-dashed border-green-600/50" />
    </div>
  );
}

function renderHowItWorksHeadline(headline: string): React.ReactNode {
  const continuousIndex = headline.indexOf("continuous");

  if (continuousIndex === -1) {
    return headline;
  }

  return (
    <>
      {headline.slice(0, continuousIndex)}
      <span className="text-green-600">continuous</span>
      {headline.slice(continuousIndex + "continuous".length)}
    </>
  );
}

export function HowItWorksSection({
  eyebrow = "How It Works",
  headline = "From wrist to clinical insight: continuous tremor data, captured throughout the day.",
  steps = DEFAULT_STEPS,
}: HowItWorksSectionProps): React.ReactElement {
  return (
    <section id="how-it-works" className="section-spacing bg-bg">
      <Container as="div" className={SECTION_INSET_CLASS}>
        <SectionHeader title={eyebrow} subhead={renderHowItWorksHeadline(headline)} />

        <FadeIn delay={120}>
          <div className="mt-12 flex flex-col gap-6 md:mt-16 md:flex-row md:items-start md:gap-0 lg:mt-20">
            {steps.map((step, index) => (
              <Fragment key={step.id}>
                <StepCard step={step} className="md:flex-1" />
                {index < steps.length - 1 ? <StepConnector /> : null}
              </Fragment>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
