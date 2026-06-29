import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { TremoraWordmark } from "@/components/layout/TremoraWordmark";
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
              className="inline-flex shrink-0 focus-visible:rounded-lg"
              aria-label="Tremora home"
            >
              <TremoraWordmark className="text-xl sm:text-2xl" />
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
