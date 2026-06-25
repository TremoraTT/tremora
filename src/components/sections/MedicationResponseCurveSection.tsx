import { MedicationResponseChart } from "@/components/MedicationResponseChart";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/FadeIn";
import { SECTION_INSET_CLASS } from "@/lib/constants";
import {
  DEFAULT_CHART_CONFIG,
  DEFAULT_COMPARISON_COLUMNS,
  DEFAULT_STAT_CARDS,
  type ComparisonColumn,
  type DashboardStatCard,
  type MedicationResponseChartConfig,
} from "@/lib/medication-response-curve";
import { cn } from "@/lib/utils";

export interface MedicationResponseCurveSectionProps {
  eyebrow?: string;
  headlineBeforeAccent?: string;
  headlineAccent?: string;
  headlineAfterAccent?: string;
  subhead?: string;
  statCards?: DashboardStatCard[];
  chartConfig?: MedicationResponseChartConfig;
  comparisonColumns?: ComparisonColumn[];
}

const ACCENT_BAR_CLASSES = {
  "green-600": "bg-green-600",
  "red-500": "bg-red-500",
} as const;

interface StatCardProps {
  card: DashboardStatCard;
}

function StatCard({ card }: StatCardProps): React.ReactElement {
  return (
    <article className="flex min-w-0 gap-4 rounded-lg border-[0.5px] border-border bg-bg p-5 md:p-6">
      <div
        className={cn(
          "w-[3px] shrink-0 self-stretch rounded-full",
          ACCENT_BAR_CLASSES[card.accentColor],
        )}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="text-xs leading-none text-slate-500">{card.label}</p>
        <p className="mt-2 font-heading text-2xl font-medium leading-none tracking-normal text-ink">
          {card.value}
        </p>
      </div>
    </article>
  );
}

interface ComparisonBlockProps {
  column: ComparisonColumn;
  className?: string;
}

function ComparisonBlock({
  column,
  className,
}: ComparisonBlockProps): React.ReactElement {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="flex items-center gap-2">
        {column.showRedDot === true ? (
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500"
            aria-hidden="true"
          />
        ) : null}
        <p className="text-sm text-slate-500">{column.label}</p>
      </div>
      <p className="mt-2 text-[0.9375rem] leading-[1.7] text-slate-500">
        {column.body}
      </p>
    </div>
  );
}

export function MedicationResponseCurveSection({
  eyebrow = "The medication response curve",
  headlineBeforeAccent = "See exactly when the dose ",
  headlineAccent = "takes hold",
  headlineAfterAccent = " — and wears off.",
  subhead = "A view a single clinic visit can't provide.",
  statCards = DEFAULT_STAT_CARDS,
  chartConfig = DEFAULT_CHART_CONFIG,
  comparisonColumns = DEFAULT_COMPARISON_COLUMNS,
}: MedicationResponseCurveSectionProps): React.ReactElement {
  return (
    <section id="dashboard" className="section-spacing bg-bg">
      <Container as="div" className={SECTION_INSET_CLASS}>
        <FadeIn>
          <header className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-6 bg-green-600" aria-hidden="true" />
              <p className="text-[0.8125rem] text-green-600">{eyebrow}</p>
            </div>
            <h2 className="mt-5 font-heading text-[2.375rem] font-medium leading-[1.2] tracking-normal text-ink">
              {headlineBeforeAccent}
              <span className="text-green-600">{headlineAccent}</span>
              {headlineAfterAccent}
            </h2>
            {/* TODO: reference copy was "No other affordable device shows you this." — confirm before reverting. */}
            <p className="mx-auto mt-4 max-w-xl text-base leading-[1.65] text-slate-500">
              {subhead}
            </p>
          </header>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mt-12 grid gap-4 sm:grid-cols-3 md:mt-14">
            {statCards.map((card) => (
              <StatCard key={card.id} card={card} />
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={180}>
          <div className="mt-6 rounded-lg border-[0.5px] border-border bg-bg p-4 sm:p-5 md:mt-8 md:p-6">
            <MedicationResponseChart config={chartConfig} />
          </div>
        </FadeIn>

        <FadeIn delay={240}>
          <div className="mt-8 grid gap-8 border-t border-border pt-8 md:mt-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border md:pt-10">
            <ComparisonBlock
              column={comparisonColumns[0]}
              className="md:pr-8"
            />
            <ComparisonBlock
              column={comparisonColumns[1]}
              className="md:pl-8"
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
