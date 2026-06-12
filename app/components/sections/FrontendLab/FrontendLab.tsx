"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionShell from "@/app/components/ui/SectionShell/SectionShell";
import { LAB_ICONS, LAB_SLOT_COUNT } from "@/app/data/sections";
import { fadeUp, staggerContainer, viewportOnce } from "@/app/lib/motion";
import styles from "./FrontendLab.module.scss";

export default function FrontendLab() {
  const { t } = useTranslation();

  return (
    <SectionShell
      id="frontend-lab"
      label={t("frontendLab.label")}
      title={t("frontendLab.title")}
      description={t("frontendLab.description")}
    >
      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {Array.from({ length: LAB_SLOT_COUNT }, (_, index) => {
          const Icon = LAB_ICONS[index] ?? LAB_ICONS[0];
          const number = index + 1;

          return (
            <motion.article key={number} className={styles.slot} variants={fadeUp}>
              <div className={styles.preview} aria-hidden="true">
                <svg viewBox="0 0 320 200" className={styles.previewSvg}>
                  <rect x="24" y="24" width="120" height="80" rx="16" fill="var(--accent-soft)" />
                  <circle cx="240" cy="72" r="36" fill="var(--accent-2-soft)" />
                  <path
                    d="M48 160H272"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="6 8"
                    opacity="0.5"
                  />
                </svg>
              </div>
              <div className={styles.body}>
                <div className={styles.meta}>
                  <Icon size={16} aria-hidden="true" />
                  <span>{t("frontendLab.comingSoon")}</span>
                </div>
                <h3>{t("frontendLab.slotLabel", { number })}</h3>
                <p>{t("frontendLab.slotDescription")}</p>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}
