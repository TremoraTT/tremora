export interface CompetitorCapabilities {
  responseCurve: boolean;
  continuous: boolean;
  dualCondition: boolean;
}

export interface CompetitorRow {
  id: string;
  device: string;
  price: string;
  capabilities: CompetitorCapabilities;
  isHighlighted: boolean;
}

export interface CompetitiveLandscapeContent {
  eyebrow: string;
  headline: string;
  caption: string;
  columns: {
    device: string;
    price: string;
    responseCurve: string;
    continuous: string;
    dualCondition: string;
  };
  rows: CompetitorRow[];
}

export const DEFAULT_COMPETITIVE_LANDSCAPE: CompetitiveLandscapeContent = {
  eyebrow: "Competitive Landscape",
  headline: "The only device that shows you the curve.",
  caption:
    "Medication response curves are not available at any price point in current consumer wearables.",
  columns: {
    device: "Device",
    price: "Price",
    responseCurve: "Response curve",
    continuous: "Continuous",
    dualCondition: "Dual condition",
  },
  rows: [
    {
      id: "tremora",
      device: "Tremora",
      price: "$99",
      capabilities: {
        responseCurve: true,
        continuous: true,
        dualCondition: true,
      },
      isHighlighted: true,
    },
    {
      id: "pkg-watch",
      device: "PKG Watch",
      price: "$1,600+/yr",
      capabilities: {
        responseCurve: false,
        continuous: true,
        dualCondition: false,
      },
      isHighlighted: false,
    },
    {
      id: "stat-on",
      device: "STAT-ON",
      price: "$1,600+/yr",
      capabilities: {
        responseCurve: false,
        continuous: true,
        dualCondition: false,
      },
      isHighlighted: false,
    },
    {
      id: "kinesia-360",
      device: "Kinesia 360",
      price: "$1,000+/yr",
      capabilities: {
        responseCurve: false,
        continuous: false,
        dualCondition: false,
      },
      isHighlighted: false,
    },
    {
      id: "apple-watch",
      device: "Apple Watch",
      price: "Subscription required",
      capabilities: {
        responseCurve: false,
        continuous: false,
        dualCondition: false,
      },
      isHighlighted: false,
    },
  ],
};
