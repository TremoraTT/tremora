import Image from "next/image";

import { withBasePath } from "@/lib/base-path";
import {
  LOGO_ASPECT_RATIO,
  LOGO_INTRINSIC_HEIGHT,
  LOGO_INTRINSIC_WIDTH,
} from "@/lib/logo";
import { cn } from "@/lib/utils";

export const LOGO_SRC = withBasePath("/tremora-logo-transparent.png");

interface TremoraLogoProps {
  className?: string;
  /** Display height in px for nav/footer marks. Omit to size via className. */
  height?: number;
}

export function TremoraLogo({
  className,
  height,
}: TremoraLogoProps): React.ReactElement {
  return (
    <Image
      src={LOGO_SRC}
      alt=""
      width={LOGO_INTRINSIC_WIDTH}
      height={LOGO_INTRINSIC_HEIGHT}
      unoptimized
      priority
      className={cn("shrink-0 object-contain", className)}
      style={
        height !== undefined
          ? { width: Math.round(height * LOGO_ASPECT_RATIO), height }
          : { width: "auto", height: "1.18em" }
      }
    />
  );
}
