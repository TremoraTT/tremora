import { cn } from "@/lib/utils";

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "header" | "footer";
}

export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps): React.ReactElement {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[var(--width-container)] px-6 md:px-8 lg:px-10",
        className,
      )}
    >
      {children}
    </Component>
  );
}
