import { Container } from "@/components/layout/Container";
import { TremoraWordmark } from "@/components/layout/TremoraWordmark";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/Button";

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

export function Hero(): React.ReactElement {
  return (
    <section className="hero-viewport bg-bg">
      <Container as="div" className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center">
            <FadeIn>
              <TremoraWordmark
                as="h1"
                className="text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem]"
              />

              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Button href="#how-it-works" className="w-full sm:w-auto">
                  See how it works
                </Button>
                <Button
                  href="#dashboard"
                  variant="secondary"
                  className="w-full border-[0.5px] sm:w-auto"
                >
                  View live dashboard
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={160}>
              <a
                href="#problem"
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
