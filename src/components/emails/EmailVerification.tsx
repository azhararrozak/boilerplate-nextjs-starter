import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type EmailVerificationProps = {
  username: string;
  verifyUrl: string;
  userEmail: string;
};

export default function EmailVerification({
  username,
  verifyUrl,
  userEmail,
}: EmailVerificationProps) {
  const previewText = `Verifikasi email untuk akun ${username}`;
  const supportEmail = "support@example.com";
  const appName = "Your App";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Tailwind>
        <Body className="bg-slate-50 font-sans">
          <Container className="mx-auto my-8 w-full max-w-xl rounded-xl bg-white p-0 shadow">
            <Section className="px-8 pt-6">
              <Text className="text-2xl font-semibold text-slate-900">
                Verifikasi email kamu
              </Text>

              <Text className="text-slate-700 leading-6">
                Halo <span className="font-medium">{userEmail}</span>, terima
                kasih sudah mendaftar di <b>{appName}</b>.
              </Text>

              <Text className="text-slate-700 leading-6">
                Untuk mengaktifkan akun <b>{username}</b>, silakan verifikasi
                email kamu dengan klik tombol di bawah ini:
              </Text>

              <Section className="my-6">
                <Button
                  href={verifyUrl}
                  className="rounded-lg bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white"
                >
                  Verifikasi Email
                </Button>
              </Section>

              <Text className="text-sm text-slate-600 leading-6">
                Kalau tombol tidak berfungsi, salin tautan ini ke browser:
                <br />
                <Link
                  href={verifyUrl}
                  className="break-all text-slate-900 underline"
                >
                  {verifyUrl}
                </Link>
              </Text>

              <Hr className="my-6 border-slate-200" />

              <Text className="text-sm text-slate-600 leading-6">
                Jika kamu tidak membuat akun, abaikan email ini. Demi keamanan,
                tautan verifikasi ini akan kedaluwarsa.
              </Text>

              <Text className="text-sm text-slate-600 leading-6">
                Butuh bantuan? Hubungi{" "}
                <Link href={`mailto:${supportEmail}`} className="underline">
                  {supportEmail}
                </Link>
                .
              </Text>

              <Text className="pb-8 text-xs text-slate-500">
                © {new Date().getFullYear()} {appName}. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
