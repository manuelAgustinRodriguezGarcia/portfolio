export const NAV_OFFSET = 72;

export function scrollToSection(selector: string) {
  const target = document.querySelector<HTMLElement>(selector);
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const absoluteTop = rect.top + window.scrollY;

  window.scrollTo({
    top: absoluteTop - NAV_OFFSET,
    behavior: "smooth",
  });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
