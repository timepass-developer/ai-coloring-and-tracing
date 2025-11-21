"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Download, Printer, Mic, Sparkles } from "lucide-react";
import { downloadImage, printImage } from "@/lib/download-utils";
import AuthGate from "@/components/auth-gate";
import { useAuthGate } from "@/hooks/use-auth-gate";
import { useUserDataCollection } from "@/hooks/use-user-data-collection";
import { getColoringPrompts, getFlashcardPrompts } from "@/lib/prompts-complete";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  hasReachedGuestLimit,
  incrementGuestGenerations,
  resetGuestGenerations,
} from "@/lib/usage-tracker";
import LoginPrompt from "@/components/LoginPrompt";
import { useTranslations } from "@/hooks/use-translations";

const SUGGESTED_PROMPTS = getColoringPrompts();
const FLASHCARD_PROMPTS = getFlashcardPrompts(8);

// --- Convert ANY image into perfect A4 (2480×3508 px) ---
async function convertToA4(imageUrl: string) {
  return new Promise<string>((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const A4_WIDTH = 2480;  // pixels
      const A4_HEIGHT = 3508; // pixels

      const canvas = document.createElement("canvas");
      canvas.width = A4_WIDTH;
      canvas.height = A4_HEIGHT;

      const ctx = canvas.getContext("2d")!;

      // Fill white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, A4_WIDTH, A4_HEIGHT);

      // Scale the image to fit A4 while keeping aspect ratio
      const scale = Math.min(A4_WIDTH / img.width, A4_HEIGHT / img.height);

      const newWidth = img.width * scale;
      const newHeight = img.height * scale;

      // Center the image on the page
      const offsetX = (A4_WIDTH - newWidth) / 2;
      const offsetY = (A4_HEIGHT - newHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

      resolve(canvas.toDataURL("image/jpeg", 0.98));
    };

    img.src = imageUrl;
  });
}


