export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return (
    <input
      className={`w-full rounded-xl bg-amber-50/70 border border-amber-200/60 px-4 py-3 text-amber-900 font-medium placeholder:text-amber-700 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-300 ${className}`}
      {...rest}
    />
  );
}
