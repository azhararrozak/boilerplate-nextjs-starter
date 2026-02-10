# 🚀 Boilerplate Next.js Starter

A production-ready **Next.js 16** boilerplate with authentication, database ORM, payment gateway, email service, admin panel, and 53+ pre-built UI components. Built to accelerate your next project development.

---

## ✨ Features Overview

| Feature            | Technology                          |
| ------------------ | ----------------------------------- |
| ⚛️ Framework       | Next.js 16 (App Router)             |
| 🔐 Authentication  | Better Auth                         |
| 🗄️ Database        | Drizzle ORM + Neon PostgreSQL       |
| 💳 Payment Gateway | Midtrans                            |
| 📧 Email Service   | Resend + React Email                |
| 🎨 UI Components   | shadcn/ui (New York style)          |
| 🎠 Styling         | Tailwind CSS v4                     |
| ✅ Validation      | Zod + React Hook Form               |
| 📊 Charts          | Recharts                            |
| 🌗 Theming         | next-themes (Dark/Light mode ready) |
| 🔔 Notifications   | Sonner Toast                        |

---

## 🔐 Authentication (Better Auth)

Sistem autentikasi lengkap yang siap pakai:

- **Email & Password** — Sign up, sign in, dengan email verification
- **Social Login (OAuth)** — GitHub & Google
- **Forgot & Reset Password** — Flow lengkap dengan email notifikasi
- **Email Verification** — Auto-send saat registrasi, expired dalam 1 jam
- **Role-Based Access** — `user` & `admin` roles dengan plugin `admin()`
- **Organization Support** — Multi-org membership dengan plugin `organization()`
- **Session Management** — Cookie-based session dengan secure token
- **Middleware Protection** — Route protection untuk `/dashboard/*` dan `/admin/*`

### Halaman Auth yang Tersedia

| Route              | Deskripsi                                     |
| ------------------ | --------------------------------------------- |
| `/login`           | Halaman login (email/password + social login) |
| `/register`        | Halaman registrasi                            |
| `/forgot-password` | Request reset password via email              |
| `/reset-password`  | Form reset password baru                      |

---

## 🗄️ Database (Drizzle ORM + Neon PostgreSQL)

Schema database yang sudah dikonfigurasi lengkap:

### Tabel Auth

- **`user`** — Data user (name, email, role, ban status)
- **`session`** — Session management dengan IP & user agent tracking
- **`account`** — OAuth account linking (multi-provider support)
- **`verification`** — Token verifikasi email

### Tabel Organization

- **`organization`** — Data organisasi (name, slug, logo)
- **`member`** — Keanggotaan organisasi dengan role
- **`invitation`** — Sistem undangan organisasi

### Tabel Subscription & Payment

- **`subscription_plan`** — Daftar paket subscription (monthly/yearly)
- **`subscription`** — Status langganan user (active/inactive/cancelled/expired)
- **`payment_transaction`** — Riwayat transaksi pembayaran via Midtrans

### Fitur Database

- ✅ Relational queries dengan Drizzle relations
- ✅ Auto-migration dengan `drizzle-kit`
- ✅ Index optimization pada foreign keys
- ✅ Cascade delete untuk data integrity
- ✅ Seed script support (`src/db/seed/`)

---

## 💳 Payment Gateway (Midtrans)

Integrasi pembayaran yang sudah siap:

- **Create Payment** — `POST /api/subscription/create`
- **Check Payment Status** — `GET /api/subscription/check-payment`
- **Payment Webhook** — `POST /api/subscription/webhook` (auto-update subscription status)
- **Subscription Status** — `GET /api/subscription/status`
- **Halaman Subscription** — UI lengkap untuk memilih paket dan pembayaran
- **Payment Status Pages** — Halaman success, pending, dan error

---

## 📧 Email Service (Resend + React Email)

Template email siap pakai dengan React Email:

- **📩 Email Verification** — Template verifikasi email saat registrasi
- **🔑 Reset Password** — Template reset password dengan link token
- Terintegrasi langsung dengan Better Auth flow
- Mudah dikustomisasi menggunakan React components

---

## 🎨 UI Components (53+ Components)

Komponen shadcn/ui (New York style) yang sudah terinstall:

<details>
<summary><strong>📋 Daftar Lengkap Komponen</strong></summary>

