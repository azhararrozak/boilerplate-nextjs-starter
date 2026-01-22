import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Admin Overview | Boilerplate Starter",
};

const AdminPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session == null) return redirect("/login");

  // Cek apakah user adalah admin
  if (session.user.role !== "admin") {
    return redirect("/dashboard");
  }

  // Ambil data users untuk statistik
  const users = await auth.api.listUsers({
    headers: await headers(),
    query: {
      limit: 100,
      sortBy: "createdAt",
      //sortOrder: "desc",
    },
  });

  const totalUsers = users.users?.length || 0;
  const adminCount = users.users?.filter((u) => u.role === "admin").length || 0;
  const regularUserCount = totalUsers - adminCount;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Admin Panel
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Overview & Statistics
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Ringkasan sistem dan aktivitas pengguna
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalUsers}</div>
            <p className="text-xs text-zinc-500 mt-1">
              Semua pengguna terdaftar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{adminCount}</div>
            <p className="text-xs text-zinc-500 mt-1">Administrator aktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Regular Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{regularUserCount}</div>
            <p className="text-xs text-zinc-500 mt-1">Pengguna biasa</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Aktivitas terbaru akan ditampilkan di sini
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
