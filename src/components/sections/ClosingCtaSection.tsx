import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/Button";
import {
  DEFAULT_CLOSING_CTA,
  type ClosingCtaContent,
} from "@/lib/cta-footer";

export interface ClosingCtaSectionProps {
  content?: ClosingCtaContent;
}

export function ClosingCtaSection({
  content = DEFAULT_CLOSING_CTA,
}: ClosingCtaSectionProps): React.ReactElement {
  const {
    eyebrow,
    headlineBeforeAccent,
    headlineAccent,
    subhead,
    buttons,
    finePrintItems,
  } = content;

  return (
    <section id="contact" className="section-spacing bg-bg">
      <Container as="div">
        <FadeIn>
          <div className="mx-auto max-w-[720px] rounded-lg border-[0.5px] border-border bg-bg px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-6 bg-green-600" aria-hidden="true" />
                <p className="text-[0.8125rem] text-green-600">{eyebrow}</p>
              </div>

              <h2 className="mx-auto mt-5 max-w-lg font-heading text-[2.5rem] font-medium leading-[1.15] tracking-normal text-ink">
                {headlineBeforeAccent}
                <span className="text-green-600">{headlineAccent}</span>
              </h2>

              <p className="mx-auto mt-4 max-w-[520px] text-base leading-[1.65] text-slate-500">
                {subhead}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                {buttons.map((button) => (
                  <Button
                    key={button.label}
                    href={button.href}
                    variant={button.variant}
                    className={
                      button.variant === "secondary"
                        ? "w-full border-[0.5px] sm:w-auto"
                        : "w-full sm:w-auto"
                    }
                  >
                    {button.label}
                  </Button>
                ))}
              </div>

              {/* TODO: reference said "Active IRB protocol · Clinical validation ongoing." — confirm before changing. */}
              <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-slate-500">
                {finePrintItems.join(" · ")}
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
