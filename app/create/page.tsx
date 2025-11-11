"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ColoringPage from "@/components/coloring-page";
import TracingPage from "@/components/tracing-page";
import MobileHeader from "@/components/mobile-header";
import MobileSidebar from "@/components/mobile-sidebar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Lock } from "lucide-react";

type AppMode = "coloring" | "tracing";

function AppPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [mode, setMode] = useState<AppMode>("coloring");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [guestUsageCount, setGuestUsageCount] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false);

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "tracing" || modeParam === "coloring") {
      setMode(modeParam as AppMode);
    }
  }, [searchParams]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // ✅ Fetch user info once
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          localStorage.removeItem("guest_usage_count");
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // ✅ Load guest usage count
  useEffect(() => {
    const count = parseInt(localStorage.getItem("guest_usage_count") || "0", 10);
    setGuestUsageCount(count);
  }, []);

  // ✅ Guest usage handler
  const handleGuestUsage = () => {
    if (user) return true;
    if (isFrozen) return false;

    const count = guestUsageCount + 1;
    localStorage.setItem("guest_usage_count", count.toString());
    setGuestUsageCount(count);

    if (count > 2) {
      setIsFrozen(true);
      setShowLoginPopup(true);
      return false;
    }

    return true;
  };

  const handleUpgradePrompt = () => setShowUpgradePopup(true);
  const handleLoginPrompt = () => {
    setIsFrozen(true);
    setShowLoginPopup(true);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fffbea 0%, #ffe4b5 40%, #ffd580 70%, #ffcf6b 100%)",
      }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.8) 1px, transparent 0)",
          backgroundSize: "50px 50px",
        }}
      />

      <MobileHeader onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="app"
      />

      {/* 🔒 Freeze Overlay */}
      {isFrozen && (
        <div className="absolute inset-0 z-40 backdrop-blur-[3px] bg-black/30 pointer-events-auto" />
      )}

      {/* ✅ Login Popup (simplified for stability) */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Dialog open={showLoginPopup} onOpenChange={setShowLoginPopup}>
            <DialogContent className="max-w-md text-center bg-yellow-50 border-2 border-yellow-400 rounded-2xl shadow-2xl backdrop-blur-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-orange-700 flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5 text-orange-600" />
                  Sign in to Continue
                </DialogTitle>
              </DialogHeader>
              <p className="text-gray-700 mb-6 leading-relaxed">
                You’ve reached your free guest limit (2 uses). Log in to
                generate more beautiful images every day!
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => router.push("/api/auth/login")}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => {
                    setShowLoginPopup(false);
                    setIsFrozen(false);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-full"
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Upgrade Popup */}
      <Dialog open={showUpgradePopup} onOpenChange={setShowUpgradePopup}>
        <DialogContent className="max-w-md text-center bg-yellow-100 border border-yellow-400 rounded-xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-orange-600">
              Free Limit Reached
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-700 mb-4">
            You’ve reached your daily limit of 5 free generations. Upgrade to
            <span className="font-semibold text-orange-700"> Premium </span> for unlimited fun!
          </p>
          <Button
            onClick={() => router.push("/membership")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Upgrade Now
          </Button>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <main
        className={`relative z-10 container mx-auto px-4 py-6 pt-24 max-w-3xl md:max-w-4xl lg:max-w-5xl transition-all duration-300 ${
          isFrozen ? "pointer-events-none opacity-50 blur-[2px]" : ""
        }`}
      >
        {/* Header Tabs */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <Button
            onClick={() => !isFrozen && setMode("coloring")}
            className={`px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold md:font-bold text-base md:text-lg transition-all duration-300 transform ${
              mode === "coloring"
                ? "bg-primary text-primary-foreground shadow-lg scale-105 animate-pulse-glow"
                : "bg-card text-card-foreground hover:bg-primary/10 hover:scale-102"
            }`}
          >
            Coloring
          </Button>
          <Button
            onClick={() => !isFrozen && setMode("tracing")}
            className={`px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold md:font-bold text-base md:text-lg transition-all duration-300 transform ${
              mode === "tracing"
                ? "bg-secondary text-secondary-foreground shadow-lg scale-105 animate-pulse-glow"
                : "bg-card text-card-foreground hover:bg-secondary/10 hover:scale-102"
            }`}
          >
            Tracing
          </Button>
        </div>

        {/* Page Content */}
        <div className="animate-in fade-in-50 duration-500 w-full">
          {mode === "coloring" ? (
            <ColoringPage
              user={user}
              onLoginPrompt={handleLoginPrompt}
              onUpgradePrompt={handleUpgradePrompt}
              onGuestUsage={handleGuestUsage}
              isDisabled={isFrozen}
            />
          ) : (
            <TracingPage
              user={user}
              onLoginPrompt={handleLoginPrompt}
              onUpgradePrompt={handleUpgradePrompt}
              onGuestUsage={handleGuestUsage}
              isDisabled={isFrozen}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default function AppPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AppPageContent />
    </Suspense>
  );
}
