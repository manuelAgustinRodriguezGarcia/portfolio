export const NAV_SECTION_IDS = [
  "hero",
  "profile",
  "projects",
  "skills",
  "frontend-lab",
  "process",
  "experience",
  "services",
  "contact",
] as const;

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

export const PRIMARY_NAV = [
  { href: "#hero", labelKey: "nav.home", sectionId: "hero" },
  { href: "#profile", labelKey: "nav.about", sectionId: "profile" },
  { href: "#projects", labelKey: "nav.projects", sectionId: "projects" },
  { href: "#experience", labelKey: "nav.experience", sectionId: "experience" },
  { href: "#contact", labelKey: "nav.contact", sectionId: "contact" },
] as const;
