import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { FadeIn } from "@/components/FadeIn";
import {
  DEFAULT_COMPETITIVE_LANDSCAPE,
  type CompetitorCapabilities,
  type CompetitiveLandscapeContent,
} from "@/lib/competitive-landscape";
import { SECTION_INSET_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface CompetitiveLandscapeSectionProps {
  content?: CompetitiveLandscapeContent;
}

interface CapabilityDotProps {
  supported: boolean;
}

function CapabilityDot({ supported }: CapabilityDotProps): React.ReactElement {
  return (
    <span
      role="img"
      aria-label={supported ? "Supported" : "Not supported"}
      className={cn(
        "inline-block h-2.5 w-2.5 shrink-0 rounded-full",
        supported
          ? "bg-green-600"
          : "border border-slate-500/55 bg-transparent",
      )}
    />
  );
}

interface CapabilityCellProps {
  capabilities: CompetitorCapabilities;
  field: keyof CompetitorCapabilities;
}

function CapabilityCell({
  capabilities,
  field,
}: CapabilityCellProps): React.ReactElement {
  return (
    <td className="px-3 py-4 text-center sm:px-4">
      <div className="flex items-center justify-center">
        <CapabilityDot supported={capabilities[field]} />
      </div>
    </td>
  );
}

function renderCompetitiveHeadline(headline: string): React.ReactNode {
  const accentIndex = headline.indexOf("device");

  if (accentIndex === -1) {
    return headline;
  }

  return (
    <>
      {headline.slice(0, accentIndex)}
      <span className="text-green-600">device</span>
      {headline.slice(accentIndex + "device".length)}
    </>
  );
}

export function CompetitiveLandscapeSection({
  content = DEFAULT_COMPETITIVE_LANDSCAPE,
}: CompetitiveLandscapeSectionProps): React.ReactElement {
  const { eyebrow, headline, caption, columns, rows } = content;

  return (
    <section
      id="competitive-landscape"
      className="section-spacing bg-bg"
    >
      <Container as="div" className={SECTION_INSET_CLASS}>
        <SectionHeader title={eyebrow} subhead={renderCompetitiveHeadline(headline)} />

        <FadeIn delay={120}>
          <div className="mt-10 overflow-hidden rounded-lg border-[0.5px] border-border bg-bg md:mt-12">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th
                      scope="col"
                      className="px-4 py-4 font-normal text-slate-500 sm:px-6"
                    >
                      {columns.device}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-4 font-normal text-slate-500 sm:px-4"
                    >
                      {columns.price}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-4 text-center font-normal text-slate-500 sm:px-4"
                    >
                      {columns.responseCurve}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-4 text-center font-normal text-slate-500 sm:px-4"
                    >
                      {columns.continuous}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-4 text-center font-normal text-slate-500 sm:px-4"
                    >
                      {columns.dualCondition}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.id}
                      className={cn(
                        "border-b border-border last:border-b-0",
                        row.isHighlighted &&
                          "relative bg-green-50 shadow-[inset_3px_0_0_0_#3DA035]",
                      )}
                    >
                      <th
                        scope="row"
                        className={cn(
                          "px-4 py-4 font-normal sm:px-6",
                          row.isHighlighted
                            ? "text-green-600"
                            : "text-ink",
                        )}
                      >
                        {row.device}
                      </th>
                      <td
                        className={cn(
                          "px-3 py-4 sm:px-4",
                          row.isHighlighted
                            ? "font-heading font-medium text-green-600"
                            : "text-ink",
                        )}
                      >
                        {row.price}
                      </td>
                      <CapabilityCell
                        capabilities={row.capabilities}
                        field="responseCurve"
                      />
                      <CapabilityCell
                        capabilities={row.capabilities}
                        field="continuous"
                      />
                      <CapabilityCell
                        capabilities={row.capabilities}
                        field="dualCondition"
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TODO: comparative claim — confirm competitor pricing and capabilities are substantiated before publishing. */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-500">
            {caption}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
