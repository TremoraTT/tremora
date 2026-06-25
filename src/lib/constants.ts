export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Problem", href: "#problem" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Device", href: "#device" },
];

export const CONTACT_EMAIL = "hello@tremora.health";

export const SITE_TAGLINE =
  "Continuous, objective tremor data for movement disorder care.";

export const SECTION_INSET_CLASS = "px-8 md:px-14 lg:px-20 xl:px-24";
