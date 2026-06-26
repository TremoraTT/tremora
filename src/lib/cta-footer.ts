export interface CtaButton {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface ClosingCtaContent {
  headlineBeforeAccent: string;
  headlineAccent: string;
  subhead: string;
  buttons: CtaButton[];
  finePrintItems: string[];
}

export interface FooterContent {
  wordmark: string;
  domain: string;
  domainHref: string;
  copyright: string;
}

export const DEFAULT_CLOSING_CTA: ClosingCtaContent = {
  headlineBeforeAccent: "Built for the patients ",
  headlineAccent: "between appointments.",
  subhead:
    "Tremora is in active clinical development, working with neurologists toward validation for patient care.",
  buttons: [
    {
      label: "Request access",
      href: "mailto:hello@tremora.health",
      variant: "primary",
    },
    {
      label: "Explore the dashboard",
      href: "#dashboard",
      variant: "secondary",
    },
  ],
  finePrintItems: [
    "Investigational research device",
    "Not FDA cleared",
    "IRB protocol in preparation",
  ],
};

export const DEFAULT_FOOTER_CONTENT: FooterContent = {
  wordmark: "Tremora",
  domain: "tremora.health",
  domainHref: "https://tremora.health",
  copyright: "© Tremora 2026",
};
