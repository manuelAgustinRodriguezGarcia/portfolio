"use client";

import { useTranslation } from "react-i18next";
import styles from "./LanguageToggle.module.scss";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggle = () => {
    const next = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", next);
    }
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={i18n.language === "es" ? "Switch to English" : "Cambiar a español"}
      title={i18n.language === "es" ? "English" : "Español"}
      data-lang={i18n.language}
    >
      <span className={styles.track}>
        <span className={styles.knob}>
          <span className={styles.label}>{i18n.language === "es" ? "ES" : "EN"}</span>
        </span>
      </span>
    </button>
  );
}
