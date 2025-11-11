"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Palette, PenTool, Download, Printer, Sparkles, ArrowRight } from "lucide-react"
import MobileHeader from "@/components/mobile-header"
import MobileSidebar from "@/components/mobile-sidebar"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useTranslations } from "@/hooks/use-translations"

export default function HowToUsePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const router = useRouter()
  const { t, isLoading } = useTranslations()

  const steps = [
    {
      icon: Palette,
      title: isLoading ? "Choose Coloring Mode" : t('howToUse.quickStart.step1.title'),
      description: isLoading ? "Tap the 'Coloring' button to create coloring pages" : t('howToUse.quickStart.step1.description'),
      details: isLoading ? "Select from suggested prompts or type your own idea" : t('howToUse.quickStart.step1.details'),
    },
    {
      icon: PenTool,
      title: isLoading ? "Choose Tracing Mode" : t('howToUse.quickStart.step2.title'),
      description: isLoading ? "Tap the 'Tracing' button to create tracing worksheets" : t('howToUse.quickStart.step2.description'),
      details: isLoading ? "Practice letters, numbers, and words with guided tracing" : t('howToUse.quickStart.step2.details'),
    },
    {
      icon: Sparkles,
      title: isLoading ? "Generate Content" : t('howToUse.quickStart.step3.title'),
      description: isLoading ? "Enter a prompt or click a suggested prompt" : t('howToUse.quickStart.step3.description'),
      details: isLoading ? "Our AI will create a custom coloring page or tracing worksheet" : t('howToUse.quickStart.step3.details'),
    },
    {
      icon: Download,
      title: isLoading ? "Download & Print" : t('howToUse.quickStart.step4.title'),
      description: isLoading ? "Download your creation or print it directly" : t('howToUse.quickStart.step4.description'),
      details: isLoading ? "Sign in to access unlimited downloads and saves" : t('howToUse.quickStart.step4.details'),
    },
  ]

  const features = [
    {
      title: isLoading ? "Suggested Prompts" : t('howToUse.featuresGuide.suggestedPrompts.title'),
      description: isLoading ? "Use our curated prompts for instant inspiration" : t('howToUse.featuresGuide.suggestedPrompts.description'),
      tips: isLoading ? ["Try 'A butterfly on a flower'", "Use 'Trace Alphabet A'", "Explore animal themes"] : [
        t('howToUse.featuresGuide.suggestedPrompts.tip1'),
        t('howToUse.featuresGuide.suggestedPrompts.tip2'),
        t('howToUse.featuresGuide.suggestedPrompts.tip3'),
      ],
    },
    {
      title: isLoading ? "Custom Prompts" : t('howToUse.featuresGuide.customPrompts.title'),
      description: isLoading ? "Type your own ideas for personalized content" : t('howToUse.featuresGuide.customPrompts.description'),
      tips: isLoading ? ["Be specific: 'A red car'", "Add details: 'A happy dog playing'", "Keep it simple for kids"] : [
        t('howToUse.featuresGuide.customPrompts.tip1'),
        t('howToUse.featuresGuide.customPrompts.tip2'),
        t('howToUse.featuresGuide.customPrompts.tip3'),
      ],
    },
    {
      title: isLoading ? "Age-Appropriate Content" : t('howToUse.featuresGuide.ageAppropriate.title'),
      description: isLoading ? "All content is designed for children aged 2-8" : t('howToUse.featuresGuide.ageAppropriate.description'),
      tips: isLoading ? ["Simple shapes and lines", "Large coloring areas", "Clear tracing guides"] : [
        t('howToUse.featuresGuide.ageAppropriate.tip1'),
        t('howToUse.featuresGuide.ageAppropriate.tip2'),
        t('howToUse.featuresGuide.ageAppropriate.tip3'),
      ],
    },
    {
      title: isLoading ? "Mobile-Friendly" : t('howToUse.featuresGuide.mobileFriendly.title'),
      description: isLoading ? "Optimized for phones and tablets" : t('howToUse.featuresGuide.mobileFriendly.description'),
      tips: isLoading ? ["Touch-friendly interface", "Easy navigation", "Works offline after generation"] : [
        t('howToUse.featuresGuide.mobileFriendly.tip1'),
        t('howToUse.featuresGuide.mobileFriendly.tip2'),
        t('howToUse.featuresGuide.mobileFriendly.tip3'),
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Mobile Header */}
      <MobileHeader onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="how-to-use"
      />

      {/* Main Content */}
      <div className="pt-20">
        <div className="container max-w-5xl mx-auto px-5 py-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <HelpCircle className="h-12 w-12 text-orange-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-orange-700 mb-3">
              {isLoading ? "How to Use Kiwiz" : t('howToUse.title')}
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {isLoading ? "Learn how to create amazing coloring pages and tracing worksheets for your children." : t('howToUse.subtitle')}
            </p>
          </div>

          {/* Quick Start Steps */}
          <Card className="mb-10 bg-yellow-50 border border-yellow-200 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Sparkles className="h-5 w-5 text-orange-600" />
                {isLoading ? "Quick Start Guide" : t('howToUse.quickStart.title')}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {isLoading ? "Follow these simple steps to get started." : t('howToUse.quickStart.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div
                      key={index}
                      className="flex gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800 mb-1">{step.title}</h3>
                        <p className="text-gray-600 mb-1">{step.description}</p>
                        <p className="text-sm text-gray-500">{step.details}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Features Guide */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white border border-orange-100 shadow-md hover:shadow-lg rounded-2xl transition-all"
              >
                <CardHeader>
                  <CardTitle className="text-orange-700 font-semibold">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-700">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-600">Pro Tips:</h4>
                    <ul className="space-y-1">
                      {feature.tips.map((tip, tipIndex) => (
                        <li
                          key={tipIndex}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <ArrowRight className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Instructions */}
          <Card className="mb-10 bg-orange-50 border border-orange-200 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-orange-700 font-semibold">Detailed Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-orange-700">
                  <Palette className="h-5 w-5 text-orange-600" />
                  Creating Coloring Pages
                </h3>
                <ol className="space-y-2 ml-6 text-gray-700">
                  {[
                    'Tap the "Coloring" button on the main screen',
                    "Type your idea in the search bar or click a suggested prompt",
                    "Wait for the AI to generate your coloring page",
                    "Download or print your creation",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                        {i + 1}
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-green-700">
                  <PenTool className="h-5 w-5 text-green-600" />
                  Creating Tracing Worksheets
                </h3>
                <ol className="space-y-2 ml-6 text-gray-700">
                  {[
                    'Tap the "Tracing" button on the main screen',
                    'Choose a tracing prompt like "Trace Alphabet A" or "Trace number 5"',
                    "Wait for the AI to create your tracing worksheet",
                    "Download or print for handwriting practice",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                        {i + 1}
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card className="bg-red-50 border border-red-200 rounded-2xl shadow-md mb-10">
            <CardHeader>
              <CardTitle className="text-red-600 font-semibold">{isLoading ? "Troubleshooting" : t('howToUse.troubleshooting.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-1">{isLoading ? "Content not generating?" : t('howToUse.troubleshooting.notGenerating.question')}</h3>
                <p>{isLoading ? "Check your internet connection or try simpler prompts." : t('howToUse.troubleshooting.notGenerating.answer')}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{isLoading ? "Can't download or print?" : t('howToUse.troubleshooting.cannotDownload.question')}</h3>
                <p>{isLoading ? "Sign in to your account for unlimited downloads. Free users have limited daily access." : t('howToUse.troubleshooting.cannotDownload.answer')}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{isLoading ? "Content not appropriate?" : t('howToUse.troubleshooting.notAppropriate.question')}</h3>
                <p>{isLoading ? "All designs are made for ages 2–8. Please report any issue to our support team." : t('howToUse.troubleshooting.notAppropriate.answer')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Start Creating Button */}
          <div className="text-center">
            <Button
              onClick={() => router.push("/create")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              {isLoading ? "Start Creating Now" : t('howToUse.startCreating')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
