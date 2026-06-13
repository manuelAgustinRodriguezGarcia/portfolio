"use client";

import type { ReactNode } from "react";
import styles from "./SectionShell.module.scss";
import SectionLabel from "@/app/components/ui/SectionLabel/SectionLabel";

interface SectionShellProps {
  id: string;
  label: string;
  title: string;
  description?: string;
  alt?: boolean;
  hideHeader?: boolean;
  fillViewport?: boolean;
  children: ReactNode;
}

export default function SectionShell({
  id,
  label,
  title,
  description,
  alt = false,
  hideHeader = false,
  fillViewport = false,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${alt ? styles.alt : ""} ${fillViewport ? styles.fillViewport : ""}`}
    >
      <div className={styles.inner}>
        {hideHeader ? null : (
          <header className={styles.header}>
            <SectionLabel>{label}</SectionLabel>
            <h2 className={styles.title}>{title}</h2>
            {description ? <p className={styles.description}>{description}</p> : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
