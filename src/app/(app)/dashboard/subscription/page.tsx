import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { subscription, subscriptionPlan } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { format } from "date-fns";
import {
  Crown,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardSubscriptionPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  // Get user's active subscription
  const userSubscriptions = await db
    .select({
      subscription: subscription,
      plan: subscriptionPlan,
    })
    .from(subscription)
    .innerJoin(subscriptionPlan, eq(subscription.planId, subscriptionPlan.id))
    .where(eq(subscription.userId, session.user.id))
    .orderBy(desc(subscription.createdAt))
    .limit(1);

  const currentSubscription = userSubscriptions[0];
  const isActive = currentSubscription?.subscription.status === "active";
  const isPremium = currentSubscription?.plan.id === "premium";
  const isFree = currentSubscription?.plan.id === "free";

  // Check if subscription is expired
  const isExpired =
    currentSubscription?.subscription.endDate &&
    new Date(currentSubscription.subscription.endDate) < new Date();

  // Status badge
  const getStatusBadge = () => {
    if (!currentSubscription) {
      return <Badge variant="outline">Tidak ada subscription</Badge>;
    }

    if (isExpired) {
      return <Badge variant="destructive">Expired</Badge>;
    }

    switch (currentSubscription.subscription.status) {
      case "active":
        return <Badge className="bg-green-500">Aktif</Badge>;
      case "inactive":
        return <Badge variant="secondary">Tidak Aktif</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Dibatalkan</Badge>;
      default:
        return (
          <Badge variant="outline">
            {currentSubscription.subscription.status}
          </Badge>
        );
    }
  };

  const features = currentSubscription?.plan.features
    ? JSON.parse(currentSubscription.plan.features)
    : [];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Subscription Saya</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Kelola subscription dan lihat status langganan Anda
        </p>
      </div>

      {/* Current Subscription Status */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {isPremium ? (
                  <>
                    <Crown className="h-5 w-5 text-violet-600" />
                    {currentSubscription?.plan.name}
                  </>
                ) : (
                  <>
                    {currentSubscription?.plan.name || "Tidak ada subscription"}
                  </>
                )}
              </CardTitle>
              <CardDescription className="mt-1">
                Status subscription Anda saat ini
              </CardDescription>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Subscription Info */}
          {currentSubscription ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <Calendar className="h-4 w-4" />
                    <span>Harga</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {parseInt(currentSubscription.plan.price) === 0
                      ? "Gratis"
                      : `Rp ${(parseInt(currentSubscription.plan.price) / 1000).toFixed(0)}k`}
                    {parseInt(currentSubscription.plan.price) > 0 && (
                      <span className="text-sm font-normal text-zinc-500">
                        /bulan
                      </span>
                    )}
                  </p>
                </div>

                {currentSubscription.subscription.endDate && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                      <Calendar className="h-4 w-4" />
                      <span>Berakhir Pada</span>
                    </div>
                    <p className="text-lg font-semibold">
                      {format(
                        new Date(currentSubscription.subscription.endDate),
                        "dd MMMM yyyy",
                      )}
                    </p>
                    {!isExpired && (
                      <p className="text-sm text-zinc-500">
                        {Math.ceil(
                          (new Date(
                            currentSubscription.subscription.endDate,
                          ).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        hari lagi
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Status Messages */}
              {isExpired && (
                <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
                  <XCircle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                  <div>
                    <p className="font-semibold text-red-900 dark:text-red-100">
                      Subscription Anda telah berakhir
                    </p>
                    <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                      Perpanjang sekarang untuk terus menikmati fitur premium
                    </p>
                  </div>
                </div>
              )}

              {isActive && !isExpired && isPremium && (
                <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
                  <CheckCircle className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-100">
                      Subscription Aktif
                    </p>
                    <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                      Anda memiliki akses penuh ke semua fitur premium
                    </p>
                  </div>
                </div>
              )}

              {/* Features List */}
              <div className="space-y-3">
                <h4 className="font-semibold">Fitur yang Tersedia:</h4>
                <div className="grid gap-2">
                  {features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-semibold text-amber-900 dark:text-amber-100">
                  Belum Ada Subscription
                </p>
                <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                  Pilih plan yang sesuai dengan kebutuhan Anda
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            {(!currentSubscription ||
              isExpired ||
              currentSubscription.subscription.status !== "active" ||
              isFree) && (
              <Button
                asChild
                className="bg-gradient-to-r from-violet-600 to-purple-600"
              >
                <Link href="/subscription">
                  {isFree ? "Upgrade ke Premium" : "Lihat Paket Subscription"}
                </Link>
              </Button>
            )}

            {isActive && isPremium && !isExpired && (
              <Button variant="outline" asChild>
                <Link href="/subscription">Lihat Paket Lainnya</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Subscription</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">📌 Perpanjangan Otomatis</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Subscription saat ini tidak diperpanjang otomatis. Anda perlu
              melakukan pembayaran manual sebelum masa berlangganan habis.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">💳 Metode Pembayaran</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Pembayaran menggunakan Midtrans dengan berbagai pilihan metode:
              Credit Card, Virtual Account, E-Wallet, dan lainnya.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">🔒 Keamanan</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Semua transaksi dilindungi dengan enkripsi SSL dan diproses
              melalui payment gateway yang tersertifikasi PCI-DSS.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