export default function ColoringPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [blurred, setBlurred] = useState(false);

  const router = useRouter();
  const { isAuthenticated } = useKindeBrowserClient();
  const { t, isLoading } = useTranslations();
  const {
    isAuthGateOpen,
    closeAuthGate,
    executeWithAuth,
    handleAuthSuccess,
    actionType,
    contentTitle,
  } = useAuthGate();
  const { trackActivity } = useUserDataCollection();

  // ✅ Disable scrolling when popup is open
  useEffect(() => {
    if (showLoginPrompt) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = ""; // re-enable scroll
    }
  }, [showLoginPrompt]);

  // ✅ Fetch user and handle guest reset
  useEffect(() => {
    if (isAuthenticated) resetGuestGenerations();

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me");
        const data = await res.json();
        if (data) {
          setUser(data);
          if (data?.newsletterSubscribed) setNewsletterSubscribed(true);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  // ✅ Generate image logic
  const generateColoring = async (inputPrompt: string) => {
    if (!inputPrompt.trim()) return;

    // 🧠 Guest limit check
    if (!isAuthenticated && hasReachedGuestLimit()) {
      setShowLoginPrompt(true);
      setBlurred(true);
      return;
    }

    if (!isAuthenticated) incrementGuestGenerations();

    setIsGenerating(true);
    setCurrentPrompt(inputPrompt);

    try {
      const response = await fetch("/api/generate-coloring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputPrompt }),
      });

      const data = await response.json();
      if (response.status === 403) {
        setShowUpgradePopup(true);
        setIsGenerating(false);
        return;
      }

      if (!response.ok || !data.success)
        throw new Error(data.error || "Failed to generate coloring page");

      setGeneratedImage(
        data.imageUrl ||
          `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(inputPrompt)}`
      );
      trackActivity("generate_coloring", inputPrompt);

      if (!newsletterSubscribed)
        setTimeout(() => setShowNewsletterPopup(true), 1200);
    } catch (error) {
      console.error("Error generating coloring page:", error);
      toast.error("Failed to generate coloring page. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateColoring(prompt);
  };

  const handleSuggestedPrompt = (suggestedPrompt: string) => {
    setPrompt(suggestedPrompt);
    generateColoring(suggestedPrompt);
  };

  const handleDownload = async() => {
    if (generatedImage && currentPrompt) {
      const a4Image = await convertToA4(generatedImage);  // Convert the generated image to A4 format
      executeWithAuth(() => {
        downloadImage(
          a4Image,
          `coloring-${currentPrompt.replace(/\s+/g, "-").toLowerCase()}.jpg`
        );
        trackActivity("download_coloring", currentPrompt);
      }, "download", `Coloring Page: ${currentPrompt}`);
    }
  };

  const handlePrint = async() => {
    if (generatedImage && currentPrompt) {
      const a4Image = await convertToA4(generatedImage);  // Convert the generated image to A4 format
      executeWithAuth(() => {
        printImage(a4Image, `Coloring Page: ${currentPrompt}`);
        trackActivity("print_coloring", currentPrompt);
      }, "print", `Coloring Page: ${currentPrompt}`);
    }
  };

  const handleNewsletterSubscribe = async () => {
    if (!user?.email) {
      toast.error("Please log in to subscribe.");
      return;
    }

    try {
      const res = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      if (res.ok) {
        toast.success("Subscribed successfully!");
        setNewsletterSubscribed(true);
        setShowNewsletterPopup(false);
        router.push("/parenting-newsletter");
      } else toast.error("Subscription failed");
    } catch {
      toast.error("Error subscribing to newsletter");
    }
  };

  return (
    <>
      {/* 🟠 Login Popup — fixed at top & disables scroll */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-10">
          {/* Dim background */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          {/* Popup container */}
          <div className="relative z-10 w-full max-w-md mx-auto">
            <LoginPrompt
              onClose={() => {
                setShowLoginPrompt(false);
                setBlurred(false);
              }}
            />
          </div>
        </div>
      )}

      {/* 🟡 Main Page (can blur when login prompt open) */}
      <div
        className={`relative flex flex-col items-center justify-start w-full min-h-[80vh] max-w-5xl mx-auto space-y-6 px-4 sm:px-6 md:px-8 lg:px-12 transition-all duration-500 ${
          blurred ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <AuthGate
          isOpen={isAuthGateOpen}
          onClose={closeAuthGate}
          onSuccess={handleAuthSuccess}
          actionType={actionType}
          contentTitle={contentTitle}
        />

        {/* 🟡 Upgrade Popup */}
        {showUpgradePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fadeIn">
            <Card className="p-8 bg-yellow-400 text-orange-800 shadow-2xl max-w-lg text-center border-4 border-orange-500">
              <h2 className="text-2xl font-extrabold mb-4">{isLoading ? "Free Limit Reached" : t('coloring.limitReached')}</h2>
              <p className="mb-6 text-gray-800">
                {isLoading ? "You've used all 5 free generations. Upgrade to Premium for unlimited access!" : t('coloring.upgradeMessage')}
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  onClick={() => setShowUpgradePopup(false)}
                  variant="outline"
                  className="bg-white text-gray-800"
                >
                  {isLoading ? "Cancel" : t('common.cancel')}
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => router.push("/membership")}
                >
                  {isLoading ? "Upgrade Now" : t('membership.upgradeNow')}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* 🟢 Newsletter Popup */}
        <Dialog open={showNewsletterPopup} onOpenChange={setShowNewsletterPopup}>
          <DialogContent className="max-w-lg text-center bg-yellow-400 text-orange-800 rounded-2xl border-4 border-orange-500">
            <DialogHeader>
              <DialogTitle className="text-2xl font-extrabold">
                Join Our Parenting Newsletter
              </DialogTitle>
            </DialogHeader>
            <p className="mb-6 text-gray-800">
              Get weekly parenting tips, learning ideas, and fun activities straight to your inbox!
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleNewsletterSubscribe}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Subscribe Now
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowNewsletterPopup(false)}
                className="bg-white text-gray-800"
              >
                Maybe Later
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* 🟣 Info Section */}
        {!generatedImage && (
          <div className="flex flex-col items-center text-center w-full">
            <Card className="p-6 bg-yellow-400/20 border-yellow-300 rounded-2xl shadow-lg w-full max-w-xl">
              <h3 className="text-2xl font-extrabold text-orange-800 mb-4 flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-orange-500" />
                How to Use?
              </h3>
              <ul className="space-y-3 text-gray-700 text-left sm:text-center">
                <li>✏️ Type your prompt below</li>
                <li>📚 Use ready-made coloring ideas</li>
              </ul>
            </Card>

            <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mt-6 animate-bounce-gentle">
              Want to do coloring? Start doing it 🎨
            </h2>
          </div>
        )}

        {/* 🖼 Generated Image */}
        {generatedImage && (
          <Card className="p-6 bg-white border-orange-200 shadow-xl rounded-2xl w-full max-w-2xl mx-auto">
            <div className="text-center mb-4">
              <img
                src={generatedImage || "/placeholder.svg"}
                alt={`Coloring page: ${currentPrompt}`}
                className="w-full max-w-[500px] h-auto object-contain rounded-lg border-2 border-orange-500 shadow-md mx-auto"
              />
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                onClick={handleDownload}
                className="bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Download className="w-4 h-4 mr-2" />
                {isLoading ? "Download" : t('coloring.download')}
              </Button>
              <Button
                onClick={handlePrint}
                className="bg-green-500 text-white rounded-full hover:bg-green-600 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Printer className="w-4 h-4 mr-2" />
                {isLoading ? "Print" : t('coloring.print')}
              </Button>
            </div>
          </Card>
        )}

        {/* ✍️ Input */}
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-2xl mx-auto flex justify-center"
        >
          <div className="flex items-center bg-white rounded-full p-2 shadow-lg border border-orange-300 hover:shadow-xl transition duration-200 w-full">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={isLoading ? "A butterfly on a flower..." : t('coloring.placeholder')}
              className="flex-1 border-none bg-transparent text-base sm:text-lg px-4 focus-visible:ring-0 placeholder:text-gray-500"
              disabled={isGenerating}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="rounded-full text-orange-500 hover:bg-orange-100 transition"
            >
              <Mic className="w-5 h-5" />
            </Button>
          </div>
        </form>

        {/* ⏳ Loading */}
        {isGenerating && (
          <Card className="p-8 bg-yellow-100 border-yellow-300 shadow-md rounded-2xl text-center animate-pulse w-full max-w-xl">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600 mx-auto mb-2" />
            <p className="text-gray-700">{isLoading ? "Creating your magical coloring page..." : t('coloring.generatingMessage')}</p>
          </Card>
        )}

        {/* 💡 Suggested Prompts */}
        {!isGenerating && (
          <div className="space-y-10 w-full max-w-4xl">
            <div className="text-center">
              <h3 className="text-xl font-bold text-orange-700 mb-4">
                🎨 {isLoading ? "Coloring Ideas" : t('coloring.coloringIdeas')}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {SUGGESTED_PROMPTS.map((p, i) => (
                  <Button
                    key={i}
                    onClick={() => handleSuggestedPrompt(p)}
                    className="h-9 px-4 py-2 rounded-full text-sm bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 border border-orange-600 shadow-sm hover:shadow-md transition-all duration-200 animate-float"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-orange-700 mb-4">
                📚 {isLoading ? "Learning Cards" : t('coloring.learningCards')}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {FLASHCARD_PROMPTS.map((p, i) => (
                  <Button
                    key={i}
                    onClick={() => handleSuggestedPrompt(p)}
                    className="h-9 px-4 py-2 rounded-full text-sm bg-yellow-400 text-gray-800 hover:bg-yellow-500 hover:scale-105 border border-yellow-500 shadow-sm hover:shadow-md transition-all duration-200 animate-float"
                    style={{
                      animationDelay: `${(i + SUGGESTED_PROMPTS.length) * 0.1}s`,
                    }}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
