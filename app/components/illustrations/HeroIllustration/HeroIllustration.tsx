import Image from "next/image";
import { PERSON } from "@/app/data/site";
import styles from "./HeroIllustration.module.scss";

interface HeroIllustrationProps {
  alt: string;
}

export default function HeroIllustration({ alt }: HeroIllustrationProps) {
  return (
    <div className={styles.root} aria-hidden="true">
      <svg className={styles.backdrop} viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="360" cy="96" r="72" fill="var(--accent-soft)" />
        <rect x="48" y="320" width="96" height="96" rx="24" fill="var(--accent-2-soft)" />
        <path
          d="M96 160C96 124.654 124.654 96 160 96H280C315.346 96 344 124.654 344 160V280C344 315.346 315.346 344 280 344H160C124.654 344 96 315.346 96 280V160Z"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="8 10"
          opacity="0.45"
        />
        <circle cx="128" cy="128" r="8" fill="var(--accent-warm)" />
        <circle cx="392" cy="320" r="12" fill="var(--accent-2)" opacity="0.7" />
        <path d="M320 72L360 112L320 152" stroke="var(--accent-2)" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <div className={styles.avatarFrame}>
        <div className={styles.avatarGlow} />
        <div className={styles.avatarInner}>
          <Image
            src={PERSON.avatar}
            alt={alt}
            fill
            sizes="(max-width: 768px) 220px, 320px"
            className={styles.avatar}
            priority
          />
        </div>
      </div>

      <svg className={styles.foreground} viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M40 240C120 180 200 300 280 240C340 196 400 260 440 220"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.35"
        />
        <circle cx="72" cy="360" r="5" fill="var(--accent)" />
        <circle cx="408" cy="128" r="6" fill="var(--accent-2)" />
      </svg>
    </div>
  );
}
