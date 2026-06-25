import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { TremoraWordmark } from "@/components/layout/TremoraWordmark";
import { FadeIn } from "@/components/FadeIn";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header(): React.ReactElement {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-sm">
      <FadeIn delay={50}>
        <Container as="div" className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="shrink-0 focus-visible:rounded-lg"
          aria-label="Tremora home"
        >
          <TremoraWordmark className="text-xl sm:text-2xl" />
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body-sm text-slate-500 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Button href="#contact" size="compact">
            Request a demo
          </Button>
        </nav>

        <details className="relative lg:hidden">
          <summary
            className={cn(
              "flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-border",
              "hover:border-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600",
              "[&::-webkit-details-marker]:hidden",
            )}
            aria-label="Open menu"
          >
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1h16M1 7h16M1 13h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </summary>

          <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-bg p-2 shadow-sm">
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-body-sm text-slate-500 transition-colors hover:bg-green-50 hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-border pt-2">
                <Button href="#contact" size="compact" className="w-full">
                  Request a demo
                </Button>
              </div>
            </nav>
          </div>
        </details>
        </Container>
      </FadeIn>
    </header>
  );
}
