"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Crown,
  Gift,
  Heart,
  Check,
  HelpCircle,
  Sparkles,
  Package,
} from "lucide-react";
import MobileHeader from "@/components/mobile-header";
import MobileSidebar from "@/components/mobile-sidebar";
import { useTranslations } from "@/hooks/use-translations";

export default function MembershipPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("FREE");
  const [isLoading, setIsLoading] = useState(true);
  const { t, isLoading: isLoadingTranslations } = useTranslations();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // -------------------------
  // Fetch user plan
  // -------------------------
  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const res = await fetch("/api/user/me");

        if (res.status === 401) {
          setSelectedPlan("FREE");
          setIsLoading(false);
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        if (data.plan) setSelectedPlan(data.plan.toUpperCase());
      } catch (err) {
        console.error("Error fetching user plan:", err);
        setSelectedPlan("FREE");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPlan();
  }, []);

  const handlePlanSelection = async (planName: string) => {
    if (planName.toUpperCase() === selectedPlan) {
      alert(
        isLoadingTranslations
          ? `You're already on the ${planName} plan!`
          : t("membership.alreadyOn").replace("{plan}", planName)
      );
      return;
    }

    try {
      setLoadingPlan(planName);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planName.toLowerCase() }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(t("membership.checkoutFailed"));
    } catch (error) {
      console.error("Checkout error:", error);
      alert(t("membership.checkoutError"));
    } finally {
      setLoadingPlan(null);
    }
  };

  const currency = "$";

  // -------------------------
  // ⭐ Updated Plans
  // -------------------------
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "lifetime",
      description: "Perfect for trying out Kiwiz",
      features: [
        "5 generations total",
        "Basic coloring pages",
        "Standard tracing sheets",
        "Community support",
      ],
      popular: false,
    },

    {
      name: "Premium",
      price: "9.99",
      period: "month",
      description: "Best for regular Kiwiz creators",
      features: [
        "Unlimited generations",
        "Premium content library",
        "Advanced tracing tools",
        "Priority support",
      ],
      popular: true,
    },

    // ⭐ New: Custom Activity Pack (no overflow)
    {
      name: "Custom",
      price: "9.50 per pack",
      period: "month",
      description: "Get custom plans the way you need.",
      features: [
        "Order custom premium packs",
        "Choose your own quantity",
        "Personalized matching your needs",
        "Great for large sets",
      ],
      popular: false,
      icon: Package,
    }

  ];

  const faqs = [
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit and debit cards via Stripe.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, your subscription stays active until the end of the billing cycle.",
    },
    {
      q: "Do you offer refunds?",
      a: "We do not offer partial refunds, but you can cancel anytime.",
    },
    {
      q: "Is my payment secure?",
      a: "All payments are processed through Stripe. We never store your card details.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <MobileHeader onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="membership"
      />

      <div className="pt-16">
        <div className="container max-w-5xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Crown className="h-12 w-12 text-orange-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-orange-800 mb-3">
              Choose Your Kiwiz Plan
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Unlock magical printable experiences for your home, classroom, or
              therapy practice.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => {
              const isCurrent = selectedPlan === plan.name.toUpperCase();

              return (
                <Card
                  key={index}
                  className={`relative bg-yellow-50 border border-orange-200 transition-all duration-300
                    ${
                      isCurrent
                        ? "border-2 border-orange-500 shadow-lg scale-[1.03]"
                        : "hover:shadow-lg hover:scale-[1.02]"
                    }
                    `}
                >
                  {isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-md">
                        <Sparkles className="h-3 w-3" />
                        Active Plan
                      </div>
                    </div>
                  )}

                  {plan.popular && !isCurrent && (
                    <div className="absolute -top-3 right-3">
                      <div className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold text-orange-800">
                      {plan.name}
                    </CardTitle>

                    <div className="mt-2 text-orange-600 text-3xl font-extrabold break-words">
                      {currency}
                      {plan.price}
                    </div>
                    <span className="text-gray-600 text-sm">/{plan.period}</span>

                    <CardDescription className="mt-2 text-gray-700">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-800">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        isCurrent
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-orange-500 hover:bg-orange-600 text-white"
                      }`}
                      disabled={isCurrent || loadingPlan === plan.name}
                      onClick={() => handlePlanSelection(plan.name)}
                    >
                      {isCurrent
                        ? "Current Plan"
                        : loadingPlan === plan.name
                        ? "Redirecting..."
                        : "Choose Plan"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Why Choose Premium */}
          <Card className="mb-12 bg-yellow-100 border border-yellow-300 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Gift className="h-5 w-5 text-yellow-500" />
                Why Choose Premium?
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-orange-800">
                    For Parents
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" /> Unlimited
                      creativity
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" /> Premium content
                      library
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" /> Save time with
                      instant generation
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-orange-800">
                    For Children
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-green-500" /> Endless fun
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-green-500" /> Age-friendly
                      creativity tools
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-green-500" /> Build motor
                      skills
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="mb-10 bg-yellow-50 border border-orange-200 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <HelpCircle className="h-5 w-5 text-yellow-500" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-yellow-200 pb-4">
                    <h3 className="font-semibold text-lg text-orange-800 mb-1">
                      {faq.q}
                    </h3>
                    <p className="text-gray-700 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
