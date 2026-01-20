import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAMES = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
  "__Host-better-auth.session_token",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ambil session token sesuai cookie di screenshot
  const sessionToken = SESSION_COOKIE_NAMES.map(
    (name) => request.cookies.get(name)?.value,
  ).find(Boolean);

  const authPages = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  const isAuthPage = authPages.includes(pathname);

  const isProtectedPage =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  // Jika user sudah login dan akses halaman auth -> lempar ke dashboard
  // Note: Di sini kita tidak bisa cek role karena middleware tidak bisa query DB
  // Redirect default ke dashboard, nanti di auth layout akan redirect lagi berdasarkan role
  if (sessionToken && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Jika user belum login dan akses halaman protected -> lempar ke login
  if (!sessionToken && isProtectedPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin",
    "/admin/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
