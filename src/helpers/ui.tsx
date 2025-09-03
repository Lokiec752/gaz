// helpers/ui.tsx — proste, lekkie „komponenty” bez zależności
export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className = "", ...rest } = props;
  return (
    <div className={`bg-white rounded-2xl shadow p-5 ${className}`} {...rest} />
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-semibold text-gray-700">{children}</h2>;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return (
    <input
      className={`w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...rest}
    />
  );
}

export function PrimaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { className = "", ...rest } = props;
  return (
    <button
      className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold active:translate-y-px ${className}`}
      {...rest}
    />
  );
}

export function SuccessButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { className = "", ...rest } = props;
  return (
    <button
      className={`w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold active:translate-y-px ${className}`}
      {...rest}
    />
  );
}

export function WarnButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { className = "", ...rest } = props;
  return (
    <button
      className={`w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-xl font-semibold active:translate-y-px ${className}`}
      {...rest}
    />
  );
}

export function DangerButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { className = "", ...rest } = props;
  return (
    <button
      className={`w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold active:translate-y-px ${className}`}
      {...rest}
    />
  );
}
