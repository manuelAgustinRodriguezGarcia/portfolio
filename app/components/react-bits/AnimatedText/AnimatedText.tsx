"use client";

import { motion } from "framer-motion";
import { textReveal } from "@/app/lib/motion";
import styles from "./AnimatedText.module.scss";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
}

export default function AnimatedText({
  text,
  as: Tag = "span",
  className = "",
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={`${styles.wrapper} ${className}`} aria-label={text}>
      <span className={styles.srOnly}>{text}</span>
      <motion.span
        className={styles.line}
        aria-hidden="true"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className={styles.wordWrap}>
            <motion.span className={styles.word} variants={textReveal}>
              {word}
            </motion.span>
            {index < words.length - 1 ? "\u00A0" : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
