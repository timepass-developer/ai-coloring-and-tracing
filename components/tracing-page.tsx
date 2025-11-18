"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Download, Printer, Mic, BookOpen } from "lucide-react";
import TracingCanvas from "@/components/tracing-canvas";
import { downloadTracingTemplate, printImage, downloadImage } from "@/lib/download-utils";
import AuthGate from "@/components/auth-gate";
import { useAuthGate } from "@/hooks/use-auth-gate";
import { useUserDataCollection } from "@/hooks/use-user-data-collection";
import { getTracingPrompts, getLetterPrompts } from "@/lib/prompts-complete";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  hasReachedGuestLimit,
  incrementGuestGenerations,
  resetGuestGenerations,
} from "@/lib/usage-tracker";
import LoginPrompt from "@/components/LoginPrompt";
import { useTranslations } from "@/hooks/use-translations";
import { createTracingDataUrl } from "@/lib/tracing-renderer";

const SUGGESTED_PROMPTS = getTracingPrompts();
const LETTER_PROMPTS = getLetterPrompts(8);

interface TracingContent {
  type: "letter" | "number" | "word";
  content: string;
  style: "uppercase" | "lowercase" | "cursive";
  description: string;
  imageUrl?: string;
  imagePrompt?: string;
  originalPrompt?: string;
}

