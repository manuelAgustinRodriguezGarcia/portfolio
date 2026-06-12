"use client";

import type { ReactNode } from "react";
import styles from "./SectionLabel.module.scss";

interface SectionLabelProps {
  children: ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className={styles.label}>
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </span>
  );
}
