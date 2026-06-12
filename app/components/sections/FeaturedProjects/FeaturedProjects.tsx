"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import SectionShell from "@/app/components/ui/SectionShell/SectionShell";
import Button from "@/app/components/ui/Button/Button";
import SkillTag from "@/app/components/ui/SkillTag/SkillTag";
import { projects } from "@/app/data/projects";
import { fadeUp, staggerContainer, viewportOnce } from "@/app/lib/motion";
import styles from "./FeaturedProjects.module.scss";

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const featured = projects.filter((project) => project.featured);

  return (
    <SectionShell
      id="projects"
      label={t("projects.label")}
      title={t("projects.title")}
      description={t("projects.description")}
    >
      {featured.length === 0 ? (
        <motion.div
          className={styles.empty}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div className={styles.emptyIcon} aria-hidden="true">
            <FolderOpen size={32} strokeWidth={1.5} />
          </div>
          <h3 className={styles.emptyTitle}>{t("projects.emptyTitle")}</h3>
          <p className={styles.emptyDescription}>{t("projects.emptyDescription")}</p>
          <Button href="#experience" variant="secondary">
            {t("projects.emptyCta")}
          </Button>
        </motion.div>
      ) : (
        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {featured.map((project) => (
            <motion.article key={project.id} className={styles.card} variants={fadeUp}>
              <div className={styles.preview}>
                {project.images[0] ? (
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.previewImage}
                  />
                ) : (
                  <div className={styles.previewPlaceholder} aria-hidden="true" />
                )}
              </div>
              <div className={styles.body}>
                <div className={styles.meta}>
                  {project.year ? <span>{project.year}</span> : null}
                  <span>{t("projects.featured")}</span>
                </div>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.shortDescription}</p>
                <div className={styles.tags}>
                  {project.technologies.map((tech) => (
                    <SkillTag key={tech} label={tech} />
                  ))}
                </div>
                <div className={styles.links}>
                  <Link href={`/projects/${project.slug}`} className={styles.caseLink}>
                    {t("projects.viewCaseStudy")}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                  {project.liveUrl ? (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      {t("projects.liveDemo")}
                    </a>
                  ) : null}
                  {project.repositoryUrl ? (
                    <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                      {t("projects.repository")}
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </SectionShell>
  );
}
