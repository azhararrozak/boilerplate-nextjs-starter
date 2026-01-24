"use client";

import Link from "next/link";
import { Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubscriptionPendingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 px-6 dark:from-zinc-950 dark:via-amber-950/20 dark:to-zinc-900">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-amber-200 bg-white/80 p-8 text-center shadow-2xl shadow-amber-500/20 backdrop-blur-xl dark:border-amber-900 dark:bg-zinc-900/80">
          {/* Pending Icon */}
          <div className="relative mx-auto mb-6 h-20 w-20">
            <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-amber-500 to-orange-600 opacity-20" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 via-yellow-600 to-orange-600 shadow-lg">
              <Clock className="h-10 w-10 animate-pulse text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-white">
            Menunggu Pembayaran
          </h1>

          {/* Description */}
          <p className="mb-8 text-zinc-600 dark:text-zinc-300">
            Pembayaran Anda sedang diproses. Proses ini biasanya memakan waktu
            beberapa menit. Silakan cek status pembayaran Anda.
          </p>

          {/* Info */}
          <div className="mb-8 space-y-3 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 p-6 text-left dark:from-amber-950/30 dark:to-yellow-950/30">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Apa yang harus dilakukan?
            </p>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-amber-600">•</span>
                <span>
                  Jika Anda belum menyelesaikan pembayaran, silakan selesaikan
                  di halaman payment gateway
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-amber-600">•</span>
                <span>
                  Jika sudah membayar, tunggu beberapa saat untuk konfirmasi
                  otomatis
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-amber-600">•</span>
                <span>Anda akan menerima notifikasi email setelah sukses</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 text-white shadow-lg shadow-amber-500/50 hover:shadow-xl hover:shadow-amber-500/60"
            >
              <Link href="/subscription">
                <RefreshCw className="mr-2 h-4 w-4" />
                Cek Status Subscription
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard">Kembali ke Dashboard</Link>
            </Button>
          </div>

          {/* Support */}
          <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Ada pertanyaan?{" "}
            <Link
              href="/support"
              className="font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
            >
              Hubungi Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
