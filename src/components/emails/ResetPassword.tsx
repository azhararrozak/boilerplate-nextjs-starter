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

type ResetPasswordProps = {
  username: string;
  resetUrl: string;
  userEmail: string;
};

export default function ResetPassword({
  username,
  resetUrl,
  userEmail,
}: ResetPasswordProps) {
  const previewText = `Reset password untuk akun ${username}`;
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
                Reset password
              </Text>
              <Text className="text-slate-700 leading-6">
                Halo <span className="font-medium">{userEmail}</span>, kami
                menerima permintaan untuk reset password akun <b>{username}</b>.
              </Text>

              <Text className="text-slate-700 leading-6">
                Klik tombol di bawah ini untuk membuat password baru:
              </Text>

              <Section className="my-6">
                <Button
                  href={resetUrl}
                  className="rounded-lg bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-sm text-slate-600 leading-6">
                Kalau tombol tidak berfungsi, salin tautan ini ke browser:
                <br />
                <Link
                  href={resetUrl}
                  className="break-all text-slate-900 underline"
                >
                  {resetUrl}
                </Link>
              </Text>

              <Hr className="my-6 border-slate-200" />

              <Text className="text-sm text-slate-600 leading-6">
                Jika kamu tidak meminta reset password, abaikan email ini. Demi
                keamanan, tautan ini akan kedaluwarsa.
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
