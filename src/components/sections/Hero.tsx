import { Fragment } from "react";

import { Container } from "@/components/layout/Container";
import { TremoraWordmark } from "@/components/layout/TremoraWordmark";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/Button";
import { DEFAULT_HERO_CONTENT, type HeroContent } from "@/lib/hero-section";

export interface HeroProps {
  content?: HeroContent;
}

function ScrollMeterIcon(): React.ReactElement {
  return (
    <div
      className="relative h-10 w-[18px] rounded-full border border-border bg-bg"
      aria-hidden="true"
    >
      <span className="absolute left-1/2 top-1.5 h-2.5 w-1 -translate-x-1/2 rounded-full bg-green-600 motion-safe:animate-scroll-meter" />
    </div>
  );
}

interface CapabilityRowProps {
  capabilities: string[];
}

function CapabilityRow({ capabilities }: CapabilityRowProps): React.ReactElement {
  return (
    <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-slate-500">
      {capabilities.map((capability, index) => (
        <Fragment key={capability}>
          {index > 0 ? (
            <span aria-hidden="true" className="text-slate-500/70">
              ·
            </span>
          ) : null}
          <span>{capability}</span>
        </Fragment>
      ))}
    </p>
  );
}

export function Hero({ content = DEFAULT_HERO_CONTENT }: HeroProps): React.ReactElement {
  const { valueProposition, capabilities, primaryButton, secondaryButton } =
    content;

  return (
    <section className="hero-viewport bg-bg">
      <Container as="div" className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <FadeIn>
            <TremoraWordmark
              as="h1"
              className="text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem]"
            />

            <p className="mx-auto mt-5 max-w-lg text-base leading-[1.65] text-slate-500 sm:mt-6">
              {valueProposition}
            </p>

            <div className="mt-4 sm:mt-5">
              <CapabilityRow capabilities={capabilities} />
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Button href={primaryButton.href} className="w-full sm:w-auto">
                {primaryButton.label}
              </Button>
              <Button
                href={secondaryButton.href}
                variant="secondary"
                className="w-full border-[0.5px] sm:w-auto"
              >
                {secondaryButton.label}
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={160}>
            <a
              href="#software"
              className="group mt-10 inline-flex flex-col items-center gap-3 text-slate-500 transition-colors hover:text-ink"
              aria-label="Scroll for more"
            >
              <span className="text-xs">Scroll for more</span>
              <ScrollMeterIcon />
            </a>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
