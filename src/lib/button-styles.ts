import { cn } from "@/lib/utils";

export const BUTTON_HOVER_CLASS = cn(
  "transition-transform duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
  "motion-safe:hover:scale-[1.03]",
  "motion-safe:active:scale-[0.98]",
);
