import Link from "next/link";

const features = [
  {
    title: "App Router siap pakai",
    description: "Struktur terpisah untuk halaman publik, auth, dan dashboard.",
  },
  {
    title: "UI berbasis Tailwind",
    description:
      "Kelas utilitas ringan dengan komponen siap pakai di folder components/ui.",
  },
  {
    title: "Siap dikembangkan",
    description: "Mulai kembangkan fitur Anda tanpa pusing setup awal.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black">
      <header className="flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black">
            B
          </span>
          <span>Boilerplate Starter</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-zinc-900 px-4 py-2 text-white shadow-sm transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
          >
            Daftar
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 py-12 md:py-20">
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm dark:bg-zinc-100 dark:text-black">
              Next.js 15 App Router
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Pondasi cepat untuk produk Anda.
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300">
              Landing page, alur otentikasi, dan dashboard sudah dipisah rapi.
              Tinggal lanjutkan pengembangan sesuai kebutuhan bisnis Anda.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-900/10 transition hover:-translate-y-0.5 hover:bg-zinc-700 dark:bg-zinc-50 dark:text-black dark:shadow-zinc-900/30 dark:hover:bg-zinc-200"
              >
                Lihat Dashboard
              </Link>
              <Link
                href="/register"
                className="rounded-full px-5 py-3 text-sm font-semibold text-zinc-800 underline underline-offset-4 transition hover:text-zinc-500 dark:text-zinc-200 dark:hover:text-zinc-400"
              >
                Mulai Gratis
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
                🚀 Deploy cepat
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
                🔒 Siap auth
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
                📦 Modular
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-white to-zinc-50 opacity-80 dark:from-zinc-800/50 dark:via-zinc-900 dark:to-black" />
            <div className="relative grid gap-4 text-sm">
              <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                <p className="text-xs font-semibold text-zinc-500">Grouping</p>
                <pre className="mt-2 overflow-x-auto rounded-md bg-zinc-900 p-3 text-xs text-zinc-100 shadow-inner">{`src/app/
├─ (marketing)/page.tsx
├─ (auth)/layout.tsx
│  ├─ login/page.tsx
│  └─ register/page.tsx
└─ (dashboard)/layout.tsx
   └─ dashboard/page.tsx`}</pre>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                <p className="text-xs font-semibold text-zinc-500">
                  Siap dikembangkan
                </p>
                <p className="mt-2 text-zinc-700 dark:text-zinc-200">
                  Gunakan folder components/ui untuk membangun form login,
                  tabel, atau grafik sesuai kebutuhan produk Anda.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                {feature.description}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