| Component         | Deskripsi                                                    |
| ----------------- | ------------------------------------------------------------ |
| `Accordion`       | Collapsible content panels                                   |
| `Alert`           | Status alert messages                                        |
| `Alert Dialog`    | Confirmation dialog modal                                    |
| `Aspect Ratio`    | Responsive aspect ratio container                            |
| `Avatar`          | User avatar component                                        |
| `Badge`           | Status badge labels                                          |
| `Breadcrumb`      | Navigation breadcrumb                                        |
| `Button`          | Button dengan variants (default, destructive, outline, etc.) |
| `Button Group`    | Grouped button actions                                       |
| `Calendar`        | Date picker calendar                                         |
| `Card`            | Content card container                                       |
| `Carousel`        | Embla-based image/content carousel                           |
| `Chart`           | Recharts-based chart component                               |
| `Checkbox`        | Checkbox input                                               |
| `Collapsible`     | Expandable/collapsible section                               |
| `Command`         | Command palette (cmdk)                                       |
| `Context Menu`    | Right-click context menu                                     |
| `Dialog`          | Modal dialog                                                 |
| `Drawer`          | Bottom/side drawer (vaul)                                    |
| `Dropdown Menu`   | Dropdown menu actions                                        |
| `Empty`           | Empty state placeholder                                      |
| `Field`           | Form field wrapper                                           |
| `Form`            | React Hook Form integration                                  |
| `Hover Card`      | Hover popup card                                             |
| `Input`           | Text input field                                             |
| `Input Group`     | Grouped input with prefix/suffix                             |
| `Input OTP`       | One-time password input                                      |
| `Item`            | List item component                                          |
| `Kbd`             | Keyboard shortcut display                                    |
| `Label`           | Form label                                                   |
| `Menubar`         | Application menu bar                                         |
| `Navigation Menu` | Horizontal navigation                                        |
| `Pagination`      | Page navigation                                              |
| `Popover`         | Popup overlay                                                |
| `Progress`        | Progress bar                                                 |
| `Radio Group`     | Radio button group                                           |
| `Resizable`       | Resizable panel layout                                       |
| `Scroll Area`     | Custom scrollable area                                       |
| `Select`          | Dropdown select                                              |
| `Separator`       | Visual divider                                               |
| `Sheet`           | Side panel overlay                                           |
| `Sidebar`         | Collapsible sidebar navigation                               |
| `Skeleton`        | Loading skeleton placeholder                                 |
| `Slider`          | Range slider                                                 |
| `Sonner`          | Toast notification                                           |
| `Spinner`         | Loading spinner                                              |
| `Switch`          | Toggle switch                                                |
| `Table`           | Data table                                                   |
| `Tabs`            | Tab navigation                                               |
| `Textarea`        | Multi-line text input                                        |
| `Toggle`          | Toggle button                                                |
| `Toggle Group`    | Grouped toggles                                              |
| `Tooltip`         | Hover tooltip                                                |

</details>

---

## 🏗️ Project Structure

```
boilerplate-nextjs-starter/
├── drizzle/                    # Database migrations
│   ├── *.sql                   # SQL migration files
│   └── meta/                   # Migration metadata
├── public/                     # Static assets
├── src/
│   ├── app/
│   │   ├── (app)/              # Protected app routes (requires auth)
│   │   │   ├── admin/          # Admin panel (role-gated)
│   │   │   │   ├── layout.tsx  # Admin sidebar layout
│   │   │   │   ├── page.tsx    # Admin dashboard
│   │   │   │   └── users/      # User management
│   │   │   ├── dashboard/      # User dashboard
│   │   │   │   ├── layout.tsx  # Dashboard sidebar layout
│   │   │   │   ├── page.tsx    # Dashboard home
│   │   │   │   └── subscription/ # Subscription management
│   │   │   ├── subscription/   # Subscription payment flow
│   │   │   │   ├── page.tsx    # Plan selection & payment
│   │   │   │   ├── success/    # Payment success page
│   │   │   │   ├── pending/    # Payment pending page
│   │   │   │   └── error/      # Payment error page
│   │   │   └── layout.tsx      # App-level layout
│   │   ├── (auth)/             # Auth routes (redirect if logged in)
│   │   │   ├── login/          # Login page
│   │   │   ├── register/       # Register page
│   │   │   ├── forgot-password/# Forgot password page
│   │   │   ├── reset-password/ # Reset password page
│   │   │   └── layout.tsx      # Auth layout (centered card)
│   │   ├── api/
│   │   │   ├── auth/           # Better Auth API handler
│   │   │   └── subscription/   # Subscription & payment APIs
│   │   │       ├── create/     # Create Midtrans payment
│   │   │       ├── check-payment/# Check payment status
│   │   │       ├── status/     # Get subscription status
│   │   │       └── webhook/    # Midtrans webhook handler
│   │   ├── globals.css         # Global styles & CSS variables
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── admin/              # Admin-specific components
│   │   ├── auth/               # Auth components (SignOut, SocialLogin)
│   │   ├── emails/             # React Email templates
│   │   ├── forms/              # Auth form components
│   │   └── ui/                 # 53+ shadcn/ui components
│   ├── db/
│   │   ├── index.ts            # Database connection (Neon)
│   │   ├── schema.ts           # Drizzle schema definitions
│   │   └── seed/               # Database seed scripts
│   ├── hooks/
│   │   └── use-mobile.ts       # Responsive hook
│   ├── lib/
│   │   ├── auth.ts             # Better Auth server config
│   │   ├── auth-client.ts      # Better Auth client config
│   │   └── utils.ts            # Utility functions (cn, etc.)
│   └── server/
│       └── users.ts            # Server actions (signIn, signUp)
├── middleware.ts                # Auth route protection middleware
├── drizzle.config.ts           # Drizzle Kit configuration
├── components.json             # shadcn/ui configuration
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
└── package.json                # Dependencies & scripts
```

