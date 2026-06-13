"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  magnetic?: boolean;
  withArrow?: boolean;
}

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
  onClick,
  magnetic = false,
  withArrow = false,
}: ButtonProps) {
  const classes = [styles.button, styles[variant], magnetic ? styles.magnetic : "", className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <motion.span
      className={styles.inner}
      whileHover={magnetic ? { scale: 1.02 } : undefined}
      whileTap={magnetic ? { scale: 0.98 } : undefined}
    >
      <span>{children}</span>
      {withArrow ? <ArrowRight size={18} strokeWidth={2} aria-hidden="true" /> : null}
    </motion.span>
  );

  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}
