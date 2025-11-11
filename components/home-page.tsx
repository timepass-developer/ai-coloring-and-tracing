"use client";

import Image from "next/image";
import { useMemo, useState, type ComponentType } from "react";
import Link from "next/link";
import MobileHeader from "@/components/mobile-header";
import MobileSidebar from "@/components/mobile-sidebar";
import { useTranslations } from "@/hooks/use-translations";
import {
  Sparkles,
  ShieldCheck,
  Palette,
  Users,
  BookOpen,
  Baby,
} from "lucide-react";

interface HighlightCard {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  accent: string;
}

interface AudienceCard {
  label: string;
  description: string;
}

interface StatCard {
  value: string;
  label: string;
}

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t, isLoading } = useTranslations();

  const featureCards: HighlightCard[] = useMemo(
    () => [
      {
        title: t("home.features.instant.title"),
        description: t("home.features.instant.description"),
        icon: Sparkles,
        accent: "from-[#FFD700] to-[#FFA500]",
      },
      {
        title: t("home.features.safe.title"),
        description: t("home.features.safe.description"),
        icon: ShieldCheck,
        accent: "from-[#4CAF50] to-[#3a8d3c]",
      },
      {
        title: t("home.features.unlimited.title"),
        description: t("home.features.unlimited.description"),
        icon: Palette,
        accent: "from-[#87CEEB] to-[#4ea7d8]",
      },
    ],
    [t]
  );

  const audienceCards: AudienceCard[] = [
    {
      label: "Families",
      description:
        "Create magical printables that keep little makers smiling, learning, and proud of their masterpieces.",
    },
    {
      label: "Teachers",
      description:
        "Save prep time with ready-to-print activities that reinforce handwriting, storytelling, and creativity.",
    },
    {
      label: "Therapists",
      description:
        "Personalise practice sheets that support fine motor growth and sensory-friendly play.",
    },
  ];

  const statCards: StatCard[] = [
    { value: "50K+", label: t("home.socialProof.pagesCreated") },
    { value: "10K+", label: t("home.socialProof.happyFamilies") },
    { value: "25+", label: t("home.socialProof.countriesReached") },
  ];

  return (
    <main
      className="relative h-[200vh] overflow-hidden text-slate-900 antialiased"
      style={{
        background:
          "radial-gradient(circle at 15% 20%, rgba(255,215,0,0.25), transparent 40%)," +
          "radial-gradient(circle at 85% 25%, rgba(255,140,0,0.18), transparent 42%)," +
          "radial-gradient(circle at 20% 80%, rgba(76,175,80,0.18), transparent 40%)," +
          "linear-gradient(135deg, #fef9f0 0%, #e8f8ff 50%, #fdf1dd 100%)",
      }}
    >
      <MobileHeader
        onMenuToggle={() => setIsSidebarOpen((prev) => !prev)}
        isMenuOpen={isSidebarOpen}
      />
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="home"
      />

      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(16px 16px at 16px 16px, rgba(255,255,255,0.7), transparent)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        {/* Hero Section */}
        <section
          className="relative flex flex-1 flex-col-reverse items-center gap-10 px-4 py-16 md:flex-row md:px-12 lg:px-20"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(135,206,235,0.85), rgba(135,206,235,0.3)), url("/waill-drawings-kids.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/65 via-transparent to-white/35" />

          <div className="relative z-10 w-full md:w-1/2 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm backdrop-blur">
              <Baby className="h-4 w-4" />
              {isLoading
                ? "Kid-approved creative fun"
                : t("home.features.loved.title")}
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              {isLoading ? "Turn Any Idea Into" : t("home.hero.title")}{" "}
              <span className="text-[#FF4C4C]">
                {isLoading ? "Amazing Art!" : t("home.hero.titleHighlight")}
              </span>
            </h1>
            <p className="text-base text-slate-700 md:text-lg">
              {isLoading
                ? "AI creates personalised colouring pages & tracing worksheets in seconds."
                : t("home.hero.subtitle")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link
                href="/create"
                className="inline-flex items-center rounded-full bg-[#FF4C4C] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-[#e23d3d]"
              >
                {isLoading ? "Start" : t("home.hero.cta")}
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm text-orange-600 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4" />
                {isLoading
                  ? "Takes less than 30 seconds"
                  : t("home.hero.timeInfo")}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 rounded-3xl bg-white/70 p-4 shadow-md backdrop-blur">
              {statCards.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl font-bold text-[#FF4C4C] md:text-2xl">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-600 md:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex w-full max-w-xl items-center justify-center md:w-1/2">
            <div className="relative h-[280px] w-full max-w-md rounded-[2.5rem] bg-white/80 p-8 shadow-2xl backdrop-blur">
              <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-[#87CEEB] shadow" />
              <div className="absolute -bottom-6 right-6 h-12 w-12 rounded-full bg-[#FFD700] shadow" />
              <h3 className="mb-4 text-xl font-bold text-slate-900">Family & Classroom Ready</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-1 h-4 w-4 text-[#4CAF50]" />
                  {isLoading
                    ? "Safe, age-appropriate prompts for ages 2-8"
                    : t("home.features.safe.description")}
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="mt-1 h-4 w-4 text-[#FFA500]" />
                  {t("home.howItWorks.step2.description")}
                </li>
                <li className="flex items-start gap-2">
                  <Palette className="mt-1 h-4 w-4 text-[#FF4C4C]" />
                  {t("home.features.unlimited.description")}
                </li>
              </ul>
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#87CEEB] to-[#FFA500] p-[1px]">
                <div className="rounded-[calc(1rem-1px)] bg-white/90 px-5 py-3 text-center text-sm text-slate-700">
                  {t("home.cta.subtitle")}
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -left-12 top-16 hidden md:block lg:-left-16">
            <Image
              src="/kid-drawing-hand.webp"
              alt="Child colouring printable"
              width={220}
              height={260}
              className="rounded-[2.5rem] border-4 border-white/70 shadow-xl"
              priority
            />
          </div>
          <div className="pointer-events-none absolute -right-10 bottom-6 hidden md:block lg:-right-14">
            <Image
              src="/objects-drawing-kids.webp"
              alt="Kids drawing objects with crayons"
              width={240}
              height={260}
              className="rounded-[2.5rem] border-4 border-white/70 shadow-xl"
            />
          </div>
        </section>

        {/* Highlights Section */}
        <section className="flex flex-1 flex-col justify-between gap-10 px-4 pb-12 pt-6 md:px-12 lg:px-20">
          <div className="grid gap-6 md:grid-cols-3">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.accent} p-[1px] shadow-lg transition-transform hover:-translate-y-1`}
              >
                <div className="rounded-[calc(1.5rem-1px)] bg-white/85 p-6 backdrop-blur">
                  <card.icon className="mb-4 h-8 w-8 text-[#FF4C4C]" />
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600">{card.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {audienceCards.map((card) => (
              <div
                key={card.label}
                className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:shadow-md"
              >
                <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#FFA500]">
                  <Users className="h-4 w-4" />
                  {card.label}
                </div>
                <p className="text-sm text-slate-600">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white/85 px-6 py-5 shadow-md backdrop-blur">
            <div>
              <h4 className="text-lg font-semibold text-slate-900">
                {t("home.cta.title")}
              </h4>
              <p className="text-sm text-slate-600">
                {t("home.cta.subtitle")}
              </p>
            </div>
            <Link
              href="/create"
              className="inline-flex items-center rounded-full bg-[#4CAF50] px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-[#3e9442]"
            >
              {t("home.cta.button")}
            </Link>
          </div>

          <div className="hidden w-full gap-6 md:grid md:grid-cols-3">
            <div className="relative h-40 overflow-hidden rounded-3xl border border-white/60 shadow-lg">
              <Image
                src="/kids-art-wall.webp"
                alt="Classroom art wall"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-40 overflow-hidden rounded-3xl border border-white/60 shadow-lg">
              <Image
                src="/kid-coloring-hand.webp"
                alt="Child colouring printable"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-40 overflow-hidden rounded-3xl border border-white/60 shadow-lg">
              <Image
                src="/drawing.webp"
                alt="Children drawing together"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <footer className="text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Kiwiz · Making printable learning joyful for
            families, teachers, and therapists.
          </footer>
        </section>
      </div>
    </main>
  );
}
