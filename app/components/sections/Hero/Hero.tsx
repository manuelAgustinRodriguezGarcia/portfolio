"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Button from "@/app/components/ui/Button/Button";
import SocialLink from "@/app/components/ui/SocialLink/SocialLink";
import HeroIllustration from "@/app/components/illustrations/HeroIllustration/HeroIllustration";
import Spotlight from "@/app/components/react-bits/Spotlight/Spotlight";
import AnimatedText from "@/app/components/react-bits/AnimatedText/AnimatedText";
import { CONTACT } from "@/app/data/site";
import { fadeUp, staggerContainer } from "@/app/lib/motion";
import styles from "./Hero.module.scss";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className={styles.hero}>
      <Spotlight />
      <div className={styles.inner}>
        <motion.div
          className={styles.content}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span className={styles.label} variants={fadeUp}>
            {t("hero.label")}
          </motion.span>
          <motion.p className={styles.greeting} variants={fadeUp}>
            {t("hero.greeting")}
          </motion.p>
          <motion.div variants={fadeUp}>
            <AnimatedText text={t("hero.name")} as="h1" className={styles.name} />
          </motion.div>
          <motion.p className={styles.role} variants={fadeUp}>
            {t("hero.role")}
          </motion.p>
          <motion.p className={styles.value} variants={fadeUp}>
            {t("hero.valueProposition")}
          </motion.p>
          <motion.div className={styles.actions} variants={fadeUp}>
            <Button href="#profile" variant="primary" magnetic>
              {t("hero.cta")}
            </Button>
            <Button href="#projects" variant="secondary">
              {t("hero.ctaProjects")}
            </Button>
            <Button href="#contact" variant="ghost">
              {t("hero.ctaContact")}
            </Button>
          </motion.div>
          <motion.div className={styles.socials} variants={fadeUp}>
            <SocialLink
              href={CONTACT.github}
              label={t("contact.labelGithub")}
              platform="github"
            />
            <SocialLink
              href={CONTACT.linkedin}
              label={t("contact.labelLinkedin")}
              platform="linkedin"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <HeroIllustration alt={t("hero.name")} />
        </motion.div>
      </div>
    </section>
  );
}
