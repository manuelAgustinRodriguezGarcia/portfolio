import {
  Code2,
  GitBranch,
  Layers,
  Palette,
  Server,
  ShoppingBag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SkillCategory {
  id: string;
  titleKey: string;
  listKey: string;
  Icon: LucideIcon;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  { id: "frontend", titleKey: "skillsData.frontend", listKey: "skillsData.frontendList", Icon: Code2 },
  { id: "ui", titleKey: "skillsData.ui", listKey: "skillsData.uiList", Icon: Palette },
  { id: "backend", titleKey: "skillsData.backend", listKey: "skillsData.backendList", Icon: Server },
  { id: "versionControl", titleKey: "skillsData.versionControl", listKey: "skillsData.versionControlList", Icon: GitBranch },
  { id: "cms", titleKey: "skillsData.cms", listKey: "skillsData.cmsList", Icon: ShoppingBag },
];

export const PROFILE_LINE_KEYS = [1, 2, 5, 6] as const;

export const PROCESS_STEP_KEYS = ["understand", "design", "develop", "optimize"] as const;

export const SERVICE_KEYS = [
  "landingPages",
  "corporateSites",
  "ecommerceFrontend",
  "webApps",
  "interfaceRedesign",
  "frontendDevelopment",
] as const;

export const LAB_SLOT_COUNT = 3;

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface EducationItem {
  name: string;
  school: string;
  period: string;
}

export const LAB_ICONS = [Layers, Code2, Palette] as const;