---

## 🛡️ Middleware & Route Protection

Middleware otomatis menghandle:

- ✅ **Protected Routes** — `/dashboard/*` dan `/admin/*` memerlukan session aktif
- ✅ **Auth Redirect** — User yang sudah login otomatis diarahkan ke dashboard jika akses `/login`, `/register`, dll.
- ✅ **Guest Redirect** — User yang belum login diarahkan ke `/login` jika akses halaman protected

---

## ⚡ Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/azhararrozak/boilerplate-nextjs-starter.git
cd boilerplate-nextjs-starter
```

### 2. Install Dependencies

```bash
npm install
# atau
bun install
```

### 3. Setup Environment Variables

Salin `.env-example` ke `.env` dan isi semua variabel:

```bash
cp .env-example .env
```

```env
# Better Auth
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000

# OAuth Providers
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database (Neon PostgreSQL)
DATABASE_URL=your-neon-database-url

# Resend Email
RESEND_API_KEY=your-resend-api-key

# Midtrans Payment
MIDTRANS_SERVER_KEY=your-midtrans-server-key
MIDTRANS_CLIENT_KEY=your-midtrans-client-key
MIDTRANS_IS_PRODUCTION=false
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Setup Database

```bash
# Generate migration
npx drizzle-kit generate

# Push migration ke database
npx drizzle-kit push
```

### 5. Run Development Server

```bash
npm run dev
# atau
bun dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📦 Available Scripts

| Script                     | Deskripsi                    |
| -------------------------- | ---------------------------- |
| `npm run dev`              | Jalankan development server  |
| `npm run build`            | Build production bundle      |
| `npm run start`            | Jalankan production server   |
| `npm run lint`             | Jalankan ESLint              |
| `npx drizzle-kit generate` | Generate database migration  |
| `npx drizzle-kit push`     | Push migration ke database   |
| `npx drizzle-kit studio`   | Buka Drizzle Studio (DB GUI) |

---

## 🧰 Tech Stack Details

| Package                    | Version  | Kegunaan                       |
| -------------------------- | -------- | ------------------------------ |
| `next`                     | 16.1.1   | React framework (App Router)   |
| `react`                    | 19.2.3   | UI library                     |
| `better-auth`              | ^1.4.12  | Authentication & authorization |
| `drizzle-orm`              | ^0.45.1  | Type-safe SQL ORM              |
| `@neondatabase/serverless` | ^1.0.2   | Neon PostgreSQL driver         |
| `tailwindcss`              | v4       | Utility-first CSS              |
| `zod`                      | ^4.3.5   | Schema validation              |
| `react-hook-form`          | ^7.71.1  | Form state management          |
| `resend`                   | ^6.7.0   | Email delivery service         |
| `@react-email/components`  | ^1.0.4   | React email templates          |
| `recharts`                 | 2.15.4   | Chart & data visualization     |
| `sonner`                   | ^2.0.7   | Toast notifications            |
| `lucide-react`             | ^0.562.0 | Icon library                   |
| `next-themes`              | ^0.4.6   | Dark/light theme switcher      |
| `date-fns`                 | ^4.1.0   | Date utility library           |
| `vaul`                     | ^1.1.2   | Drawer component               |
| `cmdk`                     | ^1.1.1   | Command palette                |
| `embla-carousel-react`     | ^8.6.0   | Carousel engine                |
| `canvas-confetti`          | ^1.9.4   | Confetti animation             |

---

## 🗂️ Cara Menggunakan Boilerplate Ini

1. **Clone** repository ini sebagai base project baru
2. **Ubah** nama project di `package.json`
3. **Konfigurasi** `.env` sesuai kebutuhan project
4. **Tambah/Hapus** komponen UI sesuai kebutuhan via `npx shadcn@latest add [component]`
5. **Modifikasi** schema database di `src/db/schema.ts`
6. **Kustomisasi** halaman auth dan dashboard sesuai branding project
7. **Deploy** ke Vercel atau platform hosting lainnya

---

## 📄 License

MIT License — Bebas digunakan untuk project pribadi maupun komersial.

---

<p align="center">
  Built with ❤️ using Next.js, Better Auth, Drizzle ORM & shadcn/ui
</p>
