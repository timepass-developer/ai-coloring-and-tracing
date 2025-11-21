"use client";

import { useState } from "react";
import { HelpCircle, Mail, MessageCircle, ArrowRight } from "lucide-react";
import MobileHeader from "@/components/mobile-header";
import MobileSidebar from "@/components/mobile-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";

export default function ContactUsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWhatsAppDetails, setShowWhatsAppDetails] = useState(false);
  const [showEmailDetails, setShowEmailDetails] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const { t, isLoading } = useTranslations();

  // 🔥 ENV VALUES
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const whatsappMessage = process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE || "";
  const emailAddress = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "";
  const emailSubject = process.env.NEXT_PUBLIC_EMAIL_SUBJECT || "";
  const emailBody = process.env.NEXT_PUBLIC_EMAIL_BODY || "";

  // 🔥 WhatsApp URL
  const whatsappUrl = whatsappMessage
    ? `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
        whatsappMessage
      )}`
    : `https://api.whatsapp.com/send?phone=${whatsappNumber}`;

  // 🔥 Email URL
  let emailUrl = `mailto:${emailAddress}`;
  const params = [];
  if (emailSubject) params.push(`subject=${encodeURIComponent(emailSubject)}`);
  if (emailBody) params.push(`body=${encodeURIComponent(emailBody)}`);
  if (params.length > 0) emailUrl += `?${params.join("&")}`;

  // ======= Common Questions =======
  const commonQuestions = [
    {
      q: "Why didn’t my content generate?",
      a: "Check your internet connection, try simpler prompts, or try again later.",
    },
    {
      q: "Why can't I download or print?",
      a: "Sign in to access downloads. Free users have limited daily downloads.",
    },
    {
      q: "How long until you reply?",
      a: "We usually reply within 1–24 hours depending on the channel.",
    },
    {
      q: "How do I report inappropriate content?",
      a: "Send a screenshot and prompt — we’ll review and fix it quickly.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Mobile Header */}
      <MobileHeader onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />

      {/* Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="contact-us"
      />

      {/* Main Content */}
      <div className="pt-20 pb-8">
        <div className="container max-w-4xl mx-auto px-6 py-10">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <HelpCircle className="h-12 w-12 text-orange-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-orange-700 mb-3">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              We're here to help! Reach out for support, feedback, or questions.
            </p>
          </div>

          {/* Contact Methods */}
          <Card className="bg-yellow-50 border border-yellow-200 shadow-lg rounded-2xl mb-10">
            <CardHeader>
              <CardTitle className="text-orange-700 font-semibold">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">

              {/* WHATSAPP */}
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-7 w-7 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">WhatsApp Support</h3>
                    <p className="text-sm text-gray-600">
                      Chat with us instantly on WhatsApp
                    </p>
                  </div>
                  <Button
                    asChild
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => setShowWhatsAppDetails(true)}
                  >
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      Chat
                    </a>
                  </Button>
                </div>

                {/* Show details after click */}
                {showWhatsAppDetails && (
                  <p className="mt-3 text-sm text-gray-700 break-all">
                    📞 <span className="font-semibold">{whatsappNumber}</span>
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="h-7 w-7 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
                    <p className="text-sm text-gray-600">Send us an email anytime</p>
                  </div>
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setShowEmailDetails(true)}
                  >
                    <a href={emailUrl}>Email</a>
                  </Button>
                </div>

                {/* Show details after click */}
                {showEmailDetails && (
                  <p className="mt-3 text-sm text-gray-700 break-all">
                    ✉ <span className="font-semibold">{emailAddress}</span>
                  </p>
                )}
              </div>

            </CardContent>
          </Card>

          {/* Common Questions */}
          <Card className="bg-white border border-gray-100 rounded-2xl shadow-sm mb-10">
            <CardHeader>
              <CardTitle className="text-gray-800 font-semibold">Common Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {commonQuestions.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-1">{item.q}</h4>
                  <p className="text-sm text-gray-600">{item.a}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Extra Help */}
          <Card className="bg-orange-50 border border-orange-200 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-orange-700 font-semibold">Need More Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-orange-500 mt-1" />
                <p className="text-gray-700">
                  Visit the{" "}
                  <a href="/how-to-use" className="text-orange-600 underline font-medium">
                    How to Use
                  </a>{" "}
                  page for guides and tutorials.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-orange-500 mt-1" />
                <p className="text-gray-700">
                  Reporting an issue? Send us screenshots for faster help.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
