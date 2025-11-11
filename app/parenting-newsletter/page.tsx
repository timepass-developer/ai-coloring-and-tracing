"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, BookOpen, Users, Calendar, Star } from "lucide-react";
import MobileHeader from "@/components/mobile-header";
import MobileSidebar from "@/components/mobile-sidebar";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import {
  LOCAL_STORAGE_DISMISSED_KEY,
  LOCAL_STORAGE_SUBSCRIBED_KEY,
} from "@/components/NewsletterPrompt";

export default function ParentingNewsletterPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();
  const { t, isLoading } = useTranslations();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: isLoading ? "Missing Email" : t('parentingNewsletter.missingEmail'),
        description: isLoading ? "Please enter your email address to subscribe." : t('parentingNewsletter.missingEmailDesc'),
        variant: "error",
      });
      return;
    }

    try {
      setIsSubscribing(true);
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed");

      toast({
        title: isLoading ? "Subscription Successful! 🎉" : t('parentingNewsletter.successTitle'),
        description: isLoading ? "You'll now receive our weekly parenting newsletter." : t('parentingNewsletter.successMessage'),
        variant: "success",
      });

      if (typeof window !== "undefined") {
        window.localStorage.setItem(LOCAL_STORAGE_SUBSCRIBED_KEY, "true");
        window.localStorage.removeItem(LOCAL_STORAGE_DISMISSED_KEY);
        window.dispatchEvent(new Event("newsletterSubscribed"));
      }
      setEmail("");
    } catch (error: any) {
      toast({
        title: isLoading ? "Subscription Failed" : t('parentingNewsletter.subscriptionFailed'),
        description:
          error.message || (isLoading ? "Something went wrong. Please try again." : t('parentingNewsletter.subscriptionFailedDesc')),
        variant: "error",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const newsletterTopics = [
    {
      icon: BookOpen,
      title: isLoading ? "Early Learning Tips" : t('parentingNewsletter.whatYouLearn.topic1.title'),
      description: isLoading ? "Expert advice on supporting your child's cognitive development" : t('parentingNewsletter.whatYouLearn.topic1.description'),
    },
    {
      icon: Users,
      title: isLoading ? "Parenting Strategies" : t('parentingNewsletter.whatYouLearn.topic2.title'),
      description: isLoading ? "Practical tips for managing daily challenges with young children" : t('parentingNewsletter.whatYouLearn.topic2.description'),
    },
    {
      icon: Star,
      title: isLoading ? "Creative Activities" : t('parentingNewsletter.whatYouLearn.topic3.title'),
      description: isLoading ? "Fun and educational activities you can do at home" : t('parentingNewsletter.whatYouLearn.topic3.description'),
    },
    {
      icon: Calendar,
      title: isLoading ? "Developmental Milestones" : t('parentingNewsletter.whatYouLearn.topic4.title'),
      description: isLoading ? "Understanding what to expect at each age and stage" : t('parentingNewsletter.whatYouLearn.topic4.description'),
    },
  ];

  const recentArticles = [
    {
      title: isLoading ? "The Benefits of Coloring for Fine Motor Development" : t('parentingNewsletter.recentArticles.article1.title'),
      excerpt: isLoading ? "Learn how coloring activities help children develop essential motor skills..." : t('parentingNewsletter.recentArticles.article1.excerpt'),
      date: isLoading ? "Dec 15, 2024" : t('parentingNewsletter.recentArticles.article1.date'),
      readTime: isLoading ? "5 min read" : t('parentingNewsletter.recentArticles.article1.readTime'),
    },
    {
      title: isLoading ? "Creating a Learning-Friendly Home Environment" : t('parentingNewsletter.recentArticles.article2.title'),
      excerpt: isLoading ? "Simple tips to make your home a place where learning happens naturally..." : t('parentingNewsletter.recentArticles.article2.excerpt'),
      date: isLoading ? "Dec 10, 2024" : t('parentingNewsletter.recentArticles.article2.date'),
      readTime: isLoading ? "7 min read" : t('parentingNewsletter.recentArticles.article2.readTime'),
    },
    {
      title: isLoading ? "Screen Time vs. Hands-On Learning: Finding the Balance" : t('parentingNewsletter.recentArticles.article3.title'),
      excerpt: isLoading ? "How to balance digital tools with traditional learning methods..." : t('parentingNewsletter.recentArticles.article3.excerpt'),
      date: isLoading ? "Dec 5, 2024" : t('parentingNewsletter.recentArticles.article3.date'),
      readTime: isLoading ? "6 min read" : t('parentingNewsletter.recentArticles.article3.readTime'),
    },
    {
      title: isLoading ? "Building Confidence Through Creative Expression" : t('parentingNewsletter.recentArticles.article4.title'),
      excerpt: isLoading ? "Why creative activities are crucial for your child's self-esteem..." : t('parentingNewsletter.recentArticles.article4.excerpt'),
      date: isLoading ? "Nov 28, 2024" : t('parentingNewsletter.recentArticles.article4.date'),
      readTime: isLoading ? "4 min read" : t('parentingNewsletter.recentArticles.article4.readTime'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* ✅ Mobile Header */}
      <MobileHeader onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />

      {/* ✅ Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="newsletter"
      />

      {/* ✅ Main Content */}
      <div className="pt-16">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 lg:px-8 py-8 space-y-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-orange-600 mb-4 animate-bounce-gentle">
              {isLoading ? "Parenting Newsletter" : t('parentingNewsletter.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isLoading ? "Get expert parenting tips, educational insights, and creative activity ideas delivered to your inbox." : t('parentingNewsletter.subtitle')}
            </p>
          </div>

          {/* Center wrapper for all cards */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-3xl space-y-10">
              {/* Subscription Card */}
              <Card className="bg-white border-orange-200 shadow-md rounded-2xl hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Mail className="h-5 w-5" />
                    {isLoading ? "Subscribe to Our Newsletter" : t('parentingNewsletter.title')}
                  </CardTitle>
                  <CardDescription>
                    {isLoading ? "Join thousands of parents who receive our weekly parenting newsletter" : t('parentingNewsletter.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder={isLoading ? "Enter your email address" : t('parentingNewsletter.emailPlaceholder')}
                        className="flex-1 border-orange-300 focus-visible:ring-orange-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubscribing}
                      />
                      <Button
                        type="submit"
                        disabled={isSubscribing}
                        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                      >
                        {isSubscribing ? (isLoading ? "Subscribing..." : t('parentingNewsletter.subscribing')) : (isLoading ? "Subscribe" : t('parentingNewsletter.subscribe'))}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      {isLoading ? "We respect your privacy. Unsubscribe at any time." : t('parentingNewsletter.privacyNote')}
                    </p>
                  </form>
                </CardContent>
              </Card>

              {/* Topics */}
              <Card className="bg-white border-orange-200 shadow-md rounded-2xl hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-orange-700">
                    {isLoading ? "What You'll Learn" : t('parentingNewsletter.whatYouLearn.title')}
                  </CardTitle>
                  <CardDescription>
                    {isLoading ? "Our newsletter covers these essential parenting topics" : t('parentingNewsletter.whatYouLearn.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {newsletterTopics.map((topic, index) => {
                      const Icon = topic.icon;
                      return (
                        <div
                          key={index}
                          className="flex gap-4 bg-orange-50/40 p-3 rounded-xl hover:bg-orange-100 transition-colors"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                              <Icon className="h-6 w-6 text-orange-600" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-orange-700 mb-1">
                              {topic.title}
                            </h3>
                            <p className="text-gray-600">
                              {topic.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Articles */}
              <Card className="bg-white border-orange-200 shadow-md rounded-2xl hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-orange-700">
                    {isLoading ? "Recent Articles" : t('parentingNewsletter.recentArticles.title')}
                  </CardTitle>
                  <CardDescription>
                    {isLoading ? "Latest insights from our parenting experts" : t('parentingNewsletter.recentArticles.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentArticles.map((article, index) => (
                      <div
                        key={index}
                        className="p-4 border border-orange-100 rounded-xl bg-orange-50/40 hover:bg-orange-100 transition-all duration-200"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                          <h3 className="font-semibold text-lg text-orange-700">
                            {article.title}
                          </h3>
                          <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                            {article.date} • {article.readTime}
                          </span>
                        </div>
                        <p className="text-gray-600">{article.excerpt}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="bg-white border-orange-200 shadow-md rounded-2xl hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-orange-700">
                    {isLoading ? "Why Subscribe?" : t('parentingNewsletter.whySubscribe.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-6">
                    {[
                      {
                        icon: Star,
                        title: isLoading ? "Expert Content" : t('parentingNewsletter.whySubscribe.expert.title'),
                        desc: isLoading ? "Written by child development experts and experienced parents" : t('parentingNewsletter.whySubscribe.expert.description'),
                      },
                      {
                        icon: Calendar,
                        title: isLoading ? "Weekly Delivery" : t('parentingNewsletter.whySubscribe.weekly.title'),
                        desc: isLoading ? "Fresh content delivered to your inbox every week" : t('parentingNewsletter.whySubscribe.weekly.description'),
                      },
                      {
                        icon: Users,
                        title: isLoading ? "Community" : t('parentingNewsletter.whySubscribe.community.title'),
                        desc: isLoading ? "Join a community of like-minded parents and educators" : t('parentingNewsletter.whySubscribe.community.description'),
                      },
                    ].map((benefit, i) => {
                      const Icon = benefit.icon;
                      return (
                        <div
                          key={i}
                          className="text-center bg-orange-50/40 p-4 rounded-xl hover:bg-orange-100 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                            <Icon className="h-6 w-6 text-orange-600" />
                          </div>
                          <h3 className="font-semibold text-orange-700 mb-2">
                            {benefit.title}
                          </h3>
                          <p className="text-sm text-gray-600">{benefit.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Testimonials */}
              <Card className="bg-white border-orange-200 shadow-md rounded-2xl hover:shadow-lg transition-all duration-300 mb-10">
                <CardHeader>
                  <CardTitle className="text-orange-700">
                    {isLoading ? "What Parents Say" : t('parentingNewsletter.testimonials.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      {
                        text: isLoading ? "The newsletter has been a game-changer for our family. The tips are practical and easy to implement." : t('parentingNewsletter.testimonials.testimonial1.text'),
                        author: isLoading ? "Sarah M., Mother of 2" : t('parentingNewsletter.testimonials.testimonial1.author'),
                      },
                      {
                        text: isLoading ? "I love how the articles are backed by research but written in a way that's easy to understand." : t('parentingNewsletter.testimonials.testimonial2.text'),
                        author: isLoading ? "Michael R., Father of 3" : t('parentingNewsletter.testimonials.testimonial2.author'),
                      },
                    ].map((testimonial, i) => (
                      <div
                        key={i}
                        className="p-4 border border-orange-100 rounded-xl bg-orange-50/40 hover:bg-orange-100 transition-all"
                      >
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 mb-3">{testimonial.text}</p>
                        <p className="text-sm font-medium text-orange-700">
                          {testimonial.author}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
