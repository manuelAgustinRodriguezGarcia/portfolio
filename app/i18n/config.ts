import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./locales/es.json";
import en from "./locales/en.json";

const resources = {
  es: { translation: es },
  en: { translation: en },
};

export const defaultNS = "translation";

export function initI18n() {
  if (i18n.isInitialized) return;
  i18n.use(initReactI18next).init({
    resources,
    lng: "es",
    fallbackLng: "es",
    defaultNS,
    interpolation: { escapeValue: false },
  });
}

initI18n();

export default i18n;
