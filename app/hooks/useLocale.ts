"use client";

import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export type Locale = "es" | "en";

export function useLocale() {
  const { i18n } = useTranslation();
  const locale: Locale = i18n.language.startsWith("en") ? "en" : "es";

  const setLocale = useCallback(
    (next: Locale) => {
      void i18n.changeLanguage(next);
      if (typeof window !== "undefined") {
        localStorage.setItem("locale", next);
        document.documentElement.lang = next;
      }
    },
    [i18n],
  );

  return { locale, setLocale };
}
