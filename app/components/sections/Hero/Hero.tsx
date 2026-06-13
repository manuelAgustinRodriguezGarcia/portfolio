"use client";

import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-label="Hero">
      <div className={styles.background} aria-hidden="true" />
      <HeroVisual />
      <div className={styles.body}>
        <div className={styles.inner}>
          <div className={styles.contentColumn}>
            <HeroContent />
          </div>
        </div>
      </div>
    </section>
  );
}
