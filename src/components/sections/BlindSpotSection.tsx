import { AnimatedComparisonBar } from "@/components/AnimatedComparisonBar";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/FadeIn";
import { cn } from "@/lib/utils";
import { SECTION_INSET_CLASS } from "@/lib/constants";

type AccentColor = "green-600" | "green-700" | "red-500";

export interface ComparisonBarData {
  label: string;
  value: string;
  fillPercent: number;
  variant: "muted" | "emphasis";
}

export interface StatRowData {
  value: string;
  description: string;
  accentColor: AccentColor;
  counterEnd: number;
  counterPrefix?: string;
  counterSuffix?: string;
  counterUseGrouping?: boolean;
}

export interface BlindSpotSectionProps {
  eyebrow?: string;
  displayNumber?: string;
  displayUnit?: string;
  headline?: string;
  body?: string;
  comparisonBars?: ComparisonBarData[];
  stats?: StatRowData[];
}

const DEFAULT_COMPARISON_BARS: ComparisonBarData[] = [
  {
    label: "Clinic visit",
    value: "10 min/quarter",
    fillPercent: 4,
    variant: "muted",
  },
  {
    label: "Tremora",
    value: "1,440 min/day",
    fillPercent: 100,
    variant: "emphasis",
  },
];

const DEFAULT_STATS: StatRowData[] = [
  {
    value: "1M",
    description: "Americans with Parkinson's disease",
    accentColor: "green-600",
    counterEnd: 1,
    counterSuffix: "M",
  },
  {
    value: "10M",
    description: "Americans with essential tremor",
    accentColor: "green-700",
    counterEnd: 10,
    counterSuffix: "M",
  },
  {
    value: "$1,600+",
    description: "annual cost of the nearest competitor",
    accentColor: "red-500",
    counterEnd: 1600,
    counterPrefix: "$",
    counterSuffix: "+",
    counterUseGrouping: true,
  },
];

const ACCENT_BAR_CLASSES: Record<AccentColor, string> = {
  "green-600": "bg-green-600",
  "green-700": "bg-green-700",
  "red-500": "bg-red-500",
};

interface StatRowProps {
  stat: StatRowData;
  delay: number;
}

function StatRow({ stat, delay }: StatRowProps): React.ReactElement {
  return (
    <FadeIn delay={delay}>
      <div className="flex min-h-[120px] items-center gap-5 py-2 md:gap-6">
        <div
          className={cn(
            "w-[3px] shrink-0 self-stretch",
            ACCENT_BAR_CLASSES[stat.accentColor],
          )}
          aria-hidden="true"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="relative">
            <span className="sr-only">{stat.value}</span>
            <AnimatedCounter
              end={stat.counterEnd}
              prefix={stat.counterPrefix}
              suffix={stat.counterSuffix}
              useGrouping={stat.counterUseGrouping ?? false}
              className="font-heading text-[2.75rem] font-medium leading-none text-ink md:text-[3.25rem]"
              aria-hidden={true}
            />
          </div>
          <p className="max-w-[14rem] text-[0.9375rem] leading-snug text-slate-500 sm:text-right">
            {stat.description}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

export function BlindSpotSection({
  eyebrow = "The problem",
  displayNumber = "1",
  displayUnit = "hour",
  headline = "of tremor data collected per year for the average patient.",
  body = "Neurologists make medication decisions from a single ten-minute office visit — a snapshot — while tremor severity fluctuates dramatically across the day. The exam rarely captures the patient at their worst, or their best.",
  comparisonBars = DEFAULT_COMPARISON_BARS,
  stats = DEFAULT_STATS,
}: BlindSpotSectionProps): React.ReactElement {
  const comparisonAriaLabel = comparisonBars
    .map((bar) => `${bar.label}: ${bar.value}`)
    .join("; ");

  return (
    <section id="problem" className="section-spacing-bottom bg-bg">
      <Container as="div" className={SECTION_INSET_CLASS}>
        <div className="grid items-start gap-14 lg:grid-cols-[55fr_45fr] lg:gap-16 xl:gap-20">
          <div className="space-y-8 lg:max-w-none">
            <FadeIn>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-green-600" aria-hidden="true" />
                <p className="text-xs text-green-600">
                  {eyebrow}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="space-y-5">
                <div className="flex items-end gap-3 leading-none">
                  <span
                    className="font-heading text-[6.5rem] font-medium leading-[0.9] text-transparent sm:text-[7.5rem]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to bottom, #3DA035, #2F8129)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                    }}
                    aria-hidden="true"
                  >
                    {displayNumber}
                  </span>
                  <span className="pb-2 font-heading text-[1.75rem] font-medium text-slate-500">
                    {displayUnit}
                  </span>
                </div>

                {/* TODO: verify this figure — 10 min/quarter × 4 ≈ 40 min/yr; confirm wording. */}
                <h2 className="max-w-lg font-heading text-[1.75rem] font-medium leading-[1.25] tracking-tight text-ink sm:text-[2.125rem]">
                  {headline}
                </h2>

                <p className="max-w-[480px] text-base leading-[1.7] text-slate-500">
                  {body}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div
                className="space-y-5 pt-2"
                role="group"
                aria-label={comparisonAriaLabel}
              >
                {comparisonBars.map((bar, index) => (
                  <AnimatedComparisonBar
                    key={bar.label}
                    bar={bar}
                    delay={index * 180}
                  />
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="border-y border-border lg:pt-2">
            {/* TODO: comparative claim — confirm $1,600+ competitor cost is substantiated before publishing. */}
            <div className="divide-y divide-border">
              {stats.map((stat, index) => (
                <StatRow
                  key={stat.value + stat.description}
                  stat={stat}
                  delay={120 + index * 120}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
