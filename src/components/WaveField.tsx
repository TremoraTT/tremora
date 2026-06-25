"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const DEFAULT_COLORS: string[] = [
  "#3DA035",
  "#52AE3F",
  "#6FBE52",
  "#8DCB6E",
  "#A9D88F",
  "#C4E3B0",
];

const X_STEP = 6;
const BASE_SCROLL_SPEED = 28;
const VERTICAL_INSET = 64;

interface WaveLine {
  baseY: number;
  amplitude: number;
  wavelength: number;
  lineSpeed: number;
  phase: number;
  secondaryPhase: number;
  secondaryFrequency: number;
  opacity: number;
  lineWidth: number;
  color: string;
}

export interface WaveFieldProps {
  lineCount?: number;
  speed?: number;
  opacity?: number;
  colors?: string[];
  className?: string;
}

function seededRandom(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function hexToRgba(hex: string, alpha: number): string {
  const red = Number.parseInt(hex.slice(1, 3), 16);
  const green = Number.parseInt(hex.slice(3, 5), 16);
  const blue = Number.parseInt(hex.slice(5, 7), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function getColorForDepth(depth: number, colors: string[]): string {
  const index = Math.round((1 - depth) * (colors.length - 1));
  return colors[index];
}

function createWaveLines(
  height: number,
  lineCount: number,
  colors: string[],
  opacityMultiplier: number,
): WaveLine[] {
  const lines: WaveLine[] = [];
  const drawableHeight = Math.max(height - VERTICAL_INSET * 2, 1);
  const spacing = drawableHeight / (lineCount + 1);

  for (let index = 0; index < lineCount; index += 1) {
    const depth = lineCount === 1 ? 1 : index / (lineCount - 1);

    lines.push({
      baseY: VERTICAL_INSET + spacing * (index + 1),
      amplitude: 10 + seededRandom(index * 1.17) * 18,
      wavelength: 220 + seededRandom(index * 2.41) * 280,
      lineSpeed: 0.45 + seededRandom(index * 3.83) * 0.6,
      phase: seededRandom(index * 4.29) * Math.PI * 2,
      secondaryPhase: seededRandom(index * 5.61) * Math.PI * 2,
      secondaryFrequency: 0.42 + seededRandom(index * 6.73) * 0.16,
      opacity: (0.1 + depth * 0.14) * opacityMultiplier,
      lineWidth: 0.9 + depth * 0.8,
      color: getColorForDepth(depth, colors),
    });
  }

  return lines;
}

function drawWaveField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  lines: WaveLine[],
  time: number,
  speedMultiplier: number,
): void {
  context.clearRect(0, 0, width, height);

  for (const line of lines) {
    const scrollOffset = time * line.lineSpeed * speedMultiplier * BASE_SCROLL_SPEED;
    const secondaryAmplitude = line.amplitude * 0.4;
    const secondaryDrift = time * 0.35;

    context.beginPath();

    for (let x = 0; x <= width; x += X_STEP) {
      const primary =
        line.amplitude *
        Math.sin((2 * Math.PI * (x + scrollOffset)) / line.wavelength + line.phase);

      const secondary =
        secondaryAmplitude *
        Math.sin(
          line.secondaryFrequency *
            ((2 * Math.PI * (x + scrollOffset * 0.5)) / line.wavelength) +
            line.secondaryPhase +
            secondaryDrift,
        );

      const y = line.baseY + primary + secondary;

      if (x === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }

    context.strokeStyle = hexToRgba(line.color, line.opacity);
    context.lineWidth = line.lineWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
}

export function WaveField({
  lineCount = 8,
  speed = 0.85,
  opacity = 0.75,
  colors = DEFAULT_COLORS,
  className,
}: WaveFieldProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<WaveLine[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const reducedMotionRef = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resizeCanvas = (): void => {
      const rect = container.getBoundingClientRect();
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(rect.width * devicePixelRatio);
      canvas.height = Math.floor(rect.height * devicePixelRatio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      linesRef.current = createWaveLines(
        rect.height,
        lineCount,
        colors,
        opacity,
      );

      drawWaveField(
        context,
        rect.width,
        rect.height,
        linesRef.current,
        timeRef.current,
        speed,
      );
    };

    const renderFrame = (timestamp: number): void => {
      const rect = container.getBoundingClientRect();

      if (!reducedMotionRef.current) {
        if (lastFrameTimeRef.current === 0) {
          lastFrameTimeRef.current = timestamp;
        }

        const deltaSeconds = (timestamp - lastFrameTimeRef.current) / 1000;
        lastFrameTimeRef.current = timestamp;
        timeRef.current += deltaSeconds;
      }

      drawWaveField(
        context,
        rect.width,
        rect.height,
        linesRef.current,
        timeRef.current,
        speed,
      );

      if (!reducedMotionRef.current) {
        animationFrameRef.current = window.requestAnimationFrame(renderFrame);
      }
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);

    resizeObserver.observe(container);
    resizeCanvas();

    if (reducedMotionRef.current) {
      return () => {
        resizeObserver.disconnect();
      };
    }

    animationFrameRef.current = window.requestAnimationFrame(renderFrame);

    return () => {
      resizeObserver.disconnect();

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [colors, lineCount, opacity, speed]);

  return (
    <div ref={containerRef} className={cn("pointer-events-none", className)}>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}
