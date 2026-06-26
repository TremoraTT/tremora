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
              <h2 className="mx-auto max-w-lg font-heading text-[2.5rem] font-medium leading-[1.15] tracking-normal text-ink">
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

              {/* TODO: reference said "Active IRB protocol · Clinical validation ongoing." Per our status the IRB isn't submitted yet and the study hasn't run. Confirm before changing. */}
              <p className="mx-auto mt-6 text-xs leading-relaxed text-slate-500">
                {finePrintItems.join(" · ")}
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
