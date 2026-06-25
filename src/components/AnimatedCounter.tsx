"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  useGrouping?: boolean;
  className?: string;
  "aria-hidden"?: boolean;
}

function easeOutCubic(progress: number): number {
  return 1 - (1 - progress) ** 3;
}

function formatCounterValue(value: number, useGrouping: boolean): string {
  const rounded = Math.round(value);

  if (useGrouping) {
    return rounded.toLocaleString("en-US");
  }

  return String(rounded);
}

export function AnimatedCounter({
  end,
  prefix = "",
  suffix = "",
  duration = 1600,
  useGrouping = false,
  className,
  "aria-hidden": ariaHidden,
}: AnimatedCounterProps): React.ReactElement {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState<number>(0);
  const hasAnimatedRef = useRef<boolean>(false);
  const formattedEnd = `${prefix}${formatCounterValue(end, useGrouping)}${suffix}`;

  useEffect(() => {
    const element = elementRef.current;

    if (element === null) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current) {
          return;
        }

        hasAnimatedRef.current = true;
        const startTime = performance.now();

        const animate = (timestamp: number): void => {
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const easedProgress = easeOutCubic(progress);
          setDisplayValue(end * easedProgress);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [duration, end]);

  return (
    <>
      <span
        ref={elementRef}
        className={cn(className, "motion-reduce:hidden")}
        aria-hidden={ariaHidden}
      >
        {prefix}
        {formatCounterValue(displayValue, useGrouping)}
        {suffix}
      </span>
      <span
        className={cn(className, "hidden motion-reduce:inline")}
        aria-hidden={ariaHidden}
      >
        {formattedEnd}
      </span>
    </>
  );
}
