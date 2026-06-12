"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionShell from "@/app/components/ui/SectionShell/SectionShell";
import { CONTACT } from "@/app/data/site";
import { fadeUp, staggerContainer, viewportOnce } from "@/app/lib/motion";
import styles from "./Contact.module.scss";

export default function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <SectionShell id="contact" label={t("contact.label")} title={t("contact.title")}>
      <motion.div
        className={styles.intro}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <h3 className={styles.headline}>{t("contact.headline")}</h3>
        <p className={styles.description}>{t("contact.description")}</p>
      </motion.div>

      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <motion.a className={styles.card} href={CONTACT.phoneHref} variants={fadeUp}>
          <Phone size={22} aria-hidden="true" />
          <span className={styles.label}>{t("contact.labelPhone")}</span>
          <span className={styles.value}>{t("contact.phone")}</span>
        </motion.a>

        <motion.a className={styles.card} href={CONTACT.emailHref} variants={fadeUp}>
          <Mail size={22} aria-hidden="true" />
          <span className={styles.label}>{t("contact.labelEmail")}</span>
          <span className={styles.value}>{t("contact.email")}</span>
        </motion.a>

        <motion.div className={styles.card} variants={fadeUp}>
          <MapPin size={22} aria-hidden="true" />
          <span className={styles.label}>{t("contact.labelLocation")}</span>
          <span className={styles.value}>{t("contact.location")}</span>
        </motion.div>

        <motion.a
          className={styles.card}
          href={CONTACT.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeUp}
        >
          <Linkedin size={22} aria-hidden="true" />
          <span className={styles.label}>{t("contact.labelLinkedin")}</span>
          <span className={styles.value}>{CONTACT.linkedinHandle}</span>
        </motion.a>

        <motion.a
          className={styles.card}
          href={CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeUp}
        >
          <Github size={22} aria-hidden="true" />
          <span className={styles.label}>{t("contact.labelGithub")}</span>
          <span className={styles.value}>{CONTACT.githubHandle}</span>
        </motion.a>

        <motion.div className={styles.copyCard} variants={fadeUp}>
          <button type="button" className={styles.copyButton} onClick={copyEmail}>
            <Mail size={22} aria-hidden="true" />
            <span>{copied ? t("contact.copied") : t("contact.copyEmail")}</span>
          </button>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
