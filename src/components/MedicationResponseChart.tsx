"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  buildChartAriaLabel,
  buildSmoothPath,
  CHART_LAYOUT,
  curvePointsToPlotPoints,
  DEFAULT_CHART_CONFIG,
  scaleScoreToY,
  scaleTimeToX,
  type MedicationResponseChartConfig,
} from "@/lib/medication-response-curve";

interface MedicationResponseChartProps {
  config?: MedicationResponseChartConfig;
}

interface PlayheadPosition {
  x: number;
  y: number;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MedicationResponseChart({
  config = DEFAULT_CHART_CONFIG,
}: MedicationResponseChartProps): React.ReactElement {
  const pathRef = useRef<SVGPathElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [playhead, setPlayhead] = useState<PlayheadPosition | null>(null);

  const layout = CHART_LAYOUT;
  const plotWidth = layout.width - layout.marginLeft - layout.marginRight;
  const plotHeight = layout.height - layout.marginTop - layout.marginBottom;

  const plotPoints = useMemo(
    () =>
      curvePointsToPlotPoints(
        config.curvePoints,
        config.axis,
        plotWidth,
        plotHeight,
        layout.marginLeft,
        layout.marginTop,
      ),
    [config, plotHeight, plotWidth, layout.marginLeft, layout.marginTop],
  );

  const pathData = useMemo(() => buildSmoothPath(plotPoints), [plotPoints]);

  const doseMarkerX = scaleTimeToX(
    config.doseMarker.timeMinutes,
    config.axis,
    plotWidth,
    layout.marginLeft,
  );

  const xTicks = useMemo(() => {
    const ticks: number[] = [];
    for (
      let value = config.axis.xMin;
      value <= config.axis.xMax;
      value += config.xTickInterval
    ) {
      ticks.push(value);
    }
    return ticks;
  }, [config]);

  const yTicks = useMemo(() => {
    const ticks: number[] = [];
    for (
      let value = config.axis.yMin;
      value <= config.axis.yMax;
      value += config.yTickInterval
    ) {
      ticks.push(value);
    }
    return ticks;
  }, [config]);

  useEffect(() => {
    const pathElement = pathRef.current;

    if (pathElement === null) {
      return;
    }

    const pathLength = pathElement.getTotalLength();
    const endPoint = pathElement.getPointAtLength(pathLength);

    if (prefersReducedMotion()) {
      setPlayhead({ x: endPoint.x, y: endPoint.y });
      return;
    }

    let animationStart: number | null = null;

    const animate = (timestamp: number): void => {
      if (animationStart === null) {
        animationStart = timestamp;
      }

      const elapsed = timestamp - animationStart;
      const progress =
        (elapsed % config.animationDurationMs) / config.animationDurationMs;
      const point = pathElement.getPointAtLength(progress * pathLength);

      setPlayhead({ x: point.x, y: point.y });
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [config.animationDurationMs, pathData]);

  const ariaLabel = buildChartAriaLabel(config);

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      className="h-auto w-full"
      role="img"
      aria-label={ariaLabel}
    >
      <title>{ariaLabel}</title>

      {yTicks.map((tick) => {
        const y = scaleScoreToY(
          tick,
          config.axis,
          plotHeight,
          layout.marginTop,
        );

        return (
          <g key={`y-grid-${tick}`}>
            <line
              x1={layout.marginLeft}
              y1={y}
              x2={layout.width - layout.marginRight}
              y2={y}
              stroke="#E6EAE7"
              strokeWidth={1}
            />
            <text
              x={layout.marginLeft - 10}
              y={y + 4}
              textAnchor="end"
              className="fill-slate-500 text-[11px]"
            >
              {tick}
            </text>
          </g>
        );
      })}

      {xTicks.map((tick) => {
        const x = scaleTimeToX(
          tick,
          config.axis,
          plotWidth,
          layout.marginLeft,
        );

        return (
          <g key={`x-grid-${tick}`}>
            <line
              x1={x}
              y1={layout.marginTop}
              x2={x}
              y2={layout.height - layout.marginBottom}
              stroke="#E6EAE7"
              strokeWidth={1}
            />
            <text
              x={x}
              y={layout.height - layout.marginBottom + 22}
              textAnchor="middle"
              className="fill-slate-500 text-[11px]"
            >
              {tick}
            </text>
          </g>
        );
      })}

      <line
        x1={layout.marginLeft}
        y1={layout.height - layout.marginBottom}
        x2={layout.width - layout.marginRight}
        y2={layout.height - layout.marginBottom}
        stroke="#E6EAE7"
        strokeWidth={1}
      />
      <line
        x1={layout.marginLeft}
        y1={layout.marginTop}
        x2={layout.marginLeft}
        y2={layout.height - layout.marginBottom}
        stroke="#E6EAE7"
        strokeWidth={1}
      />

      <text
        x={layout.width / 2}
        y={layout.height - 8}
        textAnchor="middle"
        className="fill-slate-500 text-[12px]"
      >
        {config.axis.xAxisLabel}
      </text>

      <text
        x={16}
        y={layout.height / 2}
        textAnchor="middle"
        transform={`rotate(-90, 16, ${layout.height / 2})`}
        className="fill-slate-500 text-[12px]"
      >
        <tspan x={16} dy={config.axis.yAxisQualifier !== undefined ? "-0.6em" : "0"}>
          {config.axis.yAxisLabel}
        </tspan>
        {config.axis.yAxisQualifier !== undefined ? (
          <tspan x={16} dy="1.2em">
            ({config.axis.yAxisQualifier})
          </tspan>
        ) : null}
      </text>

      <path
        ref={pathRef}
        d={pathData}
        fill="none"
        stroke="#3DA035"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <line
        x1={doseMarkerX}
        y1={layout.marginTop}
        x2={doseMarkerX}
        y2={layout.height - layout.marginBottom}
        stroke="#E5322A"
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />

      <circle
        cx={doseMarkerX}
        cy={layout.marginTop + 8}
        r={4}
        fill="#E5322A"
      />

      <text
        x={doseMarkerX}
        y={layout.marginTop - 6}
        textAnchor="middle"
        className="fill-red-500 text-[11px]"
      >
        {config.doseMarker.label}
      </text>

      {playhead !== null ? (
        <g aria-hidden="true">
          <circle
            cx={playhead.x}
            cy={playhead.y}
            r={10}
            fill="#EEF7EC"
            opacity={0.95}
          />
          <circle cx={playhead.x} cy={playhead.y} r={5} fill="#2F8129" />
        </g>
      ) : null}
    </svg>
  );
}
