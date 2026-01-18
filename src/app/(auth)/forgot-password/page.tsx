import Link from "next/link";
import FormForgotPassword from "@/components/forms/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password | Boilerplate Starter",
};

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Auth
        </p>
        <h1 className="text-2xl font-bold tracking-tight">Lupa Kata Sandi</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Masukkan email Anda untuk mereset kata sandi.
        </p>
      </div>

      <FormForgotPassword />

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
