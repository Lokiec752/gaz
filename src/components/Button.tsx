interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success" | "warning" | "danger";
}

const buttonVariants = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  success: "bg-green-500 hover:bg-green-600 text-white",
  warning: "bg-yellow-400 hover:bg-yellow-500 text-black",
  danger: "bg-red-500 hover:bg-red-600 text-white",
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
