"use client";

import { Trans, useTranslation } from "react-i18next";
import SectionLabel from "@/app/components/ui/SectionLabel/SectionLabel";
import SectionShell from "@/app/components/ui/SectionShell/SectionShell";
import { PROFILE_LINE_KEYS } from "@/app/data/sections";
import ProfileBlock from "./ProfileBlock";
import ProfileHeadline from "./ProfileHeadline";
import styles from "./Profile.module.scss";

export default function Profile() {
  const { t } = useTranslation();

  return (
    <SectionShell id="profile" label={t("profile.label")} title="" alt hideHeader fillViewport>
      <div className={styles.layout}>
        <aside className={styles.stickyColumn}>
          <div className={styles.stickyContent}>
            <header className={styles.sectionHeader}>
              <SectionLabel className={styles.sectionLabel}>{t("profile.label")}</SectionLabel>
            </header>

            <ProfileHeadline />
          </div>
        </aside>

        <div className={styles.blocks}>
          {PROFILE_LINE_KEYS.map((n, index) => (
            <ProfileBlock
              key={n}
              index={index}
              className={`${styles.block} ${index % 2 === 1 ? styles.blockAlt : ""}`}
              indexLabel={String(index + 1).padStart(2, "0")}
              text={
                <Trans
                  i18nKey={`profile.line${n}`}
                  components={{
                    accent: <span className={styles.accent} />,
                  }}
                />
              }
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
