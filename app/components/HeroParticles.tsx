 "use client";

import { useEffect, useRef } from "react";
import styles from "./PortfolioContent.module.scss";

type Particle = {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  alpha: number;
};

function createParticle(width: number, height: number): Particle {
  const base = Math.min(width, height);
  const size = Math.max(1, Math.min(3, base * 0.0025));
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: size,
    speedY: 0.2 + Math.random() * 0.6,
    alpha: 0.25 + Math.random() * 0.35,
  };
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animationId = 0;
    const particles: Particle[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles.length = 0;
      const baseCount = Math.round((rect.width * rect.height) / 26000);
      const count = Math.max(25, Math.min(80, baseCount));
      for (let i = 0; i < count; i += 1) {
        particles.push(createParticle(rect.width, rect.height));
      }
    };

    resize();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const loop = () => {
      frame += 1;
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      particles.forEach((p, index) => {
        const wobble = Math.sin((frame + index * 12) * 0.01) * 0.4;
        p.y -= p.speedY;
        if (p.y + p.radius < 0) {
          const next = createParticle(rect.width, rect.height);
          p.x = next.x;
          p.y = rect.height + next.radius;
          p.radius = next.radius;
          p.speedY = next.speedY;
          p.alpha = next.alpha;
        }
        const gradient = ctx.createRadialGradient(
          p.x + wobble,
          p.y,
          0,
          p.x + wobble,
          p.y,
          p.radius * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${p.alpha})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x + wobble, p.y, p.radius * 1.6, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = window.requestAnimationFrame(loop);
    };

    animationId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.heroParticles} />;
}

