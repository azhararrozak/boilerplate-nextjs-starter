import type { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Pengecekan session - jika sudah login, redirect berdasarkan role
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    // Redirect berdasarkan role user
    const userRole = session.user.role;
    if (userRole === "admin") {
      redirect("/admin");
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.05),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(0,0,0,0.04),transparent_30%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.04),transparent_30%)]" />
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white/90 p-8 shadow-xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
          {children}
        </div>
      </main>
    </div>
  );
}
