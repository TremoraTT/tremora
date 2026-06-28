export interface HeroContent {
  valueProposition: string;
  capabilities: string[];
  primaryButton: {
    label: string;
    href: string;
  };
  secondaryButton: {
    label: string;
    href: string;
  };
}

export const DEFAULT_HERO_CONTENT: HeroContent = {
  valueProposition:
    "Continuous, objective tremor data for movement disorder care.",
  capabilities: ["Continuous", "Tremor-tuned", "PD + ET", "Rechargeable"],
  primaryButton: {
    label: "See how it works",
    href: "#software",
  },
  secondaryButton: {
    label: "View live dashboard",
    href: "#software",
  },
};
