import { FadeIn } from "@/components/FadeIn";
import { cn } from "@/lib/utils";

export const SECTION_TITLE_CLASS =
  "font-heading text-[1.75rem] font-medium leading-snug tracking-normal text-green-600 sm:text-[2.125rem]";

export const SECTION_SUBHEAD_CLASS =
  "font-heading text-[1.75rem] font-medium leading-[1.25] tracking-normal text-ink sm:text-[2.125rem]";

interface SectionHeaderProps {
  title: string;
  subhead?: React.ReactNode;
  subheadClassName?: string;
  titleDelay?: number;
  subheadDelay?: number;
}

export function SectionHeader({
  title,
  subhead,
  subheadClassName,
  titleDelay = 0,
  subheadDelay = 120,
}: SectionHeaderProps): React.ReactElement {
  return (
    <>
      <FadeIn delay={titleDelay}>
        <div className="border-b border-border pb-8">
          <h2 className={SECTION_TITLE_CLASS}>{title}</h2>
        </div>
      </FadeIn>
      {subhead !== undefined ? (
        <FadeIn delay={subheadDelay}>
          <h3
            className={cn(
              "mt-10 lg:mt-12",
              SECTION_SUBHEAD_CLASS,
              subheadClassName,
            )}
          >
            {subhead}
          </h3>
        </FadeIn>
      ) : null}
    </>
  );
}
