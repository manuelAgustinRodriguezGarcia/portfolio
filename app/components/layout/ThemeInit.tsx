"use client";

import { useEffect } from "react";

type Theme = "dark" | "light";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export default function ThemeInit() {
  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  return null;
}

export function setTheme(theme: Theme) {
  applyTheme(theme);
  window.localStorage.setItem("theme", theme);
}

export function toggleTheme(): Theme {
  const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  const next: Theme = current === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

export type { Theme };
