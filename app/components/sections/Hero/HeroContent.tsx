"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Button from "@/app/components/ui/Button/Button";
import SocialLink from "@/app/components/ui/SocialLink/SocialLink";
import { CONTACT } from "@/app/data/site";
import {
  fadeUpSubtle,
  heroNameLine,
  heroNameStagger,
  heroStagger,
} from "@/app/lib/motion";
import styles from "./HeroContent.module.scss";

export default function HeroContent() {
  const { t } = useTranslation();
  const nameLines = t("hero.nameLines", { returnObjects: true }) as string[];

  return (
    <motion.div
      className={styles.content}
      initial="hidden"
      animate="visible"
      variants={heroStagger}
    >
      <motion.p className={styles.eyebrow} variants={fadeUpSubtle}>
        {t("hero.eyebrow")}
      </motion.p>

      <motion.h1 className={styles.heading} variants={heroNameStagger}>
        {nameLines.map((line) => (
          <motion.span key={line} variants={heroNameLine}>
            {line}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p className={styles.description} variants={fadeUpSubtle}>
        {t("hero.description")}
      </motion.p>

      <motion.div className={styles.actions} variants={fadeUpSubtle}>
        <Button href="#projects" variant="primary" withArrow>
          {t("hero.ctaPrimary")}
        </Button>
        <Button href="#contact" variant="secondary" withArrow>
          {t("hero.ctaSecondary")}
        </Button>
      </motion.div>

      <motion.div className={styles.socials} variants={fadeUpSubtle}>
        <SocialLink
          href={CONTACT.github}
          label={t("hero.socialGithub")}
          platform="github"
        />
        <SocialLink
          href={CONTACT.linkedin}
          label={t("hero.socialLinkedin")}
          platform="linkedin"
        />
      </motion.div>
    </motion.div>
  );
}
