import type { Project } from "@/app/types/project";

/**
 * Featured projects data.
 * Add real projects here when available — do not use placeholder/fake entries.
 */
export const projects: Project[] = [];

export const featuredProjects = projects.filter((project) => project.featured);
