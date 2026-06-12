"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionShell from "@/app/components/ui/SectionShell/SectionShell";
import SkillTag from "@/app/components/ui/SkillTag/SkillTag";
import { SKILL_CATEGORIES } from "@/app/data/sections";
import { fadeUp, staggerContainer, viewportOnce } from "@/app/lib/motion";
import styles from "./Skills.module.scss";

function parseSkills(list: string) {
  return list.split(",").map((item) => item.trim()).filter(Boolean);
}

export default function Skills() {
  const { t } = useTranslation();

  return (
    <SectionShell
      id="skills"
      label={t("skills.label")}
      title={t("skills.title")}
      description={t("skills.description")}
      alt
    >
      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {SKILL_CATEGORIES.map(({ id, titleKey, listKey, Icon }) => (
          <motion.article key={id} className={styles.group} variants={fadeUp}>
            <header className={styles.header}>
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon size={18} strokeWidth={1.85} />
              </span>
              <h3>{t(titleKey)}</h3>
            </header>
            <div className={styles.tags}>
              {parseSkills(t(listKey)).map((skill) => (
                <SkillTag key={skill} label={skill} />
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}
