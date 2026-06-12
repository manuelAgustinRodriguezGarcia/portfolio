"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Cog, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageToggle from "@/app/components/LanguageToggle";
import ThemeToggle from "@/app/components/ThemeToggle";
import { PRIMARY_NAV } from "@/app/data/navigation";
import { PERSON } from "@/app/data/site";
import { scrollToSection, scrollToTop } from "@/app/lib/scroll";
import MobileMenu from "@/app/components/layout/MobileMenu/MobileMenu";
import styles from "./Header.module.scss";

interface HeaderProps {
  activeSection: string | null;
}

export default function Header({ activeSection }: HeaderProps) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen && !settingsOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSettingsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, settingsOpen]);

  useEffect(() => {
    if (!settingsOpen) return;
    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      const panel = document.getElementById("settings-panel");
      const button = document.querySelector<HTMLButtonElement>('button[aria-controls="settings-panel"]');
      if (panel?.contains(target) || button?.contains(target)) return;
      setSettingsOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [settingsOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <header
        ref={navRef}
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.inner}>
          <a
            href="#hero"
            className={styles.logo}
            onClick={(event) => {
              event.preventDefault();
              setMenuOpen(false);
              scrollToTop();
            }}
            aria-label={t("nav.home")}
          >
            <Image
              src={PERSON.avatar}
              alt=""
              width={36}
              height={36}
              className={styles.avatar}
              priority
            />
            <span className={styles.logoText}>
              <span className={styles.initials}>{PERSON.initials}</span>
              <span className={styles.fullName}>{PERSON.name}</span>
            </span>
          </a>

          <nav className={styles.desktopNav} aria-label="Primary">
            {PRIMARY_NAV.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(item.href);
                  }}
                  aria-current={isActive ? "true" : undefined}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-indicator"
                      className={styles.indicator}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className={styles.navLabel}>{t(item.labelKey)}</span>
                </a>
              );
            })}
          </nav>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.settingsButton}
              aria-expanded={settingsOpen}
              aria-controls="settings-panel"
              aria-label={settingsOpen ? t("settings.close") : t("settings.open")}
              onClick={() => setSettingsOpen((open) => !open)}
            >
              <Cog size={18} aria-hidden="true" />
            </button>

            <button
              type="button"
              className={styles.menuButton}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t("menu.close") : t("menu.open")}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {settingsOpen ? (
          <motion.div
            id="settings-panel"
            className={styles.settingsPanel}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            role="region"
            aria-label={t("settings.open")}
          >
            <LanguageToggle />
            <ThemeToggle />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <MobileMenu
        open={menuOpen}
        activeSection={activeSection}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavClick}
      />
    </>
  );
}
