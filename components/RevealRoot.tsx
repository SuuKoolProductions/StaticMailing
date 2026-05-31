"use client";

import { ReactNode } from "react";
import { useReveal } from "./useReveal";

/** Client wrapper that activates scroll-reveal for any [data-reveal] descendants. */
export function RevealRoot({ children }: { children: ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref}>{children}</div>;
}
