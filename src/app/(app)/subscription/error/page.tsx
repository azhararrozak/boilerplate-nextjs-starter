"use client";

import Link from "next/link";
import { XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubscriptionErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 px-6 dark:from-zinc-950 dark:via-red-950/20 dark:to-zinc-900">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-red-200 bg-white/80 p-8 text-center shadow-2xl shadow-red-500/20 backdrop-blur-xl dark:border-red-900 dark:bg-zinc-900/80">
          {/* Error Icon */}
          <div className="relative mx-auto mb-6 h-20 w-20">
            <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-red-500 to-orange-600 opacity-20" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 via-orange-600 to-red-600 shadow-lg">
              <XCircle className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-white">
            Pembayaran Gagal
          </h1>

          {/* Description */}
          <p className="mb-8 text-zinc-600 dark:text-zinc-300">
            Maaf, terjadi kesalahan saat memproses pembayaran Anda. Silakan coba
            lagi atau hubungi support jika masalah terus berlanjut.
          </p>

          {/* Error Reasons */}
          <div className="mb-8 space-y-2 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 p-6 text-left dark:from-red-950/30 dark:to-orange-950/30">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Kemungkinan penyebab:
            </p>
            <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>• Saldo tidak mencukupi</li>
              <li>• Koneksi internet terputus</li>
              <li>• Transaksi dibatalkan</li>
              <li>• Masalah teknis sementara</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60"
            >
              <Link href="/subscription">
                <RefreshCw className="mr-2 h-4 w-4" />
                Coba Lagi
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard">Kembali ke Dashboard</Link>
            </Button>
          </div>

          {/* Support */}
          <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Butuh bantuan?{" "}
            <Link
              href="/support"
              className="font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              Hubungi Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
