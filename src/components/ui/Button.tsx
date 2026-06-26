import Link from "next/link";

import { BUTTON_HOVER_CLASS } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "compact";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButtonProps extends ButtonBaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  type?: undefined;
  onClick?: undefined;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-green-600 text-white border border-transparent",
  secondary: "bg-white text-ink border border-border",
  ghost: "bg-transparent text-green-600 underline-offset-4",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-5 py-2.5",
  compact: "px-4 py-1.5",
};

const baseStyles = cn(
  "inline-flex items-center justify-center rounded-lg text-body-sm font-medium",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600",
  BUTTON_HOVER_CLASS,
);

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps): React.ReactElement {
  const classes = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if ("href" in props && props.href !== undefined) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick } = props as ButtonAsButtonProps;

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
