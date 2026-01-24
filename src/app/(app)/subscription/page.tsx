"use client";

import { useState, useEffect } from "react";
import { Check, Sparkles, Crown, Zap, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "monthly",
    description: "Mulai perjalanan Anda tanpa biaya",
    features: [
      "Akses dasar ke dashboard",
      "5 proyek per bulan",
      "Penyimpanan 1GB",
      "Email support",
      "Akses komunitas",
    ],
    icon: Sparkles,
    gradient: "from-zinc-500 to-zinc-700",
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 50000,
    interval: "monthly",
    description: "Fitur lengkap untuk produktivitas maksimal",
    features: [
      "Akses penuh ke semua fitur",
      "Unlimited proyek",
      "Penyimpanan 100GB",
      "Priority support 24/7",
      "Advanced analytics",
      "API access",
      "Custom branding",
      "Team collaboration",
    ],
    icon: Crown,
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    popular: true,
  },
];

interface SubscriptionStatus {
  hasSubscription: boolean;
  subscription: {
    status: string;
    planId: string;
    endDate: string | null;
    isActive: boolean;
    isExpired: boolean;
  } | null;
  plan: {
    id: string;
    name: string;
  } | null;
}

export default function SubscriptionPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus | null>(null);

  // Fetch current subscription status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("/api/subscription/status");
        if (response.ok) {
          const data = await response.json();

          // If user doesn't have any subscription, create free subscription
          if (!data.hasSubscription) {
            try {
              const createResponse = await fetch("/api/subscription/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ planId: "free" }),
              });

              if (createResponse.ok) {
                // Refresh status after creating free subscription
                const refreshResponse = await fetch("/api/subscription/status");
                if (refreshResponse.ok) {
                  const refreshedData = await refreshResponse.json();
                  setSubscriptionStatus(refreshedData);
                }
              }
            } catch (error) {
              console.error("Failed to create free subscription:", error);
            }
          } else {
            setSubscriptionStatus(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch subscription status:", error);
      }
    };

    fetchStatus();
  }, []);

  const handleSubscribe = async (planId: string) => {
    // Check if user already has active premium subscription
    if (
      subscriptionStatus?.hasSubscription &&
      subscriptionStatus.subscription?.isActive &&
      subscriptionStatus.plan?.id === "premium" &&
      planId === "premium"
    ) {
      toast.error("Anda sudah memiliki subscription Premium yang masih aktif");
      return;
    }

    if (planId === "free") {
      toast.info("Anda sudah menggunakan plan Free");
      return;
    }

    setLoading(planId);

    try {
      const response = await fetch("/api/subscription/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create subscription");
      }

      // Redirect to Midtrans payment page with orderId
      if (data.redirectUrl) {
        // Store orderId for later use
        if (data.orderId) {
          sessionStorage.setItem("lastOrderId", data.orderId);
        }
        window.location.href = data.redirectUrl;
      } else if (data.token) {
        // Alternative: Use Snap popup if available
        // @ts-expect-error - Midtrans Snap library loaded externally
        if (window.snap) {
          // @ts-expect-error - Midtrans Snap library loaded externally
          window.snap.pay(data.token);
        }
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error(
        error instanceof Error ? error.message : "Gagal membuat subscription",
      );
    } finally {
      setLoading(null);
    }
  };

  // Check if user can subscribe to a plan
  const canSubscribe = (planId: string) => {
    // Free plan is always disabled (users get it by default)
    if (planId === "free") return false;

    // If has active premium, can't buy premium again
    if (
      planId === "premium" &&
      subscriptionStatus?.subscription?.isActive &&
      subscriptionStatus?.plan?.id === "premium"
    ) {
      return false;
    }

    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-black dark:via-zinc-950 dark:to-zinc-900">
      {/* Header Section */}
      <div className="relative overflow-hidden border-b border-zinc-200 bg-white/50 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-indigo-500/5" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
              <Zap className="h-4 w-4" />
              Tingkatkan Pengalaman Anda
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
              Pilih Plan yang{" "}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Tepat
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              Mulai gratis atau tingkatkan ke Premium untuk fitur yang lebih
              powerful
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan =
              subscriptionStatus?.plan?.id === plan.id &&
              subscriptionStatus?.subscription?.isActive;
            const isFreeDisabled = plan.id === "free" && !canSubscribe(plan.id);
            const isPremiumDisabled =
              plan.id === "premium" && !canSubscribe(plan.id);

            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                  plan.popular
                    ? "border-violet-500 shadow-xl shadow-violet-500/20 dark:border-violet-600 dark:shadow-violet-600/20"
                    : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-xs font-bold text-white shadow-lg">
                    PALING POPULER
                  </div>
                )}

                {/* Current Plan Badge */}
                {(isCurrentPlan || isFreeDisabled) && (
                  <div className="absolute left-4 top-4 z-10">
                    <Badge className="bg-green-500 text-white">
                      {isFreeDisabled ? "Plan Default" : "Plan Aktif"}
                    </Badge>
                  </div>
                )}

                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 transition-opacity duration-300 hover:opacity-5`}
                />

                <CardHeader className="relative space-y-4 pb-8">
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.gradient} shadow-lg`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="mt-2 text-base">
                      {plan.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
                      {plan.price === 0
                        ? "Gratis"
                        : `Rp ${(plan.price / 1000).toFixed(0)}k`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        /bulan
                      </span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="relative space-y-6 pb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700" />
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${plan.gradient}`}
                        >
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="relative flex-col gap-3">
                  {/* Info for Free Plan */}
                  {isFreeDisabled && (
                    <div className="flex w-full items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-left dark:border-blue-900 dark:bg-blue-950/30">
                      <Info className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        Ini adalah plan default untuk semua user
                      </p>
                    </div>
                  )}

                  {/* Info for Premium if already subscribed */}
                  {isPremiumDisabled && (
                    <div className="flex w-full items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-left dark:border-amber-900 dark:bg-amber-950/30">
                      <Info className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                      <p className="text-xs text-amber-700 dark:text-amber-300">
                        Anda sudah memiliki subscription Premium yang aktif
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={
                      loading === plan.id || isPremiumDisabled || isFreeDisabled
                    }
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-violet-500/50 hover:shadow-xl hover:shadow-violet-500/60"
                        : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200"
                    } h-12 text-base font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading === plan.id ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Processing...
                      </div>
                    ) : isPremiumDisabled ? (
                      "Sudah Berlangganan"
                    ) : isFreeDisabled ? (
                      "Plan Default"
                    ) : isCurrentPlan ? (
                      "Plan Saat Ini"
                    ) : plan.id === "free" ? (
                      "Mulai Gratis"
                    ) : (
                      "Upgrade Sekarang"
                    )}
                  </Button>

                  {isCurrentPlan &&
                    subscriptionStatus?.subscription?.endDate && (
                      <Link
                        href="/dashboard/subscription"
                        className="w-full text-center text-sm text-violet-600 hover:underline dark:text-violet-400"
                      >
                        Lihat Detail Subscription →
                      </Link>
                    )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-zinc-200 bg-white/50 px-8 py-6 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Check className="h-4 w-4 text-green-500" />
              Pembayaran aman dengan Midtrans
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Check className="h-4 w-4 text-green-500" />
              Cancel kapan saja
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Check className="h-4 w-4 text-green-500" />
              Garansi 7 hari uang kembali
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
