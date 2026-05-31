"use client";

import { useEffect, useRef } from "react";

/**
 * Adds `is-in` to elements carrying `data-reveal` once they scroll into view.
 * Used for stamp-slam and fade-up motion. Respects prefers-reduced-motion via CSS.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.matches("[data-reveal]")
      ? [root, ...Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"))]
      : Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay;
            if (delay) el.style.transitionDelay = `${delay}ms`;
            el.classList.add("is-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return ref;
}
