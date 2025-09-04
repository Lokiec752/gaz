"use client";
import { User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function LoginButton() {
  const { data: session } = useSession();

  const logOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  if (!session) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full"
        aria-label="Profil"
      >
        <User className="w-6 h-6 cursor-pointer" />
      </Link>
    );
  }
  return (
    <button className="inline-flex items-center justify-center w-10 h-10 rounded-full">
      <LogOut className="w-6 h-6 cursor-pointer" onClick={logOut} />
    </button>
  );
}
