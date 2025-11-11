"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Sparkles, Shield, Award, Mail } from "lucide-react"
import MobileHeader from "@/components/mobile-header"
import MobileSidebar from "@/components/mobile-sidebar"
import { useState } from "react"
import { useTranslations } from "@/hooks/use-translations"

export default function AboutUsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { t, isLoading } = useTranslations()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const values = [
    {
      icon: Heart,
      title: isLoading ? "Child-Centered" : t('aboutUs.values.childCentered.title'),
      description: isLoading ? "Every feature is designed with children's development and safety in mind" : t('aboutUs.values.childCentered.description'),
    },
    {
      icon: Sparkles,
      title: isLoading ? "Innovation" : t('aboutUs.values.innovation.title'),
      description: isLoading ? "We use cutting-edge AI to create personalized educational content" : t('aboutUs.values.innovation.description'),
    },
    {
      icon: Shield,
      title: isLoading ? "Safety First" : t('aboutUs.values.safetyFirst.title'),
      description: isLoading ? "All content is age-appropriate and safe for children aged 2-8" : t('aboutUs.values.safetyFirst.description'),
    },
    {
      icon: Users,
      title: isLoading ? "Family Focused" : t('aboutUs.values.familyFocused.title'),
      description: isLoading ? "We believe in bringing families together through creative learning" : t('aboutUs.values.familyFocused.description'),
    },
  ]

  const team = [
    {
      name: isLoading ? "Sarah Johnson" : t('aboutUs.team.sarah.name'),
      role: isLoading ? "Founder & CEO" : t('aboutUs.team.sarah.role'),
      description: isLoading ? "Former kindergarten teacher with 10+ years of experience in early childhood education" : t('aboutUs.team.sarah.description'),
    },
    {
      name: isLoading ? "Dr. Michael Chen" : t('aboutUs.team.michael.name'),
      role: isLoading ? "CTO" : t('aboutUs.team.michael.role'),
      description: isLoading ? "AI researcher specializing in educational technology and child development" : t('aboutUs.team.michael.description'),
    },
    {
      name: isLoading ? "Emily Rodriguez" : t('aboutUs.team.emily.name'),
      role: isLoading ? "Head of Design" : t('aboutUs.team.emily.role'),
      description: isLoading ? "Child psychology expert who ensures our content is engaging and developmentally appropriate" : t('aboutUs.team.emily.description'),
    },
    {
      name: isLoading ? "David Kim" : t('aboutUs.team.david.name'),
      role: isLoading ? "Lead Developer" : t('aboutUs.team.david.role'),
      description: isLoading ? "Full-stack developer passionate about creating accessible educational tools" : t('aboutUs.team.david.description'),
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Mobile Header */}
      <MobileHeader onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="about-us"
      />

      {/* Main Content */}
      <div className="pt-20">
        <div className="container max-w-4xl mx-auto px-5 py-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Award className="h-12 w-12 text-orange-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-orange-700 mb-3">{isLoading ? "About Kiwiz" : t('aboutUs.title')}</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {isLoading ? "Empowering parents and educators with AI-powered tools to nurture children's creativity and learning." : t('aboutUs.subtitle')}
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-8 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Heart className="h-5 w-5 text-red-500" />
                {isLoading ? "Our Mission" : t('aboutUs.mission.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg mb-4">
                {isLoading ? "At Kiwiz, we believe that every child deserves access to high-quality, personalized educational content. Our mission is to make learning fun, engaging, and accessible for children aged 2–8 through innovative AI-powered coloring pages and tracing worksheets." : t('aboutUs.mission.paragraph1')}
              </p>
              <p className="text-gray-700">
                {isLoading ? "We're committed to supporting parents and educators in fostering creativity, fine motor skills, and a love for learning through technology that puts children first." : t('aboutUs.mission.paragraph2')}
              </p>
            </CardContent>
          </Card>

          {/* Values Section */}
          <Card className="mb-8 bg-white border border-orange-200 rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-orange-700 font-bold">{isLoading ? "Our Values" : t('aboutUs.values.title')}</CardTitle>
              <CardDescription>{isLoading ? "The principles that guide everything we do" : t('aboutUs.values.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800 mb-1">{value.title}</h3>
                        <p className="text-gray-700">{value.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Our Story */}
          <Card className="mb-8 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-orange-700 font-semibold">{isLoading ? "Our Story" : t('aboutUs.ourStory.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                {isLoading ? "Kiwiz was born from a simple observation: parents and teachers spent hours searching for the right content for their children. Existing solutions were too generic, not age-appropriate, or expensive." : t('aboutUs.ourStory.paragraph1')}
              </p>
              <p>
                {isLoading ? "Our founder, a former kindergarten teacher, saw the need for a tool that could instantly generate personalized educational content based on each child's interests and learning level." : t('aboutUs.ourStory.paragraph2')}
              </p>
              <p>
                {isLoading ? "Today, Kiwiz serves thousands of families worldwide — helping children develop creativity, fine motor skills, and confidence through fun AI-powered activities." : t('aboutUs.ourStory.paragraph3')}
              </p>
            </CardContent>
          </Card>

          {/* Team Section */}
          <Card className="mb-8 bg-white border border-green-200 rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-green-700 font-semibold">{isLoading ? "Meet Our Team" : t('aboutUs.team.title')}</CardTitle>
              <CardDescription>{isLoading ? "Passionate people behind Kiwiz" : t('aboutUs.team.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {team.map((member, index) => (
                  <div key={index} className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition">
                    <h3 className="font-semibold text-lg text-gray-800">{member.name}</h3>
                    <p className="text-orange-700 font-medium">{member.role}</p>
                    <p className="text-sm text-gray-700 mt-1">{member.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="mb-10 bg-white border border-blue-200 rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-blue-700 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                {isLoading ? "Get in Touch" : t('aboutUs.contact.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{isLoading ? "Support" : t('aboutUs.contact.support.title')}</h3>
                  <p className="text-gray-600 mb-2">
                    {isLoading ? "Need help with Kiwiz? Our support team is ready to assist." : t('aboutUs.contact.support.description')}
                  </p>
                  <Button variant="outline" size="sm" className="border-blue-500 text-blue-600">
                    {isLoading ? "Contact Support" : t('aboutUs.contact.support.button')}
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{isLoading ? "Feedback" : t('aboutUs.contact.feedback.title')}</h3>
                  <p className="text-gray-600 mb-2">{isLoading ? "We'd love to hear your ideas and suggestions." : t('aboutUs.contact.feedback.description')}</p>
                  <Button variant="outline" size="sm" className="border-blue-500 text-blue-600">
                    {isLoading ? "Send Feedback" : t('aboutUs.contact.feedback.button')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="font-bold text-white">{isLoading ? "Kiwiz by the Numbers" : t('aboutUs.stats.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm">{isLoading ? "Happy Families" : t('aboutUs.stats.families')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm">{isLoading ? "Pages Generated" : t('aboutUs.stats.pages')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-sm">{isLoading ? "Countries" : t('aboutUs.stats.countries')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">99%</div>
                  <div className="text-sm">{isLoading ? "Satisfaction Rate" : t('aboutUs.stats.satisfaction')}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
