import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "User Detail | Admin",
};

interface UserDetailPageProps {
  params: Promise<{
    userId: string;
  }>;
}

const UserDetailPage = async ({ params }: UserDetailPageProps) => {
  const { userId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session == null) return redirect("/login");

  // Cek apakah user adalah admin
  if (session.user.role !== "admin") {
    return redirect("/dashboard");
  }

  // Get all users and find the specific one
  const users = await auth.api.listUsers({
    headers: await headers(),
    query: {
      limit: 100,
    },
  });

  const user = users.users?.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/users">
            <Button variant="outline">← Back</Button>
          </Link>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-zinc-500">User not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/users">
          <Button variant="outline">← Back to Users</Button>
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Informasi lengkap pengguna
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary text-3xl font-semibold">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-zinc-500">{user.email}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 pt-4 border-t">
            <div>
              <p className="text-sm font-medium text-zinc-500">User ID</p>
              <p className="mt-1 font-mono text-sm">{user.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Role</p>
              <div className="mt-1">
                <Badge
                  variant={user.role === "admin" ? "default" : "secondary"}
                >
                  {user.role || "user"}
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Created At</p>
              <p className="mt-1">{formatDate(user.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Updated At</p>
              <p className="mt-1">{formatDate(user.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Riwayat aktivitas pengguna akan ditampilkan di sini
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailPage;
