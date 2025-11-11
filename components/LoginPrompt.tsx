"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "@/hooks/use-translations";

export default function LoginPrompt({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const { t, isLoading } = useTranslations();

  return (
    // 🟢 Fixed overlay at top with scroll disabled
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 bg-black/40 backdrop-blur-sm animate-fadeIn overflow-hidden">
      <Card className="p-8 bg-white rounded-2xl shadow-2xl text-center border-4 border-orange-400 max-w-sm mx-auto">
        <h2 className="text-2xl font-extrabold text-orange-600 mb-4">
          {isLoading ? "Login to Continue" : t('loginPrompt.title')}
        </h2>
        <p className="text-gray-700 mb-6">
          {isLoading ? "You've used your 2 free generations. Login to continue creating and unlock full access!" : t('loginPrompt.description')}
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => router.push("/api/auth/login")}
            className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200"
          >
            {isLoading ? "Login Now" : t('loginPrompt.loginButton')}
          </Button>
          <Button
            variant="outline"
            className="border-orange-400 text-orange-600 hover:bg-orange-50 transition-all duration-200"
            onClick={onClose}
          >
            {isLoading ? "Maybe Later" : t('loginPrompt.laterButton')}
          </Button>
        </div>
      </Card>
    </div>
  );
}
