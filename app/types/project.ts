export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description?: string;
  technologies: string[];
  images: string[];
  liveUrl?: string;
  repositoryUrl?: string;
  featured: boolean;
  year?: string;
  role?: string;
}
