"use client";

import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import SectionShell from "@/app/components/ui/SectionShell/SectionShell";
import { PROFILE_LINE_KEYS } from "@/app/data/sections";
import { fadeUp, staggerContainer, viewportOnce } from "@/app/lib/motion";
import styles from "./Profile.module.scss";

export default function Profile() {
  const { t } = useTranslation();

  return (
    <SectionShell
      id="profile"
      label={t("profile.label")}
      title={t("profile.title")}
      alt
    >
      <div className={styles.layout}>
        <motion.aside
          className={styles.stickyHeadline}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <h3 className={styles.headline}>
            <Trans
              i18nKey="profile.headline"
              components={{
                prim: <span className={styles.headlinePrim} />,
                grad: <span className={styles.headlineGrad} />,
              }}
            />
          </h3>
        </motion.aside>

        <motion.div
          className={styles.blocks}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {PROFILE_LINE_KEYS.map((n, index) => (
            <motion.article
              key={n}
              className={`${styles.block} ${index % 2 === 1 ? styles.blockAlt : ""}`}
              variants={fadeUp}
            >
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className={styles.text}>
                <Trans
                  i18nKey={`profile.line${n}`}
                  components={{
                    accent: <span className={styles.accent} />,
                  }}
                />
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