export default function TracingPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tracingContent, setTracingContent] = useState<TracingContent | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [blurred, setBlurred] = useState(false);

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

  // ✅ Disable scrolling when the login popup is open
  useEffect(() => {
    if (showLoginPrompt) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showLoginPrompt]);

  useEffect(() => {
    if (isAuthenticated) resetGuestGenerations();
  }, [isAuthenticated]);

  const generateTracing = async (inputPrompt: string) => {
    if (!inputPrompt.trim()) return;

    // 🧠 Guest Limit Check
    if (!isAuthenticated && hasReachedGuestLimit()) {
      setShowLoginPrompt(true);
      setBlurred(true);
      return;
    }

    if (!isAuthenticated) incrementGuestGenerations();

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-tracing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputPrompt }),
      });

      if (!response.ok) throw new Error("Failed to generate tracing content");

      const data = await response.json();
      setTracingContent({
        type: data.type,
        content: data.content,
        style: data.style,
        description: data.description,
        imageUrl: data.imageUrl,
        imagePrompt: data.imagePrompt,
        originalPrompt: data.originalPrompt ?? inputPrompt,
      });
      trackActivity("generate_tracing", inputPrompt);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate tracing content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateTracing(prompt);
  };

  const handleSuggestedPrompt = (suggestedPrompt: string) => {
    setPrompt(suggestedPrompt);
    generateTracing(suggestedPrompt);
  };

  const handleDownload = () => {
    if (!tracingContent) return;
    executeWithAuth(
      () => {
        // If we have a real image URL (not placeholder), use it directly
        if (
          tracingContent.imageUrl &&
          !tracingContent.imageUrl.includes("/placeholder.svg") &&
          (tracingContent.imageUrl.startsWith("data:") || 
           tracingContent.imageUrl.startsWith("http://") ||
           tracingContent.imageUrl.startsWith("https://"))
        ) {
          downloadImage(
            tracingContent.imageUrl,
            `tracing-${tracingContent.content.toLowerCase()}.png`
          );
        } else {
          // Fall back to canvas-based download
          downloadTracingTemplate(
            tracingContent.content,
            `tracing-${tracingContent.content.toLowerCase()}.png`
          );
        }
        trackActivity("download_tracing", tracingContent.description);
      },
      "download",
      `Tracing Worksheet: ${tracingContent.description}`
    );
  };

  const handlePrint = () => {
    if (!tracingContent) return;
    executeWithAuth(
      () => {
        // If we have a real image URL (not placeholder), use it directly
        if (
          tracingContent.imageUrl &&
          !tracingContent.imageUrl.includes("/placeholder.svg") &&
          (tracingContent.imageUrl.startsWith("data:") || 
           tracingContent.imageUrl.startsWith("http://") ||
           tracingContent.imageUrl.startsWith("https://"))
        ) {
          printImage(tracingContent.imageUrl, tracingContent.description);
        } else {
          // Fall back to canvas-based print
          const dataUrl = createTracingDataUrl(tracingContent.content);
          printImage(dataUrl, tracingContent.description);
        }
        trackActivity("print_tracing", tracingContent.description);
      },
      "print",
      `Tracing Worksheet: ${tracingContent.description}`
    );
  };

  return (
    <>
      {/* 🟠 Login Popup — fixed at top & disables scrolling */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-10">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          {/* Popup content */}
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

      {/* 🟡 Main Content (blurs when popup active) */}
      <div
        className={`relative flex flex-col items-center justify-start min-h-screen w-full px-4 py-8 sm:py-12 bg-gradient-to-b from-yellow-50 to-white transition-all duration-500 ${
          blurred ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="w-full max-w-3xl space-y-8 flex flex-col items-center text-center">
          <AuthGate
            isOpen={isAuthGateOpen}
            onClose={closeAuthGate}
            onSuccess={handleAuthSuccess}
            actionType={actionType}
            contentTitle={contentTitle}
          />

          {/* 🟡 No Tracing Yet */}
          {!tracingContent && (
            <>
              <Card className="w-full sm:w-[90%] p-6 bg-yellow-400/20 border-yellow-300 rounded-2xl shadow-lg text-center">
                <h3 className="text-2xl font-extrabold text-orange-800 mb-4 flex items-center justify-center gap-2">
                  <BookOpen className="w-6 h-6 text-orange-500" />
                  How to Use?
                </h3>
                <ul className="space-y-3 text-gray-700 text-base sm:text-lg">
                  <li>✏️ Type your prompt below</li>
                  <li>📚 Use ready-made tracing ideas</li>
                  <li>⬇️ Download or print the generated image</li>
                </ul>
              </Card>

              <h2 className="text-3xl font-bold text-orange-600 animate-bounce-gentle px-4">
                Generate your tracing worksheet! ✨
              </h2>
            </>
          )}

          {/* 🖼 Generated Image */}
          {tracingContent && (
            <Card className="w-full sm:w-[90%] p-6 bg-white border-4 border-orange-300 shadow-xl rounded-2xl overflow-hidden flex flex-col items-center">
              <h3 className="text-lg sm:text-xl font-semibold text-orange-700 mb-4 leading-snug px-2">
                {tracingContent.description}
              </h3>

              <div className="flex justify-center w-full overflow-x-auto mb-4">
                <div className="max-w-full w-full">
                  <TracingCanvas 
                    content={tracingContent.content} 
                    imageUrl={tracingContent.imageUrl}
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 w-full">
              <Button
                onClick={handleDownload}
                className="flex items-center justify-center min-w-[130px] bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Download className="w-4 h-4 mr-2" />
                {isLoading ? "Download" : t('tracing.download')}
              </Button>
              <Button
                onClick={handlePrint}
                className="flex items-center justify-center min-w-[130px] bg-green-500 text-white rounded-full hover:bg-green-600 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Printer className="w-4 h-4 mr-2" />
                {isLoading ? "Print" : t('tracing.print')}
              </Button>
              </div>
            </Card>
          )}

          {/* 🧠 Input */}
          <form onSubmit={handleSubmit} className="w-full sm:w-[90%] max-w-2xl">
            <div className="flex items-center bg-white rounded-full p-2 shadow-lg border border-orange-300 hover:shadow-xl transition duration-200">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={isLoading ? "Trace the letter A in uppercase..." : t('tracing.placeholder')}
                className="flex-1 border-none bg-transparent text-lg px-4 focus-visible:ring-0 placeholder:text-gray-500"
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
            <Card className="p-8 bg-yellow-100 border-yellow-300 shadow-md rounded-2xl text-center animate-pulse">
              <Loader2 className="w-8 h-8 animate-spin text-orange-600 mx-auto mb-2" />
              <p className="text-gray-700">{isLoading ? "Creating your tracing activity..." : t('tracing.generatingMessage')}</p>
            </Card>
          )}

          {/* 💡 Suggested Prompts */}
          {!isGenerating && (
            <div className="w-full sm:w-[90%] space-y-8">
              <div>
                <h3 className="text-xl font-bold text-orange-700 text-center mb-4">
                  ✏️ {isLoading ? "Tracing Practice Ideas" : t('tracing.tracingPractice')}
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

              <div>
                <h3 className="text-xl font-bold text-orange-700 text-center mb-4">
                  🔤 {isLoading ? "Letter Learning Fun" : t('tracing.letterLearning')}
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {LETTER_PROMPTS.map((p, i) => (
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
      </div>
    </>
  );
}
