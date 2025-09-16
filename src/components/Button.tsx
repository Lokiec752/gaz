interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success" | "warning" | "danger";
}

const buttonVariants = {
  primary:
    "bg-[var(--button-primary)] hover:bg-[var(--button-primary-hover)] text-[var(--button-primary-foreground)]",
  success:
    "bg-[var(--button-success)] hover:bg-[var(--button-success-hover)] text-[var(--button-success-foreground)]",
  warning:
    "bg-[var(--button-warning)] hover:bg-[var(--button-warning-hover)] text-[var(--button-warning-foreground)]",
  danger:
    "bg-[var(--button-danger)] hover:bg-[var(--button-danger-hover)] text-[var(--button-danger-foreground)]",
} as const;

export function Button({
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  const variantClasses = buttonVariants[variant];

  return (
    <button
      className={`w-full py-3 rounded-xl font-semibold active:translate-y-px cursor-pointer ${variantClasses} ${className}`}
      {...rest}
    />
  );
}
