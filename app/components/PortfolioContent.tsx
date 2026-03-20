"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Cog, Menu, X } from "lucide-react";
import Image from "next/image";
import styles from "./PortfolioContent.module.scss";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import HeroParticles from "./HeroParticles";
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

const menuEase = [0.4, 0, 0.2, 1] as const;

const menuLadder = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.16,
      ease: menuEase,
      staggerChildren: -0.04,
    },
  },
};

const menuItemLadder = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.06, ease: menuEase },
      y: { duration: 0.22, ease: menuEase },
    },
  },
};

export default function PortfolioContent() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string | null>(null);
  const showCornerIdentity = activeHash !== null;
  const navRef = useRef<HTMLElement | null>(null);
  const [isNavNarrow, setIsNavNarrow] = useState(false);
  const menuOpenRef = useRef(menuOpen);
  const activeUpdateFreezeUntilRef = useRef(0);
  const lastActiveUpdateRef = useRef(0);

  const heroFullName = t("hero.name");
  const heroNameOptions = useMemo(() => ["Manuel", "Manuel Rodriguez"], []);
  const heroNameSizerText = useMemo(
    () =>
      heroNameOptions.reduce((max, current) =>
        current.length > max.length ? current : max
      , ""),
    [heroNameOptions]
  );
  const [heroOptionIndex, setHeroOptionIndex] = useState(0);
  const [heroCharCount, setHeroCharCount] = useState(0);
  const [heroIsViolet, setHeroIsViolet] = useState(false);
  const heroTypedText =
    heroNameOptions[heroOptionIndex]?.slice(0, heroCharCount) ?? "";

  const navItems = useMemo(
    () => [
      { href: "#profile", label: t("nav.about") },
      { href: "#experience", label: t("nav.experience") },
      { href: "#education", label: t("nav.education") },
      { href: "#skills", label: t("nav.skills") },
      { href: "#contact", label: t("nav.contact") },
    ],
    [t]
  );

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const nextScrolled = window.scrollY > 40;
          setScrolled(nextScrolled);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const update = () => {
      const width = el.getBoundingClientRect().width;
      setIsNavNarrow(width <= 900);
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
    if (menuOpen) {
      activeUpdateFreezeUntilRef.current = Date.now() + 420;
      lastActiveUpdateRef.current = 0;
    }
  }, [menuOpen]);

  useEffect(() => {
    if (activeHash === null) setMenuOpen(false);
  }, [activeHash]);

  useEffect(() => {
    const ids = ["hero", "profile", "experience", "education", "skills", "contact"];

    const computeActive = () => {
      if (menuOpenRef.current) {
        const now = Date.now();
        if (now < activeUpdateFreezeUntilRef.current) return;
        if (now - lastActiveUpdateRef.current < 120) return;
      }

      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const center = scrollY + viewportH / 2;

      let bestId: string | null = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        const middle = top + rect.height / 2;
        const distance = Math.abs(middle - center);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      });

      if (!bestId || bestId === "hero") {
        setActiveHash((current) => (current === null ? current : null));
      } else {
        setActiveHash((current) => (current === `#${bestId}` ? current : `#${bestId}`));
      }

      lastActiveUpdateRef.current = Date.now();
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          computeActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", computeActive);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", computeActive);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (!settingsOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSettingsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [settingsOpen]);

  useEffect(() => {
    if (!settingsOpen) return;

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      const panel = document.getElementById("settings-panel");
      const button = document.querySelector<HTMLButtonElement>(
        'button[aria-controls="settings-panel"]'
      );

      const clickedInsidePanel = panel ? panel.contains(target) : false;
      const clickedSettingsButton = button ? button.contains(target) : false;

      if (clickedInsidePanel || clickedSettingsButton) return;
      setSettingsOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [settingsOpen]);

  useEffect(() => {
    if (heroNameOptions.length === 0) return;

    let cancelled = false;
    let optionIndex = 0;
    let charCount = 0;
    let mode: "typing" | "holding" | "deleting" = "typing";
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const typingMs = 90;
    const holdingMs = 3000;
    const deletingMs = 125;
    const betweenMs = 180;

    const currentTarget = () => heroNameOptions[optionIndex] ?? "";

    const step = () => {
      if (cancelled) return;
      const target = currentTarget();

      if (mode === "typing") {
        charCount += 1;
        setHeroOptionIndex(optionIndex);
        setHeroCharCount(charCount);

        if (charCount >= target.length) {
          setHeroIsViolet(true);
          mode = "holding";
          timeoutId = setTimeout(step, holdingMs);
          return;
        }

        timeoutId = setTimeout(step, typingMs);
        return;
      }

      if (mode === "holding") {
        mode = "deleting";
        timeoutId = setTimeout(step, betweenMs);
        return;
      }

      charCount = Math.max(0, charCount - 1);
      setHeroOptionIndex(optionIndex);
      setHeroCharCount(charCount);

      if (charCount === 0) {
        setHeroIsViolet(false);
        optionIndex = (optionIndex + 1) % heroNameOptions.length;
        mode = "typing";
        timeoutId = setTimeout(step, betweenMs);
        return;
      }

      timeoutId = setTimeout(step, deletingMs);
    };

    timeoutId = setTimeout(() => {
      setHeroOptionIndex(0);
      setHeroCharCount(0);
      setHeroIsViolet(false);
      step();
    }, 350);

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [heroNameOptions]);

  const onNavClick = () => setMenuOpen(false);

  const scrollToAbout = () => {
    const target = document.querySelector<HTMLElement>("#profile");
    if (!target) return;
    const navOffset = 72;
    const rect = target.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    window.scrollTo({
      top: absoluteTop - navOffset,
      behavior: "smooth",
    });
  };

  const scrollToHref = (href: string) => {
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    const navOffset = 72;
    const rect = target.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    window.scrollTo({
      top: absoluteTop - navOffset,
      behavior: "smooth",
    });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.nav} ${scrolled ? styles.navScrolled : ""} ${
          isNavNarrow ? styles.navMobile : ""
        } ${isNavNarrow && showCornerIdentity ? styles.navMobileVisible : ""}`}
        aria-hidden={isNavNarrow && !showCornerIdentity ? true : undefined}
      >
        {!isNavNarrow ? (
          <>
            <a
              href="#hero"
              className={styles.logo}
              onClick={(event) => {
                event.preventDefault();
                onNavClick();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Home"
            >
              <span className={styles.logoIdentity} aria-hidden="true">
                <span className={styles.logoDesktopIdentity} style={{ display: "inline-flex" }}>
                  <AnimatePresence mode="wait">
                    {showCornerIdentity ? (
                      <motion.span
                        key="identity"
                        className={styles.logoIdentityVisible}
                        initial={{ y: -14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      >
                        <Image
                          src="/avatar.png"
                          alt=""
                          width={34}
                          height={34}
                          className={styles.logoAvatarImage}
                          priority
                        />
                        <span className={styles.logoAvatarTextWrap} aria-hidden="true">
                          <span className={styles.logoAvatarTextShort}>MRG</span>
                          <span className={styles.logoAvatarTextFull}>Manuel Rodriguez Garcia</span>
                          <span className={styles.logoAvatarTextMobile}>Manuel Rodriguez</span>
                        </span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="hidden"
                        className={styles.logoIdentityHidden}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                      />
                    )}
                  </AnimatePresence>
                </span>
              </span>
            </a>
            <div className={styles.links} aria-label="Primary">
              {navItems.map((item) => {
                const isActive = activeHash === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavClick();
                      const target = document.querySelector<HTMLElement>(item.href);
                      if (!target) return;
                      const navOffset = 72;
                      const rect = target.getBoundingClientRect();
                      const absoluteTop = rect.top + window.scrollY;
                      window.scrollTo({
                        top: absoluteTop - navOffset,
                        behavior: "smooth",
                      });
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && activeHash && (
                      <motion.span
                        layoutId="nav-pill"
                        className={styles.linksPill}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                          mass: 0.3,
                        }}
                        aria-hidden="true"
                      />
                    )}
                    <span className={styles.linkLabel}>{item.label}</span>
                  </a>
                );
              })}
              <button
                type="button"
                className={styles.settingsButton}
                aria-label="Settings"
                aria-expanded={settingsOpen}
                aria-controls="settings-panel"
                onClick={() => setSettingsOpen((v) => !v)}
              >
                <Cog size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className={styles.navMobileIdentityRow}>
            <a
              href="#hero"
              className={styles.logo}
              tabIndex={showCornerIdentity ? 0 : -1}
              onClick={(event) => {
                event.preventDefault();
                onNavClick();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Home"
            >
              <span className={styles.logoIdentity} aria-hidden="true">
                <span className={styles.logoMobileIdentity} style={{ display: "inline-flex" }}>
                  <span className={styles.logoMobileIdentityContent}>
                    <Image
                      src="/avatar.png"
                      alt=""
                      width={34}
                      height={34}
                      className={styles.logoAvatarImage}
                      priority
                    />
                    <span className={styles.logoAvatarTextWrap} aria-hidden="true">
                      <span className={styles.logoAvatarTextMobile}>
                        Manuel Rodriguez
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </a>
          </div>
        )}
      </nav>
      {isNavNarrow && (
        <AnimatePresence>
          {showCornerIdentity && (
            <motion.div
              key="menuButtonDock"
              className={styles.menuButtonDock}
              initial={{ y: 72, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 72, opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            >
              <button
                type="button"
                className={styles.menuButton}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((v) => !v)}
                tabIndex={0}
              >
                {menuOpen ? (
                  <X size={20} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Menu size={20} strokeWidth={2} aria-hidden="true" />
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            className={styles.settingsOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.aside
              id="settings-panel"
              className={`${styles.settingsPanel} ${scrolled ? styles.settingsPanelScrolled : ""}`}
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 0 0 0 20px)", scale: 0.98 }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 0 0 0 20px)", scale: 1 }}
              exit={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 0 0 0 20px)", scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <LanguageToggle />
              <ThemeToggle />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.menuOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              id="mobile-menu"
              className={styles.menuPanel}
              role="dialog"
              aria-modal="true"
            variants={menuLadder}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {navItems.map((item) => {
                const isActive = activeHash === item.href;
                return (
                  <motion.button
                    key={item.href}
                    type="button"
                    className={styles.mobileNavPill}
                    data-active={isActive ? "true" : "false"}
                    onClick={() => {
                      onNavClick();
                      scrollToHref(item.href);
                    }}
                    aria-current={isActive ? "page" : undefined}
                    variants={menuItemLadder}
                  >
                    {isActive && (
                      <span className={styles.mobileNavPillActiveBg} aria-hidden="true" />
                    )}
                    <span className={styles.mobileNavPillLabel}>{item.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="hero" className={`${styles.section} ${styles.hero}`}>
        <HeroParticles />
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
            <motion.h1 className={styles.heroName} variants={fadeInUp}>
              <span className={styles.heroNameSizer} aria-hidden="true">
                {heroNameSizerText}
              </span>
              <span className={styles.heroNameTyped} aria-hidden="true">
                <span
                  className={`${styles.heroNameBase} ${
                    heroIsViolet ? styles.heroLayerHidden : styles.heroLayerVisible
                  }`}
                >
                  {heroTypedText}
                </span>
                <span
                  className={`${styles.heroNameViolet} ${
                    heroIsViolet
                      ? styles.heroLayerVisible
                      : styles.heroLayerHidden
                  }`}
                >
                  {heroTypedText}
                </span>
              </span>
            </motion.h1>
            <motion.p className={styles.role} variants={fadeInUp}>
              {t("hero.role")}
            </motion.p>
            <motion.div className={styles.heroCtas} variants={fadeInUp}>
              <motion.a
                href="#profile"
                className={styles.ctaPrimary}
                whileHover={{}}
                whileTap={{}}
              >
                {t("hero.cta")}
              </motion.a>
              <motion.a
                href="#contact"
                className={styles.ctaSecondary}
                whileHover={{}}
                whileTap={{}}
              >
                {t("nav.contact")}
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.div
            className={styles.profileImageWrap}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className={styles.avatar}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            >
              <Image
                src="/avatar.png"
                alt={t("hero.name")}
                fill
                sizes="(max-width: 768px) 240px, 320px"
                className={styles.avatarImage}
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        <button
          type="button"
          className={styles.scrollDown}
          onClick={scrollToAbout}
          aria-label={t("nav.about")}
        >
          <ChevronDown size={18} />
        </button>
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
          <motion.div className={styles.card} variants={fadeInUp}>
            <p className={styles.profileText}>{t("profile.text")}</p>
          </motion.div>
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
            <motion.a className={styles.contactCard} href="tel:+541138899722" variants={fadeInUp}>
              <span className={styles.contactLabel}>Phone</span>
              <span className={styles.contactValue}>{t("contact.phone")}</span>
            </motion.a>
            <motion.a
              className={styles.contactCard}
              href="mailto:manuelrodriguezgarcia.wd@gmail.com"
              variants={fadeInUp}
            >
              <span className={styles.contactLabel}>Email</span>
              <span className={styles.contactValue}>{t("contact.email")}</span>
            </motion.a>
            <motion.div className={styles.contactCard} variants={fadeInUp}>
              <span className={styles.contactLabel}>Location</span>
              <span className={styles.contactValue}>{t("contact.location")}</span>
            </motion.div>
            <motion.a
              className={styles.contactCard}
              href="https://www.linkedin.com/in/manuel-agustin-rodriguez-garcia"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
            >
              <span className={styles.contactLabel}>{t("contact.linkedin")}</span>
              <span className={styles.contactValue}>manuel-agustin-rodriguez-garcia</span>
            </motion.a>
            <motion.a
              className={styles.contactCard}
              href="https://github.com/manuelAgustinRodriguezGarcia"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
            >
              <span className={styles.contactLabel}>{t("contact.github")}</span>
              <span className={styles.contactValue}>manuelAgustinRodriguezGarcia</span>
            </motion.a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
