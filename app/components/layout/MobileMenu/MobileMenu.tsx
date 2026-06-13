"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PRIMARY_NAV } from "@/app/data/navigation";
import { menuContainer, menuItem } from "@/app/lib/motion";
import styles from "./MobileMenu.module.scss";

interface MobileMenuProps {
  open: boolean;
  activeSection: string | null;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export default function MobileMenu({
  open,
  activeSection,
  onClose,
  onNavigate,
}: MobileMenuProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
    const onScroll = () => onClose();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className={styles.backdrop}
            aria-label={t("menu.close")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
            id="mobile-menu"
            className={styles.panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuContainer}
            aria-label="Mobile"
          >
            <ul className={styles.list}>
              {PRIMARY_NAV.map((item) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <motion.li key={item.href} variants={menuItem}>
                    <button
                      type="button"
                      className={`${styles.link} ${isActive ? styles.active : ""}`}
                      onClick={() => onNavigate(item.href)}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {t(item.labelKey)}
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        </>
      ) : null}
    </AnimatePresence>
  );
}
