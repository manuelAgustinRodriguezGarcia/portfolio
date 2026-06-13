"use client";

import { useEffect, useState } from "react";
import LightPillar from "@/app/components/react-bits/LightPillar";
import { useTheme } from "@/app/hooks/useTheme";
import styles from "./HeroVisual.module.scss";

export default function HeroVisual() {
  const [isMobile, setIsMobile] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div className={styles.visual} aria-hidden="true">
      <div className={`${styles.pillarSlot} ${isDark ? "" : styles.pillarSlotLight}`}>
        <LightPillar
          topColor={isDark ? "#9032bb" : "#c49ad8"}
          bottomColor={isDark ? "#cb9bde" : "#ecd4f2"}
          intensity={isMobile ? 0.55 : isDark ? 0.95 : 0.78}
          rotationSpeed={0.32}
          glowAmount={isMobile ? 0.002 : 0.003}
          pillarWidth={isMobile ? 3.6 : 4.5}
          pillarHeight={0.4}
          noiseIntensity={isMobile ? 0.22 : isDark ? 0.35 : 0.08}
          pillarRotation={0}
          interactive={false}
          mixBlendMode="normal"
          quality={isMobile ? "low" : "medium"}
          transparentBackground={!isDark}
          lightSurface={!isDark}
        />
      </div>
    </div>
  );
}
