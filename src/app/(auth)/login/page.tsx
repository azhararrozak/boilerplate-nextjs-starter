import Link from "next/link";
import SocialLoginButton from "@/components/auth/SocialLoginButton";
import FormSignIn from "@/components/auth/FormSignIn";

export const metadata = {
  title: "Masuk | Boilerplate Starter",
};

export default function LoginPage() {
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

      <FormSignIn />

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
