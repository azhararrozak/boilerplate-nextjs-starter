
export const metadata = {
  title: "Dashboard | Boilerplate Starter",
};

const stats = [
  { label: "Proyek aktif", value: "12" },
  { label: "Task selesai", value: "128" },
  { label: "Anggota tim", value: "8" },
];

const activities = [
  {
    title: "Onboarding fitur auth",
    time: "5 menit lalu",
    detail: "Menambahkan layout login & register ke App Router.",
  },
  {
    title: "Update landing",
    time: "20 menit lalu",
    detail: "Optimasi hero dan CTA menuju dashboard.",
  },
  {
    title: "Setup tema gelap",
    time: "1 jam lalu",
    detail: "Pastikan komponen tetap terbaca di mode gelap.",
  },
];

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Ikhtisar
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Selamat datang kembali
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Ringkasan cepat aktivitas dan progres terbaru.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {item.label}
            </p>
            <p className="mt-2 text-3xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Aktivitas terbaru</p>
          <span className="text-xs text-zinc-500">Realtime</span>
        </div>
        <div className="mt-4 space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="flex items-start justify-between rounded-xl border border-transparent px-3 py-2 transition hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-800 dark:hover:bg-zinc-800/60"
            >
              <div>
                <p className="text-sm font-semibold">{activity.title}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {activity.detail}
                </p>
              </div>
              <span className="text-xs text-zinc-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
