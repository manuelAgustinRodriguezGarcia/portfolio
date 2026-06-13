"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";
import { easeOut, profileBlockViewport } from "@/app/lib/motion";
import styles from "./Profile.module.scss";

interface ProfileBlockProps {
  className?: string;
  indexLabel: string;
  index: number;
  text: React.ReactNode;
}

export default function ProfileBlock({ className, indexLabel, index, text }: ProfileBlockProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const isInView = useInView(ref, profileBlockViewport);
  const duration = reduced ? 0.01 : 0.48;
  const delay = reduced ? 0 : index * 0.07;

  return (
    <motion.article
      ref={ref}
      className={className}
      initial={false}
      animate={
        isInView || reduced
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: 56 }
      }
      transition={{ duration, delay, ease: easeOut }}
    >
      <span className={styles.index} aria-hidden="true">
        {indexLabel}
      </span>
      <p className={styles.text}>{text}</p>
    </motion.article>
  );
}
