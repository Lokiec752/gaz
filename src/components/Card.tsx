export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className = "", ...rest } = props;
  return (
    <div className={`bg-white rounded-2xl shadow p-5 ${className}`} {...rest} />
  );
}
