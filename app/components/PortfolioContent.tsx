"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import styles from "./PortfolioContent.module.scss";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function PortfolioContent() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
        <a href="#" className={styles.logo}>MR</a>
        <div className={styles.links}>
          <a href="#profile">{t("nav.about")}</a>
          <a href="#experience">{t("nav.experience")}</a>
          <a href="#education">{t("nav.education")}</a>
          <a href="#skills">{t("nav.skills")}</a>
          <a href="#contact">{t("nav.contact")}</a>
        </div>
      </nav>

      <section id="hero" className={`${styles.section} ${styles.hero}`}>
        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroText}
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.span className={styles.greeting} variants={fadeInUp}>
              {t("hero.greeting")}
            </motion.span>
            <motion.h1 variants={fadeInUp}>{t("hero.name")}</motion.h1>
            <motion.p className={styles.role} variants={fadeInUp}>
              {t("hero.role")}
            </motion.p>
            <motion.a
              href="#profile"
              className={styles.cta}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("hero.cta")}
            </motion.a>
          </motion.div>
          <motion.div
            className={styles.profileImageWrap}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className={styles.profileImage}
              style={{ backgroundImage: "url(/profile.jpg)" }}
              role="img"
              aria-label={t("hero.name")}
            />
          </motion.div>
        </div>
      </section>

      <section id="profile" className={`${styles.section} ${styles.alt}`}>
        <motion.div
          className={styles.sectionInner}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeInUp}>{t("profile.title")}</motion.h2>
          <motion.p className={styles.profileText} variants={fadeInUp}>
            {t("profile.text")}
          </motion.p>
        </motion.div>
      </section>

      <section id="experience" className={styles.section}>
        <motion.div
          className={styles.sectionInner}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeInUp}>{t("experience.title")}</motion.h2>
          <div className={styles.timeline}>
            {(
              t("experience.items", { returnObjects: true }) as {
                role: string;
                company: string;
                period: string;
                points: string[];
              }[]
            ).map((job, i) => (
              <motion.article
                key={i}
                className={styles.job}
                variants={fadeInUp}
              >
                <div className={styles.jobHeader}>
                  <h3>{job.role}{job.company ? ` · ${job.company}` : ""}</h3>
                  <span className={styles.period}>{job.period}</span>
                </div>
                <ul>
                  {job.points.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="education" className={`${styles.section} ${styles.alt}`}>
        <motion.div
          className={styles.sectionInner}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeInUp}>{t("education.title")}</motion.h2>
          <div className={styles.educationGrid}>
            {(
              t("education.items", { returnObjects: true }) as {
                name: string;
                school: string;
                period: string;
              }[]
            ).map((edu, i) => (
              <motion.div key={i} className={styles.eduCard} variants={fadeInUp}>
                <h3>{edu.name}</h3>
                <p className={styles.school}>{edu.school}</p>
                <span className={styles.period}>{edu.period}</span>
              </motion.div>
            ))}
          </div>
          <motion.div className={styles.languages} variants={fadeInUp}>
            <h3>{t("languages.title")}</h3>
            <p>{t("languages.spanish")} · {t("languages.english")}</p>
          </motion.div>
        </motion.div>
      </section>

      <section id="skills" className={styles.section}>
        <motion.div
          className={styles.sectionInner}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeInUp}>{t("skills.title")}</motion.h2>
          <div className={styles.skillsGrid}>
            <motion.div className={styles.skillGroup} variants={fadeInUp}>
              <h4>{t("skills.frontend")}</h4>
              <p>{t("skills.frontendList")}</p>
            </motion.div>
            <motion.div className={styles.skillGroup} variants={fadeInUp}>
              <h4>{t("skills.cms")}</h4>
              <p>{t("skills.cmsList")}</p>
            </motion.div>
            <motion.div className={styles.skillGroup} variants={fadeInUp}>
              <h4>{t("skills.ui")}</h4>
              <p>{t("skills.uiList")}</p>
            </motion.div>
            <motion.div className={styles.skillGroup} variants={fadeInUp}>
              <h4>{t("skills.backend")}</h4>
              <p>{t("skills.backendList")}</p>
            </motion.div>
            <motion.div className={styles.skillGroup} variants={fadeInUp}>
              <h4>{t("skills.versionControl")}</h4>
              <p>{t("skills.versionControlList")}</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="contact" className={`${styles.section} ${styles.alt} ${styles.contactSection}`}>
        <motion.div
          className={styles.sectionInner}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeInUp}>{t("contact.title")}</motion.h2>
          <div className={styles.contactGrid}>
            <motion.a href="tel:+541138899722" variants={fadeInUp}>
              {t("contact.phone")}
            </motion.a>
            <motion.a href="mailto:manuelrodriguezgarcia.wd@gmail.com" variants={fadeInUp}>
              {t("contact.email")}
            </motion.a>
            <motion.span variants={fadeInUp}>{t("contact.location")}</motion.span>
            <motion.a
              href="https://www.linkedin.com/in/manuel-agustin-rodriguez-garcia"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
            >
              {t("contact.linkedin")}
            </motion.a>
            <motion.a
              href="https://github.com/manuelAgustinRodriguezGarcia"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
            >
              {t("contact.github")}
            </motion.a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
