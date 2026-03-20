"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { CircleUserRound, Copy, SquareCheckBig, X } from "lucide-react";
import styles from "./FloatingContact.module.scss";

type CopyKey = "email" | "phone";

export default function FloatingContact() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<CopyKey | null>(null);

  const email = t("contact.email");
  const phone = t("contact.phone");

  const copy = async (key: CopyKey, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1000);
    } catch {
      setCopied(null);
    }
  };

  const rows: { key: CopyKey; label: string; value: string }[] = [
    { key: "email", label: t("fabContactEmailLabel"), value: email },
    { key: "phone", label: t("fabContactPhoneLabel"), value: phone },
  ];

  return (
    <div className={styles.root}>
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            className={styles.panel}
            role="dialog"
            aria-label={t("contact.title")}
            initial={{ opacity: 0, scale: 0.82, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.82, y: 10 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            style={{ transformOrigin: "bottom right" }}
          >
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>{t("contact.title")}</span>
            </div>
            <ul className={styles.list}>
              {rows.map((row) => (
                <li key={row.key} className={styles.row}>
                  <div className={styles.rowText}>
                    <span className={styles.label}>{row.label}</span>
                    <span
                      className={
                        row.key === "email"
                          ? `${styles.value} ${styles.valueEmail}`
                          : styles.value
                      }
                    >
                      {row.value}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`${styles.copyButton} ${
                      copied === row.key ? styles.copyButtonActive : ""
                    }`}
                    onClick={() => copy(row.key, row.value)}
                    aria-label={
                      copied === row.key
                        ? t("fabContactCopied")
                        : t("fabContactAriaCopy", { field: row.label })
                    }
                  >
                    {copied === row.key ? (
                      <SquareCheckBig size={16} strokeWidth={2} aria-hidden />
                    ) : (
                      <Copy size={16} strokeWidth={2} aria-hidden />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        className={styles.fab}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={
          open ? t("fabContactAriaClose") : t("fabContactAriaOpen")
        }
        whileTap={{ scale: 0.95 }}
      >
        {open ? (
          <X size={22} strokeWidth={2} aria-hidden />
        ) : (
          <CircleUserRound size={22} strokeWidth={2} aria-hidden />
        )}
      </motion.button>
    </div>
  );
}
