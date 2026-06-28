export interface CompetitorCapabilities {
  continuousMonitoring: boolean;
  medicationResponseCurve: boolean;
  dualCondition: boolean;
}

export interface CompetitorRow {
  id: string;
  device: string;
  capabilities: CompetitorCapabilities;
  isHighlighted: boolean;
}

export interface CompetitiveLandscapeContent {
  eyebrow: string;
  headline: string;
  caption: string;
  columns: {
    device: string;
    continuousMonitoring: string;
    medicationResponseCurve: string;
    dualCondition: string;
  };
  rows: CompetitorRow[];
}

export const DEFAULT_COMPETITIVE_LANDSCAPE: CompetitiveLandscapeContent = {
  eyebrow: "Competitive Landscape",
  headline: "The only device that shows you the curve.",
  caption:
    "Continuous monitoring and medication-response curves are not available on any other consumer wearable.",
  columns: {
    device: "Device",
    continuousMonitoring: "Continuous monitoring",
    medicationResponseCurve: "Medication-response curve",
    dualCondition: "Dual condition",
  },
  rows: [
    {
      id: "tremora",
      device: "Tremora",
      capabilities: {
        continuousMonitoring: true,
        medicationResponseCurve: true,
        dualCondition: true,
      },
      isHighlighted: true,
    },
    {
      id: "pkg-watch",
      device: "PKG Watch",
      capabilities: {
        continuousMonitoring: true,
        medicationResponseCurve: false,
        dualCondition: false,
      },
      isHighlighted: false,
    },
    {
      id: "stat-on",
      device: "STAT-ON",
      capabilities: {
        continuousMonitoring: true,
        medicationResponseCurve: false,
        dualCondition: false,
      },
      isHighlighted: false,
    },
    {
      id: "kinesia-360",
      device: "Kinesia 360",
      capabilities: {
        continuousMonitoring: false,
        medicationResponseCurve: false,
        dualCondition: false,
      },
      isHighlighted: false,
    },
  ],
};
