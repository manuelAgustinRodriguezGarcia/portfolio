import { Github, Linkedin } from "lucide-react";
import styles from "./SocialLink.module.scss";

interface SocialLinkProps {
  href: string;
  label: string;
  platform: "github" | "linkedin";
}

export default function SocialLink({ href, label, platform }: SocialLinkProps) {
  const Icon = platform === "github" ? Github : Linkedin;

  return (
    <a
      href={href}
      className={styles.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </a>
  );
}
