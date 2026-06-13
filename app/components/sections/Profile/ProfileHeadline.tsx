"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trans } from "react-i18next";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";
import { easeOut, profileHeadlineViewport, slideInFromLeft, staggerContainer } from "@/app/lib/motion";
import styles from "./Profile.module.scss";

export default function ProfileHeadline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isInView = useInView(ref, profileHeadlineViewport);
  const duration = reduced ? 0.01 : 0.48;

  return (
    <h3 className={styles.headline}>
      <motion.div
        ref={ref}
        className={styles.headlineInner}
        initial={false}
        animate={isInView || reduced ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <Trans
          i18nKey="profile.headline"
          components={{
            prim: (
              <motion.span
                className={styles.headlinePrim}
                variants={slideInFromLeft}
                transition={{ duration, ease: easeOut }}
              />
            ),
            grad: (
              <motion.span
                className={styles.headlineGrad}
                variants={slideInFromLeft}
                transition={{ duration, ease: easeOut }}
              />
            ),
          }}
        />
      </motion.div>
    </h3>
  );
}
