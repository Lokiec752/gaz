export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className = "", ...rest } = props;
  return (
    <div
      className={`bg-amber-50/70 rounded-2xl shadow-md border border-amber-100/40 p-5 ${className}`}
      {...rest}
    />
  );
}
