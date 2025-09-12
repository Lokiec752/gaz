import "./globals.css";
import Link from "next/link";
import { Home, PlusCircle } from "lucide-react";
import AuthProvider from "@/components/AuthProvider";
import LoginButton from "@/components/LoginButton";

export const metadata = {
  title: "Gaz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <AuthProvider>
          {/* Mobile container (na desktopie centrowany, max szerokość jak na makiecie) */}
          <div className="min-h-dvh max-w-md mx-auto px-4 pt-4 pb-24">
            {children}
          </div>

          {/* Bottom nav jak na mockupie */}
          <nav className="fixed inset-x-0 bottom-0 bg-amber-100/80 border-t border-amber-200/50">
            <div className="mx-auto max-w-md px-8">
              <ul className="grid grid-cols-3 h-14 items-center text-amber-800">
                <li className="justify-self-start">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full"
                    aria-label="Dashboard"
                  >
                    <Home className="w-6 h-6 text-amber-800" />
                  </Link>
                </li>
                <li className="justify-self-center">
                  <Link
                    href="/add"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full"
                    aria-label="Dodaj"
                  >
                    <PlusCircle className="w-8 h-8 text-amber-800" />
                  </Link>
                </li>
                <li className="justify-self-end">
                  <LoginButton />
                </li>
              </ul>
            </div>
          </nav>
        </AuthProvider>
      </body>
    </html>
  );
}
