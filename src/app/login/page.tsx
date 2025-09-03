import { Card, Input, PrimaryButton } from "@/helpers/ui";

export default function LoginPage() {
  return (
    <div className="h-full flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Logowanie</h1>
      <Card className="w-full space-y-3">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Hasło" />
        <PrimaryButton type="submit">Zaloguj się</PrimaryButton>
      </Card>
    </div>
  );
}
