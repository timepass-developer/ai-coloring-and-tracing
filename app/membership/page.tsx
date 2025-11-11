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
  Star,
  Gift,
  Heart,
  Check,
  HelpCircle,
  Sparkles,
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

  // 🔹 Fetch current user plan
  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const res = await fetch("/api/user/me");
        
        // If user is not authenticated (401), keep default FREE plan
        if (res.status === 401) {
          setSelectedPlan("FREE");
          setIsLoading(false);
          return;
        }
        
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        
        const data = await res.json();
        if (data.plan) {
          setSelectedPlan(data.plan.toUpperCase());
        }
      } catch (err) {
        console.error("Error fetching user plan:", err);
        // Default to FREE plan on error
        setSelectedPlan("FREE");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPlan();
  }, []);

  const handlePlanSelection = async (planName: string) => {
    if (planName.toUpperCase() === selectedPlan) {
      alert(isLoadingTranslations ? `You're already on the ${planName} plan!` : t('membership.alreadyOn').replace('{plan}', planName));
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
      else alert(isLoadingTranslations ? "Something went wrong starting checkout." : t('membership.checkoutFailed'));
    } catch (error) {
      console.error("Checkout error:", error);
      alert(isLoadingTranslations ? "Failed to start checkout. Please try again." : t('membership.checkoutError'));
    } finally {
      setLoadingPlan(null);
    }
  };

  // Get currency symbol for current locale
  const currency = isLoadingTranslations ? "$" : t('membership.currency');

  const plans = [
    {
      name: isLoadingTranslations ? "Free" : t('membership.plans.free.name'),
      price: t('membership.plans.free.price'),
      period: isLoadingTranslations ? "lifetime" : t('membership.plans.free.period'),
      description: isLoadingTranslations ? "Perfect for trying out Kiwiz" : t('membership.plans.free.description'),
      features: isLoadingTranslations ? [
        "5 generations total (lifetime)",
        "Basic coloring pages",
        "Standard tracing",
        "Community support",
      ] : [
        t('membership.plans.free.feature1'),
        t('membership.plans.free.feature2'),
        t('membership.plans.free.feature3'),
        t('membership.plans.free.feature4'),
      ],
      popular: false,
    },
    {
      name: isLoadingTranslations ? "Premium" : t('membership.plans.premium.name'),
      price: t('membership.plans.premium.price'),
      period: isLoadingTranslations ? "month" : t('membership.plans.premium.period'),
      description: isLoadingTranslations ? "Best for regular users" : t('membership.plans.premium.description'),
      features: isLoadingTranslations ? [
        "Unlimited generations",
        "Premium content",
        "Advanced tools",
        "Priority support",
      ] : [
        t('membership.plans.premium.feature1'),
        t('membership.plans.premium.feature2'),
        t('membership.plans.premium.feature3'),
        t('membership.plans.premium.feature4'),
      ],
      popular: true,
    },
    {
      name: isLoadingTranslations ? "Family" : t('membership.plans.family.name'),
      price: t('membership.plans.family.price'),
      period: isLoadingTranslations ? "month" : t('membership.plans.family.period'),
      description: isLoadingTranslations ? "Perfect for families" : t('membership.plans.family.description'),
      features: isLoadingTranslations ? [
        "Everything in Premium",
        "Up to 5 accounts",
        "Family dashboard",
        "Bulk downloads",
      ] : [
        t('membership.plans.family.feature1'),
        t('membership.plans.family.feature2'),
        t('membership.plans.family.feature3'),
        t('membership.plans.family.feature4'),
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      q: isLoadingTranslations ? "What payment methods do you accept?" : t('membership.faq.q1.question'),
      a: isLoadingTranslations ? "We accept all major credit and debit cards via Stripe's secure payment system." : t('membership.faq.q1.answer'),
    },
    {
      q: isLoadingTranslations ? "Can I cancel anytime?" : t('membership.faq.q2.question'),
      a: isLoadingTranslations ? "Yes! You can cancel your subscription at any time, and your plan will remain active until the end of the billing cycle." : t('membership.faq.q2.answer'),
    },
    {
      q: isLoadingTranslations ? "Do you offer refunds?" : t('membership.faq.q3.question'),
      a: isLoadingTranslations ? "We do not offer partial refunds, but you can cancel before your next billing period." : t('membership.faq.q3.answer'),
    },
    {
      q: isLoadingTranslations ? "Is my payment information secure?" : t('membership.faq.q4.question'),
      a: isLoadingTranslations ? "Absolutely. All transactions are processed securely through Stripe. We never store your card details." : t('membership.faq.q4.answer'),
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
              {isLoadingTranslations ? "Choose Your Kiwiz Plan" : t('membership.title')}
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {isLoadingTranslations ? "Unlock the full potential of AI-powered coloring and tracing for your children." : t('membership.subtitle')}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => {
              const isCurrent = selectedPlan === plan.name.toUpperCase();
              const shouldBlurFree =
                selectedPlan !== "FREE" && plan.name === "Free";

              return (
                <Card
                  key={index}
                  className={`relative bg-yellow-50 border border-orange-200 transition-all duration-300 
                    ${
                      isCurrent
                        ? "border-2 border-orange-500 shadow-lg scale-[1.03]"
                        : "hover:shadow-lg hover:scale-[1.02]"
                    }
                    ${shouldBlurFree ? "opacity-40 blur-[1.5px]" : ""}
                  `}
                >
                  {/* Active Plan Badge */}
                  {isCurrent && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-md">
                        <Sparkles className="h-3 w-3" />
                        {isLoadingTranslations ? "Active Plan" : t('membership.activePlan')}
                      </div>
                    </div>
                  )}

                  {/* Popular Label */}
                  {plan.popular && !isCurrent && (
                    <div className="absolute -top-3 right-3">
                      <div className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow">
                        {isLoadingTranslations ? "Most Popular" : t('membership.mostPopular')}
                      </div>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold text-orange-800">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-2">
                      <span className="text-3xl font-extrabold text-orange-600">
                        {currency}{plan.price}
                      </span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2 text-gray-700">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-gray-800"
                        >
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        isCurrent
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : plan.name.includes("Premium") || (isLoadingTranslations && plan.name === "Premium")
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-orange-500 hover:bg-orange-600 text-white"
                      }`}
                      disabled={isCurrent || loadingPlan === plan.name}
                      onClick={() => handlePlanSelection(isLoadingTranslations ? plan.name : (plan.name === t('membership.plans.free.name') ? 'Free' : plan.name === t('membership.plans.premium.name') ? 'Premium' : 'Family'))}
                    >
                      {isCurrent
                        ? (isLoadingTranslations ? "Current Plan" : t('membership.currentPlan'))
                        : loadingPlan === plan.name
                        ? (isLoadingTranslations ? "Redirecting..." : t('membership.redirecting'))
                        : (plan.name.includes("Premium") || (!isLoadingTranslations && plan.name === t('membership.plans.premium.name')))
                        ? (isLoadingTranslations ? "Upgrade Now" : t('membership.upgradeNow'))
                        : (isLoadingTranslations ? "Choose Plan" : t('membership.choosePlan'))}
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
                {isLoadingTranslations ? "Why Choose Premium?" : t('membership.whyPremium.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-orange-800">
                    {isLoadingTranslations ? "For Parents" : t('membership.whyPremium.forParents.title')}
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" /> {isLoadingTranslations ? "Unlimited creativity for children" : t('membership.whyPremium.forParents.benefit1')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" /> {isLoadingTranslations ? "Educational premium content" : t('membership.whyPremium.forParents.benefit2')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" /> {isLoadingTranslations ? "Save time with instant generation" : t('membership.whyPremium.forParents.benefit3')}
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-orange-800">
                    {isLoadingTranslations ? "For Children" : t('membership.whyPremium.forChildren.title')}
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-green-500" /> {isLoadingTranslations ? "Endless coloring & tracing fun" : t('membership.whyPremium.forChildren.benefit1')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-green-500" /> {isLoadingTranslations ? "Age-appropriate creative tools" : t('membership.whyPremium.forChildren.benefit2')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-green-500" /> {isLoadingTranslations ? "Develop fine motor skills" : t('membership.whyPremium.forChildren.benefit3')}
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="mb-10 bg-yellow-50 border border-orange-200 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <HelpCircle className="h-5 w-5 text-yellow-500" />
                {isLoadingTranslations ? "Frequently Asked Questions" : t('membership.faq.title')}
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
