export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Software", href: "#software" },
  { label: "Device", href: "#device" },
  { label: "Compare", href: "#competitive-landscape" },
];

export const CONTACT_EMAIL = "hello@tremora.health";

export const SITE_TAGLINE =
  "Continuous, objective tremor data for movement disorder care.";

export const SECTION_INSET_CLASS = "px-8 md:px-14 lg:px-20 xl:px-24";

export const TSI_FULL_NAME = "Tremora Severity Index (TSI)";

export const TSI_NOT_CLINICALLY_VALIDATED = "not clinically validated";

export const TSI_PRIMARY_LABEL = `${TSI_FULL_NAME}, ${TSI_NOT_CLINICALLY_VALIDATED}`;

export const TSI_SHORT = "TSI";
