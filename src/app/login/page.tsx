import { Card, PrimaryButton } from "@/helpers/ui";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

async function logIn() {
  "use server";
  await signIn();
}

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/dashboard");
  return (
    <div className="h-full flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Logowanie</h1>
      <Card className="w-full space-y-3">
        <PrimaryButton type="submit" onClick={logIn}>
          Zaloguj się z Google
        </PrimaryButton>
      </Card>
    </div>
  );
}
