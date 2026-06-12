"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionShell from "@/app/components/ui/SectionShell/SectionShell";
import { PROCESS_STEP_KEYS } from "@/app/data/sections";
import { fadeUp, staggerContainer, viewportOnce } from "@/app/lib/motion";
import styles from "./WorkProcess.module.scss";

export default function WorkProcess() {
  const { t } = useTranslation();

  return (
    <SectionShell
      id="process"
      label={t("process.label")}
      title={t("process.title")}
      description={t("process.description")}
      alt
    >
      <motion.ol
        className={styles.track}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {PROCESS_STEP_KEYS.map((key, index) => (
          <motion.li key={key} className={styles.step} variants={fadeUp}>
            <div className={styles.marker} aria-hidden="true">
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              {index < PROCESS_STEP_KEYS.length - 1 ? <span className={styles.line} /> : null}
            </div>
            <div className={styles.content}>
              <h3>{t(`process.${key}.title`)}</h3>
              <p>{t(`process.${key}.description`)}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </SectionShell>
  );
}
