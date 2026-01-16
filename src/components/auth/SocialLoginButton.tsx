"use client";

import { useState } from "react";
import { Chrome, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type ProviderId = "google" | "github";

const providers: Array<{ id: ProviderId; label: string; Icon: typeof Chrome }> =
  [
    {
      id: "google",
      label: "Masuk dengan Google",
      Icon: Chrome,
    },
    {
      id: "github",
      label: "Masuk dengan GitHub",
      Icon: Github,
    },
  ];

export default function SocialLoginButton() {
  const [loading, setLoading] = useState<ProviderId | null>(null);

  const handleSocialLogin = async (providerId: ProviderId) => {
    setLoading(providerId);
    try {
      const { data, error } = await authClient.signIn.social({
        provider: providerId,
        callbackURL: `${window.location.origin}/dashboard`,
      });

      if (error) return;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid gap-2">
      {providers.map(({ id, label, Icon }) => (
        <Button
          key={id}
          type="button"
          variant="outline"
          className="w-full"
          disabled={!!loading}
          onClick={() => handleSocialLogin(id)}
        >
          <Icon className="mr-2 h-4 w-4" />
          {loading === id ? "Mengalihkan..." : label}
        </Button>
      ))}
    </div>
  );
}
