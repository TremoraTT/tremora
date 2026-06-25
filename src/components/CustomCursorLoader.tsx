"use client";

import dynamic from "next/dynamic";

export const CustomCursorLoader = dynamic(
  () =>
    import("@/components/CustomCursor").then((module) => module.CustomCursor),
  { ssr: false },
);
