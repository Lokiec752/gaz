import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
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
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-black mb-8 text-amber-900">Logowanie</h1>
      <Card className="w-full space-y-4">
        <Button
          variant="primary"
          type="submit"
          onClick={logIn}
          className="font-bold"
        >
          Zaloguj się z Google
        </Button>
      </Card>
    </div>
  );
}
