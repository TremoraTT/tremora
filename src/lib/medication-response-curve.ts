export interface CurvePoint {
  t: number;
  y: number;
}

export interface ChartAxisConfig {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  xAxisLabel: string;
  yAxisLabel: string;
}

export interface ChartEventMarker {
  timeMinutes: number;
  label: string;
}

export interface MedicationResponseChartConfig {
  axis: ChartAxisConfig;
  curvePoints: CurvePoint[];
  doseMarker: ChartEventMarker;
  animationDurationMs: number;
  xTickInterval: number;
  yTickInterval: number;
}

export interface DashboardStatCard {
  id: string;
  label: string;
  value: string;
  accentColor: "green-600" | "red-500";
}

export interface ComparisonColumn {
  label: string;
  body: string;
  showRedDot?: boolean;
}

export const DEFAULT_CHART_CONFIG: MedicationResponseChartConfig = {
  axis: {
    xMin: 0,
    xMax: 180,
    yMin: 0,
    yMax: 4,
    xAxisLabel: "Time (minutes)",
    yAxisLabel: "UPDRS tremor score",
  },
  curvePoints: [
    { t: 0, y: 3.2 },
    { t: 12, y: 3.17 },
    { t: 24, y: 3.22 },
    { t: 36, y: 3.18 },
    { t: 48, y: 3.2 },
    { t: 58, y: 2.35 },
    { t: 68, y: 1.55 },
    { t: 78, y: 1.05 },
    { t: 90, y: 0.8 },
    { t: 105, y: 1.05 },
    { t: 120, y: 1.45 },
    { t: 140, y: 2.0 },
    { t: 160, y: 2.45 },
    { t: 180, y: 2.8 },
  ],
  doseMarker: {
    timeMinutes: 48,
    label: "Levodopa dose",
  },
  animationDurationMs: 7000,
  xTickInterval: 30,
  yTickInterval: 1,
};

export const DEFAULT_STAT_CARDS: DashboardStatCard[] = [
  {
    id: "peak-relief",
    label: "Peak relief",
    value: "T+62 min",
    accentColor: "green-600",
  },
  {
    id: "effective-window",
    label: "Effective window",
    value: "94 min",
    accentColor: "green-600",
  },
  {
    id: "dose-duration",
    label: "Dose duration",
    value: "14:47",
    accentColor: "green-600",
  },
];

export const DEFAULT_COMPARISON_COLUMNS: ComparisonColumn[] = [
  {
    label: "Standard monitoring",
    body: "One UPDRS score per quarter, based on how the patient happened to present during a ten-minute exam.",
  },
  {
    label: "Tremora monitoring",
    body: "Continuous score data and full medication response curves, objective measurements across every dose.",
    showRedDot: true,
  },
];

export interface ChartLayout {
  width: number;
  height: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

export const CHART_LAYOUT: ChartLayout = {
  width: 800,
  height: 340,
  marginTop: 44,
  marginRight: 28,
  marginBottom: 48,
  marginLeft: 56,
};

export interface PlotPoint {
  x: number;
  y: number;
}

export function scaleTimeToX(
  timeMinutes: number,
  axis: ChartAxisConfig,
  plotWidth: number,
  marginLeft: number,
): number {
  const ratio =
    (timeMinutes - axis.xMin) / (axis.xMax - axis.xMin);
  return marginLeft + ratio * plotWidth;
}

export function scaleScoreToY(
  score: number,
  axis: ChartAxisConfig,
  plotHeight: number,
  marginTop: number,
): number {
  const ratio =
    (score - axis.yMin) / (axis.yMax - axis.yMin);
  return marginTop + plotHeight - ratio * plotHeight;
}

export function buildSmoothPath(points: ReadonlyArray<PlotPoint>): string {
  if (points.length === 0) {
    return "";
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const previousPoint = points[index - 1] ?? points[index];
    const currentPoint = points[index];
    const nextPoint = points[index + 1];
    const followingPoint = points[index + 2] ?? nextPoint;

    const controlPoint1X =
      currentPoint.x + (nextPoint.x - previousPoint.x) / 6;
    const controlPoint1Y =
      currentPoint.y + (nextPoint.y - previousPoint.y) / 6;
    const controlPoint2X =
      nextPoint.x - (followingPoint.x - currentPoint.x) / 6;
    const controlPoint2Y =
      nextPoint.y - (followingPoint.y - currentPoint.y) / 6;

    path += ` C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${nextPoint.x} ${nextPoint.y}`;
  }

  return path;
}

export function curvePointsToPlotPoints(
  curvePoints: ReadonlyArray<CurvePoint>,
  axis: ChartAxisConfig,
  plotWidth: number,
  plotHeight: number,
  marginLeft: number,
  marginTop: number,
): PlotPoint[] {
  return curvePoints.map((point) => ({
    x: scaleTimeToX(point.t, axis, plotWidth, marginLeft),
    y: scaleScoreToY(point.y, axis, plotHeight, marginTop),
  }));
}

export function buildChartAriaLabel(
  config: MedicationResponseChartConfig,
): string {
  const { axis, doseMarker } = config;

  return [
    "Illustrative medication response curve.",
    `UPDRS tremor score from ${axis.xMin} to ${axis.xMax} minutes.`,
    `${doseMarker.label} marked at ${doseMarker.timeMinutes} minutes.`,
    "Score decreases after dosing, reaches lowest severity near 90 minutes, then gradually increases toward wear-off.",
  ].join(" ");
}
