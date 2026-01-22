import Link from "next/link";
import type { ReactNode } from "react";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // Cek apakah user adalah admin
  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white dark:bg-red-500">
              A
            </span>
            <span>Admin Panel</span>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link
              href="/"
              className="transition hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              Beranda
            </Link>
            <SignOutButton />
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-6 py-10 md:flex-row">
        <aside className="hidden w-64 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:block">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Admin Menu
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <Link
              href="/admin"
              className="block rounded-lg px-3 py-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              📊 Overview
            </Link>
            <Link
              href="/admin/users"
              className="block rounded-lg px-3 py-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              👥 User Management
            </Link>
          </div>
        </aside>

        <section className="flex-1 space-y-6">{children}</section>
      </main>
    </>
  );
}
