import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { FadeIn } from "@/components/FadeIn";
import {
  DEFAULT_DEVICE_SECTION,
  DEVICE_WAVE_PERIOD_PATH,
  SCALE_ACTIVE_INDEX,
  WAVEFORM_BAR_HEIGHTS,
  WAVE_PERIOD_WIDTH,
  type DeviceCard,
  type DeviceSectionContent,
  type DeviceStat,
} from "@/lib/device-section";
import { SECTION_INSET_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface DeviceSectionProps {
  content?: DeviceSectionContent;
}

interface PillTagProps {
  label: string;
}

function PillTag({ label }: PillTagProps): React.ReactElement {
  return (
    <span className="inline-flex rounded-full bg-green-600/15 px-2.5 py-1 text-xs text-green-600">
      {label}
    </span>
  );
}

function ProductModelPlaceholder(): React.ReactElement {
  return (
    <div
      className="mx-auto flex min-h-[240px] w-full max-w-4xl flex-col items-center justify-center gap-3 rounded-lg border-[1.5px] border-slate-500/35 bg-bg sm:min-h-[320px] md:min-h-[400px] lg:min-h-[480px]"
      aria-label="Product model placeholder"
    >
      <p className="text-sm text-slate-500">Product model</p>
    </div>
  );
}

function WaveformVisual(): React.ReactElement {
  return (
    <div
      className="flex h-20 items-end justify-center gap-1.5 px-2"
      aria-hidden="true"
    >
      {WAVEFORM_BAR_HEIGHTS.map((height, index) => (
        <div
          key={index}
          className="w-1.5 origin-bottom rounded-full bg-green-600 motion-safe:animate-device-waveform motion-reduce:animate-none"
          style={{
            height: `${height}%`,
            animationDelay: `${index * 0.09}s`,
          }}
        />
      ))}
    </div>
  );
}

function ScaleVisual(): React.ReactElement {
  return (
    <div className="flex h-20 flex-col items-center justify-center gap-3">
      <div className="flex items-center gap-2.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className="relative h-2.5 w-2.5 rounded-full border border-slate-500/55"
          >
            <span
              className={cn(
                "absolute inset-0 origin-center rounded-full bg-green-600 motion-safe:animate-device-scale-dot",
                index === SCALE_ACTIVE_INDEX
                  ? "motion-reduce:scale-100 motion-reduce:opacity-100"
                  : "motion-reduce:scale-0 motion-reduce:opacity-0",
              )}
              style={{ animationDelay: `${index * 0.4}s` }}
            />
          </span>
        ))}
      </div>
      <p className="text-xs text-slate-500">0–4 scale</p>
    </div>
  );
}

function CurveVisual(): React.ReactElement {
  return (
    <div
      className="mx-auto h-20 w-full max-w-[220px] overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${WAVE_PERIOD_WIDTH} 80`} className="h-full w-full">
        <defs>
          <clipPath id="device-wave-clip">
            <rect width={WAVE_PERIOD_WIDTH} height="80" />
          </clipPath>
        </defs>
        <g clipPath="url(#device-wave-clip)">
          <g className="device-wave-track motion-safe:animate-device-wave-scroll motion-reduce:animate-none">
            <path
              d={DEVICE_WAVE_PERIOD_PATH}
              fill="none"
              stroke="#3DA035"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={DEVICE_WAVE_PERIOD_PATH}
              fill="none"
              stroke="#3DA035"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(${WAVE_PERIOD_WIDTH}, 0)`}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function DeviceCardVisual({
  visual,
}: {
  visual: DeviceCard["visual"];
}): React.ReactElement {
  if (visual === "waveform") {
    return <WaveformVisual />;
  }

  if (visual === "scale") {
    return <ScaleVisual />;
  }

  return <CurveVisual />;
}

interface DeviceFeatureCardProps {
  card: DeviceCard;
}

function DeviceFeatureCard({ card }: DeviceFeatureCardProps): React.ReactElement {
  return (
    <article className="flex h-full flex-col rounded-lg border-[0.5px] border-border bg-bg p-6 lg:p-8">
      <DeviceCardVisual visual={card.visual} />
      <h3 className="mt-5 font-heading text-xl font-medium leading-snug tracking-normal text-ink">
        {card.title}
      </h3>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-[1.7] text-slate-500">
        {card.body}
      </p>
      <div className="mt-4">
        <PillTag label={card.pillLabel} />
      </div>
    </article>
  );
}

interface StatCellProps {
  stat: DeviceStat;
}

function StatCell({ stat }: StatCellProps): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-6 text-center sm:py-8">
      <p className="font-heading text-[2rem] font-medium leading-none tracking-normal text-ink md:text-[2.25rem]">
        {stat.value}
      </p>
      <p className="mt-2 text-xs leading-snug text-slate-500">{stat.descriptor}</p>
    </div>
  );
}

function renderDeviceHeadline(headline: string): React.ReactNode {
  const watchIndex = headline.indexOf("watch");

  if (watchIndex === -1) {
    return headline;
  }

  return (
    <>
      {headline.slice(0, watchIndex)}
      <span className="text-green-600">watch</span>
      {headline.slice(watchIndex + "watch".length)}
    </>
  );
}

export function DeviceSection({
  content = DEFAULT_DEVICE_SECTION,
}: DeviceSectionProps): React.ReactElement {
  const { eyebrow, headline, cards, stats } = content;

  return (
    <section id="device" className="section-spacing bg-bg">
      <Container as="div" className={SECTION_INSET_CLASS}>
        <SectionHeader
          title={eyebrow}
          subhead={renderDeviceHeadline(headline)}
          subheadClassName="w-full whitespace-nowrap text-center text-[clamp(0.9375rem,2.2vw,2.125rem)]"
        />

        <FadeIn delay={80}>
          <div className="mt-10 md:mt-12">
            <ProductModelPlaceholder />
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 lg:mt-20">
          {cards.map((card, index) => (
            <FadeIn key={card.id} delay={120 + index * 100}>
              <DeviceFeatureCard card={card} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={420}>
          <div className="mt-10 overflow-hidden rounded-lg border-[0.5px] border-border bg-bg md:mt-12">
            {/* TODO: confirm competitor pricing for $99 vs $1,600+/yr stat. */}
            <div className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
              {stats.map((stat) => (
                <StatCell key={stat.id} stat={stat} />
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
