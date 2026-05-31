import { ReactNode } from "react";

export function Stamp({
  children,
  rotate = -5,
  reveal = false,
  className = "",
}: {
  children: ReactNode;
  rotate?: number;
  reveal?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`stamp text-[0.7rem] ${reveal ? "reveal-stamp" : ""} ${className}`}
      style={{ ["--rot" as string]: `${rotate}deg` }}
      {...(reveal ? { "data-reveal": "" } : {})}
    >
      {children}
    </span>
  );
}
