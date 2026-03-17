"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/app/i18n/config";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const stored = localStorage.getItem("locale") as "es" | "en" | null;
    if (stored === "es" || stored === "en") i18n.changeLanguage(stored);
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
