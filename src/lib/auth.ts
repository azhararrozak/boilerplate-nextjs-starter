import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { headers } from "next/headers";

import { db } from "@/db";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import ResetPasswordEmail from "@/components/emails/ResetPassword";
import VerifyEmail from "@/components/emails/EmailVerification";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL as string,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  pages: {
    signIn: "/login",
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url }) => {
      resend.emails.send({
        from: "azhararrozak@satudev.id",
        to: user.email,
        subject: "Reset your password",
        react: ResetPasswordEmail({
          username: user.name,
          resetUrl: url,
          userEmail: user.email,
        }),
      });
    },
    onPasswordReset: async ({ user }) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      resend.emails.send({
        from: "azhararrozak@satudev.id",
        to: user.email,
        subject: "Verify your email address",
        react: VerifyEmail({
          username: user.name,
          verifyUrl: url,
          userEmail: user.email,
        }),
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});

export const getSession = async () =>
  auth.api.getSession({
    headers: await headers(),
  });
