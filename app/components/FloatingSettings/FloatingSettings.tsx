"use client";

import { Moon, Settings, Sun } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/app/hooks/useLocale";
import { useTheme } from "@/app/hooks/useTheme";
import styles from "./FloatingSettings.module.scss";

export interface FloatingSettingsProps {
  placement?: "floating" | "inline";
}

export default function FloatingSettings({ placement = "floating" }: FloatingSettingsProps) {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();
  const { setTheme, isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target || rootRef.current?.contains(target)) return;
      close();
    };

    const onScroll = () => close();

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open, close]);

  const languageLabel =
    locale === "es"
      ? `${t("settings.language")}: ${t("settings.langEs")}`
      : `${t("settings.language")}: ${t("settings.langEn")}`;

  const themeLabel = isDark ? t("settings.themeDark") : t("settings.themeLight");

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-placement={placement}
      data-open={String(open)}
    >
      <div
        id={menuId}
        className={styles.menu}
        data-open={String(open)}
        role="region"
        aria-label={`${t("settings.language")}, ${t("settings.theme")}`}
        aria-hidden={!open}
      >
        <div className={styles.menuSection}>
          <p className={styles.menuLabel}>{t("settings.language")}</p>
          <button
            type="button"
            className={styles.toggleGroup}
            data-active-index={locale === "es" ? "0" : "1"}
            onClick={() => setLocale(locale === "es" ? "en" : "es")}
            aria-label={languageLabel}
          >
            <span className={styles.toggleThumb} aria-hidden="true" />
            <span className={styles.toggleOption} data-active={locale === "es" ? "true" : "false"} aria-hidden="true">
              ES
            </span>
            <span className={styles.toggleOption} data-active={locale === "en" ? "true" : "false"} aria-hidden="true">
              EN
            </span>
          </button>
        </div>

        <div className={styles.menuSection}>
          <p className={styles.menuLabel}>{t("settings.theme")}</p>
          <button
            type="button"
            className={styles.toggleGroup}
            data-active-index={isDark ? "1" : "0"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={themeLabel}
          >
            <span className={styles.toggleThumb} aria-hidden="true" />
            <span className={styles.toggleOption} data-active={!isDark ? "true" : "false"} aria-hidden="true">
              <Sun size={16} strokeWidth={2} />
            </span>
            <span className={styles.toggleOption} data-active={isDark ? "true" : "false"} aria-hidden="true">
              <Moon size={16} strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>

      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? t("settings.closeMenu") : t("settings.openMenu")}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.triggerIcon} aria-hidden="true">
          <Settings size={20} strokeWidth={2} />
        </span>
      </button>
    </div>
  );
}
