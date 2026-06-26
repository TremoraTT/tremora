import Link from "next/link";

import { Container } from "@/components/layout/Container";
import {
  DEFAULT_FOOTER_CONTENT,
  type FooterContent,
} from "@/lib/cta-footer";

export interface FooterProps {
  content?: FooterContent;
}

export function Footer({
  content = DEFAULT_FOOTER_CONTENT,
}: FooterProps): React.ReactElement {
  return (
    <footer className="border-t-[0.5px] border-border bg-bg">
      <Container as="div" className="py-8 md:py-10">
        <div className="grid grid-cols-1 items-center gap-6 text-center md:grid-cols-3">
          <div className="md:justify-self-start">
            <Link
              href="/"
              className="inline-flex items-center gap-3 focus-visible:rounded-lg"
              aria-label="Tremora home"
            >
              <span
                className="inline-block h-6 w-6 shrink-0"
                aria-hidden="true"
              />
              <span className="font-heading text-lg font-semibold leading-none tracking-normal text-ink">
                {content.wordmark}
                <span className="text-red-500">.</span>
              </span>
            </Link>
          </div>

          <div className="md:justify-self-center">
            <a
              href={content.domainHref}
              className="text-sm text-slate-500 transition-colors hover:text-ink"
            >
              {content.domain}
            </a>
          </div>

          <p className="text-sm text-slate-500 md:justify-self-end">
            {content.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
