"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, summary, label, [role="button"], [role="link"]';

const RING_SIZE_DEFAULT = 24;
const RING_SIZE_HOVER = 40;

function isInteractiveElement(element: Element | null): boolean {
  if (element === null) {
    return false;
  }

  const interactive = element.closest(INTERACTIVE_SELECTOR);

  if (interactive === null) {
    return false;
  }

  if (
    interactive instanceof HTMLButtonElement ||
    interactive instanceof HTMLInputElement ||
    interactive instanceof HTMLSelectElement ||
    interactive instanceof HTMLTextAreaElement
  ) {
    return !interactive.disabled;
  }

  if (interactive instanceof HTMLAnchorElement) {
    return interactive.getAttribute("aria-disabled") !== "true";
  }

  return true;
}

function canUseCustomCursor(): boolean {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const hasHover = window.matchMedia("(hover: hover)").matches;

  return !prefersReducedMotion && hasHover;
}

export function CustomCursor(): React.ReactElement | null {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotPositionRef = useRef({ x: 0, y: 0 });
  const ringPositionRef = useRef({ x: 0, y: 0 });
  const ringSizeRef = useRef<number>(RING_SIZE_DEFAULT);
  const targetRingSizeRef = useRef<number>(RING_SIZE_DEFAULT);
  const isHoveringRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(false);
  const [isActive] = useState<boolean>(() => canUseCustomCursor());
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    document.documentElement.classList.add("custom-cursor-active");
    document.body.classList.add("custom-cursor-active");

    const setDotPosition = (x: number, y: number): void => {
      dotPositionRef.current = { x, y };

      if (dotRef.current !== null) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const updateRing = (): void => {
      ringPositionRef.current.x +=
        (dotPositionRef.current.x - ringPositionRef.current.x) * 0.14;
      ringPositionRef.current.y +=
        (dotPositionRef.current.y - ringPositionRef.current.y) * 0.14;

      targetRingSizeRef.current = isHoveringRef.current
        ? RING_SIZE_HOVER
        : RING_SIZE_DEFAULT;
      ringSizeRef.current +=
        (targetRingSizeRef.current - ringSizeRef.current) * 0.1;

      if (ringRef.current !== null) {
        const size = ringSizeRef.current;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.transform = `translate3d(${ringPositionRef.current.x}px, ${ringPositionRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameRef.current = window.requestAnimationFrame(updateRing);
    };

    const handleMouseMove = (event: MouseEvent): void => {
      setDotPosition(event.clientX, event.clientY);

      if (!isVisibleRef.current) {
        ringPositionRef.current = {
          x: event.clientX,
          y: event.clientY,
        };
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      const element = document.elementFromPoint(event.clientX, event.clientY);
      isHoveringRef.current = isInteractiveElement(element);
    };

    const handleMouseLeave = (): void => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    animationFrameRef.current = window.requestAnimationFrame(updateRing);
    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  const visibilityClass = cn(
    "transition-opacity duration-150",
    isVisible ? "opacity-100" : "opacity-0",
  );

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[9999]",
          "rounded-full border-2 border-green-600",
          visibilityClass,
        )}
        style={{
          width: RING_SIZE_DEFAULT,
          height: RING_SIZE_DEFAULT,
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[10000]",
          "h-1.5 w-1.5 rounded-full bg-black",
          visibilityClass,
        )}
      />
    </>
  );
}
