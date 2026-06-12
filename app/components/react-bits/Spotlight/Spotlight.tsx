"use client";

import { motion } from "framer-motion";
import styles from "./Spotlight.module.scss";

interface SpotlightProps {
  className?: string;
}

export default function Spotlight({ className = "" }: SpotlightProps) {
  return (
    <div className={`${styles.wrapper} ${className}`} aria-hidden="true">
      <motion.div
        className={styles.glowPrimary}
        animate={{ opacity: [0.45, 0.7, 0.45], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={styles.glowSecondary}
        animate={{ opacity: [0.25, 0.45, 0.25], x: [0, 24, 0], y: [0, -16, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className={styles.grid} />
    </div>
  );
}
