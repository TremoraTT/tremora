import Image from "next/image";

import tremoraLogo from "../../../public/tremora-logo-transparent.png";
import { cn } from "@/lib/utils";

export const LOGO_SRC = tremoraLogo.src;
export const LOGO_INTRINSIC_WIDTH = 1185;
export const LOGO_INTRINSIC_HEIGHT = 1971;
export const LOGO_ASPECT_RATIO = LOGO_INTRINSIC_WIDTH / LOGO_INTRINSIC_HEIGHT;

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
      src={tremoraLogo}
      alt=""
      width={LOGO_INTRINSIC_WIDTH}
      height={LOGO_INTRINSIC_HEIGHT}
      className={cn("shrink-0 object-contain", className)}
      style={
        height !== undefined
          ? { width: Math.round(height * LOGO_ASPECT_RATIO), height }
          : { width: "auto", height: "1.18em" }
      }
      priority
    />
  );
}
