"use client";

import { motion } from "framer-motion";
import { GraduationCap, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionShell from "@/app/components/ui/SectionShell/SectionShell";
import type { EducationItem, ExperienceItem } from "@/app/data/sections";
import { fadeUp, staggerContainer, viewportOnce } from "@/app/lib/motion";
import styles from "./ExperienceSection.module.scss";

export default function ExperienceSection() {
  const { t } = useTranslation();

  const jobs = t("experience.items", { returnObjects: true }) as ExperienceItem[];
  const education = t("education.items", { returnObjects: true }) as EducationItem[];

  return (
    <SectionShell
      id="experience"
      label={t("experience.label")}
      title={t("experience.title")}
    >
      <motion.div
        className={styles.jobs}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {jobs.map((job, index) => (
          <motion.article key={`${job.role}-${index}`} className={styles.job} variants={fadeUp}>
            <div className={styles.jobHeader}>
              <div>
                <h3 className={styles.role}>
                  {job.role}
                  {job.company ? <span className={styles.company}> · {job.company}</span> : null}
                </h3>
              </div>
              <span className={styles.period}>{job.period}</span>
            </div>
            <ul className={styles.points}>
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>

      <div className={styles.secondary}>
        <motion.section
          className={styles.educationBlock}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <h3 className={styles.subheading}>
            <GraduationCap size={20} aria-hidden="true" />
            {t("experience.educationTitle")}
          </h3>
          <div className={styles.eduGrid}>
            {education.map((item) => (
              <article key={item.name} className={styles.eduCard}>
                <h4>{item.name}</h4>
                <p>{item.school}</p>
                <span>{item.period}</span>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className={styles.languagesBlock}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <h3 className={styles.subheading}>
            <Languages size={20} aria-hidden="true" />
            {t("experience.languagesTitle")}
          </h3>
          <p>
            {t("languages.spanish")} · {t("languages.english")}
          </p>
        </motion.section>
      </div>
    </SectionShell>
  );
}
