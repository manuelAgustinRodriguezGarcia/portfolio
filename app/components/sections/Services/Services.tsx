"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionShell from "@/app/components/ui/SectionShell/SectionShell";
import { SERVICE_KEYS } from "@/app/data/sections";
import { fadeUp, staggerContainer, viewportOnce } from "@/app/lib/motion";
import styles from "./Services.module.scss";

export default function Services() {
  const { t } = useTranslation();

  return (
    <SectionShell
      id="services"
      label={t("services.label")}
      title={t("services.title")}
      description={t("services.description")}
      alt
    >
      <motion.ul
        className={styles.list}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {SERVICE_KEYS.map((key, index) => (
          <motion.li key={key} className={styles.item} variants={fadeUp}>
            <span className={styles.index} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.label}>{t(`services.${key}`)}</span>
          </motion.li>
        ))}
      </motion.ul>
    </SectionShell>
  );
}
