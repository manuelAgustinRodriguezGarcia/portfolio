"use client";

import { ArrowUp, Github, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PRIMARY_NAV } from "@/app/data/navigation";
import { CONTACT, PERSON } from "@/app/data/site";
import { scrollToSection, scrollToTop } from "@/app/lib/scroll";
import styles from "./Footer.module.scss";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.name}>{PERSON.name}</p>
          <p className={styles.rights}>
            © {year} {PERSON.name}. {t("footer.rights")}
          </p>
        </div>

        <nav className={styles.nav} aria-label="Footer">
          {PRIMARY_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(item.href);
              }}
            >
              {t(item.labelKey)}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t("contact.labelLinkedin")}>
            <Linkedin size={18} aria-hidden="true" />
          </a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label={t("contact.labelGithub")}>
            <Github size={18} aria-hidden="true" />
          </a>
          <button type="button" className={styles.top} onClick={scrollToTop} aria-label={t("footer.backToTop")}>
            <ArrowUp size={18} aria-hidden="true" />
            <span>{t("footer.backToTop")}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
