"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const computeActive = () => {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const center = scrollY + viewportH / 2;

      let bestId: string | null = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        const middle = top + rect.height / 2;
        const distance = Math.abs(middle - center);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      });

      setActiveId((current) => (current === bestId ? current : bestId));
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          computeActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", computeActive);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", computeActive);
    };
  }, [sectionIds]);

  return activeId;
}
