import BottomNavbar from "@/components/bottom-navbar";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-white">
      {/* Mobile-First Container - Centered on Desktop */}
      <div className="mx-auto max-w-[430px] min-h-screen bg-white shadow-2xl">
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-br from-rose-100 via-pink-50 to-white"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmYjdxODUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4UzAgOC4wNiAwIDE4czguMDYgMTggMTggMThjNC45NyAwIDkuNDgtMiAxMi43My01LjIzQzMzLjk3IDI3LjQ4IDM2IDIzLjAzIDM2IDE4eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

          <div className="relative text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500 text-white mb-4 shadow-lg shadow-rose-500/30 animate-pulse">
              <Heart size={32} fill="currentColor" />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-rose-600 font-medium tracking-wider uppercase">
                The Wedding Of
              </p>
              <h1 className="text-5xl font-serif font-bold text-rose-900 tracking-tight">
                Bride & Groom
              </h1>
              <div className="flex items-center justify-center gap-3 text-rose-700">
                <div className="h-px w-12 bg-rose-300"></div>
                <Heart
                  size={16}
                  fill="currentColor"
                  className="text-rose-400"
                />
                <div className="h-px w-12 bg-rose-300"></div>
              </div>
            </div>

            <p className="text-lg text-rose-800 font-medium">
              28 Februari 2026
            </p>

            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-rose-100">
              <span className="text-sm text-rose-700">🎉</span>
              <span className="text-sm font-medium text-rose-900">
                Save The Date
              </span>
            </div>
          </div>
        </section>

        {/* Mempelai Section */}
        <section id="mempelai" className="min-h-screen px-6 py-16 bg-white">
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-rose-900 mb-2">
                Mempelai
              </h2>
              <p className="text-rose-600 text-sm">Kedua Mempelai</p>
            </div>

            {/* Bride */}
            <div className="space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-rose-200 to-pink-300 shadow-xl flex items-center justify-center">
                <span className="text-4xl">👰</span>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-rose-900">
                  Nama Mempelai Wanita
                </h3>
                <p className="text-rose-700 mt-2">
                  Putri dari Bapak ... & Ibu ...
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-rose-200"></div>
              <Heart size={20} className="text-rose-400" fill="currentColor" />
              <div className="h-px w-16 bg-rose-200"></div>
            </div>

            {/* Groom */}
            <div className="space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-rose-200 to-pink-300 shadow-xl flex items-center justify-center">
                <span className="text-4xl">🤵</span>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-rose-900">
                  Nama Mempelai Pria
                </h3>
                <p className="text-rose-700 mt-2">
                  Putra dari Bapak ... & Ibu ...
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Acara Section */}
        <section
          id="acara"
          className="min-h-screen px-6 py-16 bg-gradient-to-b from-rose-50 to-white"
        >
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-rose-900 mb-2">
                Acara
              </h2>
              <p className="text-rose-600 text-sm">Waktu & Tempat</p>
            </div>

            {/* Akad */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-rose-100">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 mb-4">
                <span className="text-2xl">📿</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-rose-900 mb-3">
                Akad Nikah
              </h3>
              <div className="space-y-2 text-rose-700">
                <p className="font-medium">Jumat, 28 Februari 2026</p>
                <p>08:00 - 10:00 WIB</p>
                <p className="text-sm mt-4">
                  Gedung Serba Guna
                  <br />
                  Jl. Contoh No. 123, Jakarta
                </p>
              </div>
            </div>

            {/* Resepsi */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-rose-100">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 mb-4">
                <span className="text-2xl">🎊</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-rose-900 mb-3">
                Resepsi
              </h3>
              <div className="space-y-2 text-rose-700">
                <p className="font-medium">Jumat, 28 Februari 2026</p>
                <p>11:00 - 14:00 WIB</p>
                <p className="text-sm mt-4">
                  Gedung Serba Guna
                  <br />
                  Jl. Contoh No. 123, Jakarta
                </p>
              </div>
            </div>

            <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-6 rounded-full shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-105">
              📍 Lihat Lokasi di Maps
            </button>
          </div>
        </section>

        {/* RSVP Section */}
        <section id="rsvp" className="min-h-screen px-6 py-16 bg-white">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-rose-900 mb-2">
                RSVP
              </h2>
              <p className="text-rose-600 text-sm">Konfirmasi Kehadiran</p>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
              <p className="text-rose-800 text-center mb-6">
                Mohon konfirmasi kehadiran Anda di hari bahagia kami
              </p>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                />

                <select className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all text-rose-900">
                  <option>Apakah Anda akan hadir?</option>
                  <option>Ya, saya akan hadir</option>
                  <option>Maaf, saya tidak bisa hadir</option>
                </select>

                <input
                  type="number"
                  placeholder="Jumlah Tamu"
                  min="1"
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                />

                <textarea
                  placeholder="Ucapan & Doa"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all resize-none"
                ></textarea>

                <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-6 rounded-full shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-105">
                  Kirim Konfirmasi
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Extra padding for bottom navbar */}
        <div className="h-32"></div>

        {/* Bottom Navbar */}
        <BottomNavbar />
      </div>
    </div>
  );
}
