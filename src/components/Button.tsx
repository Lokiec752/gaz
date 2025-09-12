interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success" | "warning" | "danger";
}

const buttonVariants = {
  primary: "bg-amber-900 hover:bg-amber-950 text-white",
  success: "bg-emerald-600 hover:bg-emerald-700 text-white",
  warning: "bg-orange-600 hover:bg-orange-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
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
