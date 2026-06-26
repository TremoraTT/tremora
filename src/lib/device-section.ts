export type DeviceCardVisual = "waveform" | "scale" | "curve";

export interface DeviceCard {
  id: string;
  title: string;
  body: string;
  pillLabel: string;
  visual: DeviceCardVisual;
}

export interface DeviceStat {
  id: string;
  value: string;
  descriptor: string;
}

export interface DeviceSectionContent {
  eyebrow: string;
  headline: string;
  cards: DeviceCard[];
  stats: DeviceStat[];
}

export const DEFAULT_DEVICE_CARDS: DeviceCard[] = [
  {
    id: "continuous",
    title: "Continuous",
    body: "200 Hz motion sensing captures every tremor throughout the day, not just during a ten-minute office visit.",
    pillLabel: "200 Hz · all day",
    visual: "waveform",
  },
  {
    id: "scored",
    title: "Scored",
    body: "Real-time severity scores on the same 0–4 scale neurologists use clinically, for both Parkinson's and essential tremor.",
    pillLabel: "UPDRS · TETRAS",
    visual: "scale",
  },
  {
    id: "correlated",
    title: "Correlated",
    body: "A medication button logs each dose. The device generates a response curve showing exactly how tremor severity changes after every dose.",
    pillLabel: "Dose → response",
    visual: "curve",
  },
];

export const DEFAULT_DEVICE_STATS: DeviceStat[] = [
  {
    id: "weight",
    value: "61g",
    descriptor: "On-wrist weight",
  },
  {
    id: "battery",
    value: "3.5 day",
    descriptor: "Battery life",
  },
  {
    id: "accuracy",
    value: "86.4%",
    descriptor: "Classification accuracy (cross-validated)",
  },
  {
    id: "price",
    value: "$99",
    descriptor: "Vs $1,600+/yr competitors",
  },
];

export const DEFAULT_DEVICE_SECTION: DeviceSectionContent = {
  eyebrow: "The Device",
  headline: "Worn like a watch. Sees what no clinic visit can.",
  cards: DEFAULT_DEVICE_CARDS,
  stats: DEFAULT_DEVICE_STATS,
};

export const WAVEFORM_BAR_HEIGHTS: number[] = [
  38, 62, 44, 78, 55, 70, 48, 86, 42, 68, 52, 74,
];

export const SCALE_ACTIVE_INDEX = 2;

export const WAVE_PERIOD_WIDTH = 220;
export const WAVE_AMPLITUDE = 18;
export const WAVE_MID_Y = 40;

function buildSineWavePath(
  periodWidth: number,
  amplitude: number,
  midY: number,
  segments: number,
): string {
  let path = "";

  for (let i = 0; i <= segments; i++) {
    const x = (periodWidth / segments) * i;
    const y = midY - amplitude * Math.sin((2 * Math.PI * x) / periodWidth);
    const xLabel = x.toFixed(2);
    const yLabel = y.toFixed(2);
    path += i === 0 ? `M ${xLabel} ${yLabel}` : ` L ${xLabel} ${yLabel}`;
  }

  return path;
}

export const DEVICE_WAVE_PERIOD_PATH = buildSineWavePath(
  WAVE_PERIOD_WIDTH,
  WAVE_AMPLITUDE,
  WAVE_MID_Y,
  40,
);
