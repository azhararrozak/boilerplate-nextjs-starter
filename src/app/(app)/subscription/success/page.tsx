"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { useSearchParams } from "next/navigation";

export default function SubscriptionSuccessPage() {
  const searchParams = useSearchParams();
  const [checking, setChecking] = useState(true);
  const [status, setStatus] = useState<"success" | "pending" | "failed">(
    "pending",
  );

  useEffect(() => {
    // Check payment status from URL params or sessionStorage
    let orderId = searchParams.get("order_id");

    // Fallback to sessionStorage if not in URL
    if (!orderId && typeof window !== "undefined") {
      orderId = sessionStorage.getItem("lastOrderId");
    }

    const checkPayment = async () => {
      if (!orderId) {
        // No order_id, assume success (direct navigation)
        setChecking(false);
        setStatus("success");
        return;
      }

      try {
        const response = await fetch(
          `/api/subscription/check-payment?orderId=${orderId}`,
        );
        const data = await response.json();

        if (response.ok && data.subscriptionStatus === "active") {
          setStatus("success");
          // Clear sessionStorage after successful check
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("lastOrderId");
          }
        } else {
          setStatus("pending");
        }
      } catch (error) {
        console.error("Error checking payment:", error);
        setStatus("pending");
      } finally {
        setChecking(false);
      }
    };

    checkPayment();
  }, [searchParams]);

  useEffect(() => {
    // Trigger confetti animation only on success
    if (status !== "success") return;

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, [status]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 px-6 dark:from-zinc-950 dark:via-violet-950/20 dark:to-zinc-900">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-violet-200 bg-white/80 p-8 text-center shadow-2xl shadow-violet-500/20 backdrop-blur-xl dark:border-violet-900 dark:bg-zinc-900/80">
            <div className="relative mx-auto mb-6 h-20 w-20">
              <Loader2 className="h-20 w-20 animate-spin text-violet-600" />
            </div>
            <h1 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-white">
              Mengecek Status Pembayaran...
            </h1>
            <p className="text-zinc-600 dark:text-zinc-300">
              Mohon tunggu sebentar
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 px-6 dark:from-zinc-950 dark:via-violet-950/20 dark:to-zinc-900">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-violet-200 bg-white/80 p-8 text-center shadow-2xl shadow-violet-500/20 backdrop-blur-xl dark:border-violet-900 dark:bg-zinc-900/80">
          {/* Success Icon */}
          <div className="relative mx-auto mb-6 h-20 w-20">
            <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-violet-500 to-purple-600 opacity-20" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 shadow-lg">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-white">
            Pembayaran Berhasil!
          </h1>

          {/* Description */}
          <p className="mb-8 text-zinc-600 dark:text-zinc-300">
            Selamat! Subscription Premium Anda telah aktif. Nikmati semua fitur
            premium yang tersedia.
          </p>

          {/* Features Highlight */}
          <div className="mb-8 space-y-3 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 p-6 dark:from-violet-950/30 dark:to-purple-950/30">
            <div className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <Sparkles className="h-5 w-5 text-violet-600" />
              <span>Akses penuh ke semua fitur</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span>Priority support 24/7</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <span>Advanced analytics & insights</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-violet-500/50 hover:shadow-xl hover:shadow-violet-500/60"
            >
              <Link href="/dashboard">Ke Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/subscription">Kembali ke Subscription</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
