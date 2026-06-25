import { Fragment } from "react";

import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/FadeIn";
import { SECTION_INSET_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type WatermarkVariant = "green" | "blend" | "red";

export interface HowItWorksStep {
  id: string;
  stepLabel: string;
  numeral: string;
  watermarkVariant: WatermarkVariant;
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
    numeral: "1",
    watermarkVariant: "green",
    title: "Patient wears Tremora.",
    body: "Continuous motion data captured throughout the day. Medication events logged with a single button press.",
  },
  {
    id: "score",
    stepLabel: "Step 02",
    numeral: "2",
    watermarkVariant: "blend",
    title: "Device scores in real time.",
    body: "Onboard signal processing identifies tremor frequency and amplitude and generates UPDRS or TETRAS proxy scores, filtering out voluntary movement.",
  },
  {
    id: "insight",
    stepLabel: "Step 03",
    numeral: "3",
    watermarkVariant: "red",
    title: "Neurologist gets the full picture.",
    body: "Clinical summary, medication response curves, and trend data — ready for the appointment.",
  },
];

interface WatermarkStyle {
  className?: string;
  style?: React.CSSProperties;
}

function getWatermarkStyle(variant: WatermarkVariant): WatermarkStyle {
  if (variant === "green") {
    return {
      style: { color: "#3DA035", opacity: 0.12 },
    };
  }

  if (variant === "red") {
    return {
      style: { color: "#E5322A", opacity: 0.12 },
    };
  }

  return {
    className: "opacity-[0.13]",
    style: {
      backgroundImage: "linear-gradient(135deg, #3DA035 0%, #E5322A 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
    },
  };
}

interface StepCardProps {
  step: HowItWorksStep;
  className?: string;
}

function StepCard({ step, className }: StepCardProps): React.ReactElement {
  const watermark = getWatermarkStyle(step.watermarkVariant);

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

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-4 top-3 select-none font-heading text-[4.5rem] font-medium leading-none tracking-normal lg:right-6 lg:top-4 lg:text-[4.75rem]",
          watermark.className,
        )}
        style={watermark.style}
      >
        {step.numeral}
      </span>

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

export function HowItWorksSection({
  eyebrow = "How it works",
  headline = "From wrist to clinical insight.",
  steps = DEFAULT_STEPS,
}: HowItWorksSectionProps): React.ReactElement {
  return (
    <section id="how-it-works" className="section-spacing bg-bg">
      <Container as="div" className={SECTION_INSET_CLASS}>
        <FadeIn>
          <header className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-green-600" aria-hidden="true" />
              <p className="text-[0.8125rem] text-green-600">{eyebrow}</p>
            </div>
            <h2 className="mt-5 max-w-xl font-heading text-[2.75rem] font-medium leading-[1.15] tracking-normal text-ink">
              {headline}
            </h2>
          </header>
        </FadeIn>

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
