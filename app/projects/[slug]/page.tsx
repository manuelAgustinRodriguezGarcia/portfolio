import Link from "next/link";
import { projects } from "@/app/data/projects";
import styles from "./page.module.scss";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <main className={styles.main}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>404</p>
          <h1>Project not found</h1>
          <Link href="/#projects">Back to projects</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{project.year}</p>
        <h1>{project.title}</h1>
        <p>{project.shortDescription}</p>
        <Link href="/#projects">Back to projects</Link>
      </div>
    </main>
  );
}
