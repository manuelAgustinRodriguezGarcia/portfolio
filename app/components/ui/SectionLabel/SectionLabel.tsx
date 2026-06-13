"use client";

import type { ReactNode } from "react";
import styles from "./SectionLabel.module.scss";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span className={`${styles.label} ${className ?? ""}`.trim()}>
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </span>
  );
}
