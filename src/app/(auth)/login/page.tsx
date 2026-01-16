import Link from "next/link";
import SocialLoginButton from "@/components/auth/SocialLoginButton";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Masuk | Boilerplate Starter",
};

export default async function LoginPage() {

  const session = await getSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Auth
        </p>
        <h1 className="text-2xl font-bold tracking-tight">Masuk ke akun</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Gunakan email dan kata sandi untuk melanjutkan.
        </p>
      </div>

      <div className="space-y-3">
        <SocialLoginButton />
      </div>

      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        <span>atau</span>
        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm shadow-sm transition focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
            placeholder="nama@contoh.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Kata sandi
          </label>
          <input
            type="password"
            name="password"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm shadow-sm transition focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          Masuk
        </button>
      </form>

      <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
        <span>Belum punya akun?</span>
        <Link
          href="/register"
          className="font-semibold text-zinc-900 underline underline-offset-4 transition hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
        >
          Daftar
        </Link>
      </div>
    </div>
  );
}
