import { TremoraLogo } from "@/components/layout/TremoraLogo";
import { cn } from "@/lib/utils";

interface TremoraWordmarkProps {
  as?: "h1" | "span";
  className?: string;
}

export function TremoraWordmark({
  as: Component = "span",
  className,
}: TremoraWordmarkProps): React.ReactElement {
  return (
    <Component
      {...(Component === "h1" ? { "aria-label": "Tremora" } : {})}
      className={cn(
        "inline-flex items-end font-heading font-semibold leading-none tracking-tight text-ink",
        className,
      )}
    >
      <TremoraLogo className="relative mr-[-0.08em] h-[1.18em] w-auto shrink-0 -translate-y-[0.05em]" />
      <span className="leading-none">remora</span>
    </Component>
  );
}
