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
    <footer className="mt-auto border-t-[0.5px] border-border bg-bg">
      <Container as="div" className="py-8 md:py-10">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:gap-8 md:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-3 focus-visible:rounded-lg"
            aria-label="Tremora home"
          >
            <span className="font-heading text-lg font-semibold leading-none tracking-normal text-ink">
              {content.wordmark}
              <span className="text-red-500">.</span>
            </span>
          </Link>

          <a
            href={content.domainHref}
            className="text-sm text-slate-500 transition-colors hover:text-ink"
          >
            {content.domain}
          </a>

          <p className="text-sm text-slate-500">{content.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
