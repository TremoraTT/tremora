"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import type { ComparisonBarData } from "@/components/sections/BlindSpotSection";

interface AnimatedComparisonBarProps {
  bar: ComparisonBarData;
  delay?: number;
  className?: string;
}

export function AnimatedComparisonBar({
  bar,
  delay = 0,
  className,
}: AnimatedComparisonBarProps): React.ReactElement {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  useEffect(() => {
    const element = trackRef.current;

    if (element === null) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFilled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={cn("flex w-full items-center gap-4", className)}>
      <span className="w-[120px] shrink-0 text-xs text-slate-500">
        {bar.label}
      </span>
      <div
        ref={trackRef}
        className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full border border-border bg-green-50"
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-1000 ease-out motion-reduce:hidden motion-reduce:transition-none",
            bar.variant === "emphasis"
              ? "bg-gradient-to-r from-green-600 to-green-700"
              : "bg-green-600",
          )}
          style={{
            width: isFilled ? `${bar.fillPercent}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
        <div
          className={cn(
            "hidden h-full rounded-full motion-reduce:block",
            bar.variant === "emphasis"
              ? "bg-gradient-to-r from-green-600 to-green-700"
              : "bg-green-600",
          )}
          style={{ width: `${bar.fillPercent}%` }}
          aria-hidden="true"
        />
      </div>
      <span className="shrink-0 text-sm text-ink">{bar.value}</span>
    </div>
  );
}
