"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import FloatingSettings from "@/app/components/FloatingSettings";
import { PRIMARY_NAV } from "@/app/data/navigation";
import { scrollToSection, scrollToTop } from "@/app/lib/scroll";
import MobileMenu from "@/app/components/layout/MobileMenu/MobileMenu";
import styles from "./Header.module.scss";

const SCROLL_REVEAL_OFFSET = 80;

interface HeaderProps {
  activeSection: string | null;
}

export default function Header({ activeSection }: HeaderProps) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_REVEAL_OFFSET);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href === "#hero") {
      scrollToTop();
      return;
    }
    scrollToSection(href);
  };

  return (
    <>
      <header ref={navRef} className={styles.header}>
        <div
          className={`${styles.pill} ${scrolled ? styles.pillVisible : ""}`}
          aria-hidden={!scrolled}
          {...(!scrolled ? { inert: true } : {})}
        >
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
                  tabIndex={scrolled ? undefined : -1}
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
            <FloatingSettings placement="inline" />

            <button
              type="button"
              className={styles.menuButton}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t("menu.close") : t("menu.open")}
              onClick={() => setMenuOpen((open) => !open)}
              tabIndex={scrolled ? undefined : -1}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        activeSection={activeSection}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavClick}
      />
    </>
  );
}
