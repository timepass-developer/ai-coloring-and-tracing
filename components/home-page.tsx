"use client";

import { useEffect,useState } from "react";
import "aos/dist/aos.css"; // AOS styles
import Header from "@/components/mobile-header";
import Link from "next/link";
import MobileSidebar from "@/components/mobile-sidebar";
import { useTranslations } from "@/hooks/use-translations";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t, isLoading } = useTranslations();
  useEffect(() => {
    let vantaEffect: any;

    const loadEffects = async () => {
      if (typeof window === "undefined") return;

      // AOS
      const AOS = (await import("aos")).default;
      AOS.init({ duration: 800, once: true, mirror: false });

      // Feather icons
      const feather = (await import("feather-icons")).default;
      setTimeout(() => feather.replace(), 0);

      // Vanta (Waves)
      const VANTA = (await import("vanta/dist/vanta.waves.min")).default;
      const THREE = await import("three");

      vantaEffect = VANTA({
        el: "#vanta-bg",
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xffa500,
        shininess: 50.0,
        waveHeight: 20.0,
        waveSpeed: 1.0,
        zoom: 0.75,
      });
    };

    loadEffects();

    // ✅ Handle window resize to keep Vanta responsive
    const handleResize = () => {
      if (vantaEffect?.resize) vantaEffect.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (vantaEffect && typeof vantaEffect.destroy === "function") {
        vantaEffect.destroy();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <main className="bg-kiwizBackground min-h-screen antialiased overflow-hidden relative">
      {/* Header / Navigation */}
      <Header onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} isMenuOpen={isSidebarOpen} />
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="pt-20 relative z-10">
        {/* HERO SECTION */}
        <section
          id="hero"
          className="relative overflow-hidden flex items-center justify-center p-4"
          style={{ minHeight: "100vh" }}
        >
          {/* ✅ Vanta background scoped only to hero */}
          <div
            id="vanta-bg"
            className="absolute inset-0 w-full h-full z-0"
          />
          <div
            className="hero-content relative max-w-xl mx-auto bg-gradient-to-br from-orange-500 to-orange-400 text-white rounded-[4rem] shadow-2xl p-8 md:p-10 text-center flex flex-col items-center justify-center min-h-[480px] z-10"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-kiwizBlue flex items-center justify-center animate-pulseLight shadow-xl">
                <i data-feather="zap" className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-kiwizYellow rounded-full flex items-center justify-center shadow-md">
                <i data-feather="star" className="h-4 w-4 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4 leading-tight text-white drop-shadow-lg">
              {isLoading ? "Turn Any Idea Into" : t('home.hero.title')} <br />
              <span className="text-kiwizYellow">{isLoading ? "Amazing Art!" : t('home.hero.titleHighlight')}</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 drop-shadow-md">
              {isLoading ? "AI creates personalized coloring pages & tracing worksheets for your child in seconds." : t('home.hero.subtitle')}
            </p>

            <div className="w-full space-y-4 mb-8">
              <Link
                href="/create"
                className="inline-flex items-center justify-center w-full bg-kiwizBlue bg-blue-600 hover:bg-blue-700 text-white font-bold h-16 text-xl rounded-3xl transition-all shadow-xl hover:scale-105 duration-300"
              >
                <i data-feather="play-circle" className="h-6 w-6 mr-3" />
                {isLoading ? "Start Creating Now - FREE" : t('home.hero.cta')}
              </Link>

              <div className="flex items-center justify-center gap-2 text-sm md:text-base text-white/80">
                <i data-feather="clock" className="h-5 w-5" />
                <span>{isLoading ? "Takes less than 30 seconds" : t('home.hero.timeInfo')}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs md:text-sm mt-auto text-white/70">
              <div className="flex items-center gap-1">
                <i
                  data-feather="shield"
                  className="h-4 w-4 text-kiwizGreen"
                />{" "}
                Safe for Kids
              </div>
              <div className="flex items-center gap-1">
                <i
                  data-feather="zap"
                  className="h-4 w-4 text-kiwizYellow"
                />{" "}
                Instant Results
              </div>
              <div className="flex items-center gap-1">
                <i
                  data-feather="gift"
                  className="h-4 w-4 text-kiwizBlue"
                />{" "}
                Free to Try
              </div>
            </div>
          </div>
        </section>
        {/* FEATURES */}
        <section
          id="features"
          className="py-16 md:py-24 px-4 bg-gradient-to-b from-kiwizBackground to-white"
        >
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-display font-bold text-kiwizOrange text-center mb-12 drop-shadow-sm"
              data-aos="fade-up"
            >
              {isLoading ? "Why Parents Choose Kiwiz" : t('home.features.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                className="p-6 bg-white rounded-3xl shadow-lg border border-orange-100 text-center hover:shadow-xl transition-all hover:-translate-y-1 duration-300"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-300 flex items-center justify-center shadow-md">
                    <i data-feather="zap" className="h-7 w-7 text-white" />
                  </div>
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-800 mb-1">
                  {isLoading ? "Instant AI Magic" : t('home.features.instant.title')}
                </h3>
                <p className="text-sm text-gray-600">
                  {isLoading ? "Create personalized content in seconds." : t('home.features.instant.description')}
                </p>
              </div>

              <div
                className="p-6 bg-white rounded-3xl shadow-lg border border-orange-100 text-center hover:shadow-xl transition-all hover:-translate-y-1 duration-300"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center shadow-md">
                    <i data-feather="shield" className="h-7 w-7 text-white" />
                  </div>
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-800 mb-1">
                  {isLoading ? "100% Kid-Safe" : t('home.features.safe.title')}
                </h3>
                <p className="text-sm text-gray-600">
                  {isLoading ? "All content is filtered and safe for children." : t('home.features.safe.description')}
                </p>
              </div>

              <div
                className="p-6 bg-white rounded-3xl shadow-lg border border-orange-100 text-center hover:shadow-xl transition-all hover:-translate-y-1 duration-300"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-400 flex items-center justify-center shadow-md">
                    <i data-feather="download" className="h-7 w-7 text-white" />
                  </div>
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-800 mb-1">
                  {isLoading ? "Unlimited Downloads" : t('home.features.unlimited.title')}
                </h3>
                <p className="text-sm text-gray-600">
                  {isLoading ? "Download and print as many times as you like." : t('home.features.unlimited.description')}
                </p>
              </div>

              <div
                className="p-6 bg-white rounded-3xl shadow-lg border border-orange-100 text-center hover:shadow-xl transition-all hover:-translate-y-1 duration-300"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-pink-400 flex items-center justify-center shadow-md">
                    <i data-feather="smile" className="h-7 w-7 text-white" />
                  </div>
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-800 mb-1">
                  {isLoading ? "Kids Love It" : t('home.features.loved.title')}
                </h3>
                <p className="text-sm text-gray-600">
                  {isLoading ? "Engaging activities that spark joy and creativity." : t('home.features.loved.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section
          id="benefits"
          className="py-16 md:py-24 px-4 bg-gradient-to-r from-kiwizGreen to-green-400 text-white"
        >
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-display font-bold text-center mb-12 drop-shadow-sm"
              data-aos="fade-up"
            >
              {isLoading ? "Unlock Developmental Superpowers!" : t('home.benefits.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="bg-white/20 p-6 rounded-3xl shadow-lg"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center gap-3">
                    <i
                      data-feather="check-circle"
                      className="h-6 w-6 text-kiwizYellow"
                    />
                    Develops fine motor skills
                  </li>
                  <li className="flex items-center gap-3">
                    <i
                      data-feather="check-circle"
                      className="h-6 w-6 text-kiwizYellow"
                    />
                    Boosts creativity & imagination
                  </li>
                  <li className="flex items-center gap-3">
                    <i
                      data-feather="check-circle"
                      className="h-6 w-6 text-kiwizYellow"
                    />
                    Improves handwriting & pre-writing skills
                  </li>
                </ul>
              </div>

              <div
                className="bg-white/20 p-6 rounded-3xl shadow-lg"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center gap-3">
                    <i
                      data-feather="check-circle"
                      className="h-6 w-6 text-kiwizYellow"
                    />
                    Builds concentration & focus
                  </li>
                  <li className="flex items-center gap-3">
                    <i
                      data-feather="check-circle"
                      className="h-6 w-6 text-kiwizYellow"
                    />
                    Screen-free learning & fun
                  </li>
                  <li className="flex items-center gap-3">
                    <i
                      data-feather="check-circle"
                      className="h-6 w-6 text-kiwizYellow"
                    />
                    Instant gratification & sense of accomplishment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section
          id="social-proof"
          className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-kiwizBackground"
        >
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-display font-bold text-kiwizBlue text-center mb-12 drop-shadow-sm"
              data-aos="fade-up"
            >
              {isLoading ? "Loved by Families Worldwide!" : t('home.socialProof.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                className="p-6 bg-gradient-to-br from-kiwizBlue to-blue-400 text-white rounded-3xl shadow-xl text-center"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="flex justify-center mb-3">
                  <i
                    data-feather="droplet"
                    className="h-8 w-8 text-kiwizYellow"
                  />
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold mb-1">
                  50K+
                </div>
                <div className="text-sm md:text-base">Pages Created</div>
              </div>

              <div
                className="p-6 bg-gradient-to-br from-orange-500 to-orange-400 text-white rounded-3xl shadow-xl text-center"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="flex justify-center mb-3">
                  <i
                    data-feather="users"
                    className="h-8 w-8 text-kiwizYellow"
                  />
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold mb-1">
                  10K+
                </div>
                <div className="text-sm md:text-base">Happy Families</div>
              </div>

              <div
                className="p-6 bg-gradient-to-br from-green-500 to-green-400 text-white rounded-3xl shadow-xl text-center"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div className="flex justify-center mb-3">
                  <i
                    data-feather="target"
                    className="h-8 w-8 text-kiwizYellow"
                  />
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold mb-1">
                  25+
                </div>
                <div className="text-sm md:text-base">Countries Reached</div>
              </div>

              <div
                className="p-6 bg-gradient-to-br from-pink-500 to-pink-400 text-white rounded-3xl shadow-xl text-center"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div className="flex justify-center mb-3">
                  <i
                    data-feather="star"
                    className="h-8 w-8 text-kiwizYellow"
                  />
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold mb-1">
                  4.9<span className="text-xl">★</span>
                </div>
                <div className="text-sm md:text-base">Parent Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="py-16 md:py-24 px-4 bg-gradient-to-r from-kiwizOrange to-yellow-400 text-white"
        >
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-display font-bold text-center mb-12 drop-shadow-sm"
              data-aos="fade-up"
            >
              {isLoading ? "Creating is Super Easy!" : t('home.howItWorks.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className="flex flex-col items-center text-center p-6 bg-white/20 rounded-3xl shadow-lg"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="w-16 h-16 bg-white text-kiwizOrange rounded-full flex items-center justify-center font-bold text-3xl mb-4 shadow-md">
                  1
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">
                  Choose Your Adventure
                </h3>
                <p className="text-base">
                  Pick if you want a coloring page or a tracing worksheet for
                  your child.
                </p>
              </div>

              <div
                className="flex flex-col items-center text-center p-6 bg-white/20 rounded-3xl shadow-lg"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="w-16 h-16 bg-white text-kiwizOrange rounded-full flex items-center justify-center font-bold text-3xl mb-4 shadow-md">
                  2
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">
                  Dream Up Anything!
                </h3>
                <p className="text-base">
                  Type what you want to create (e.g., "a happy unicorn in space")
                  or use our fun suggestions.
                </p>
              </div>

              <div
                className="flex flex-col items-center text-center p-6 bg-white/20 rounded-3xl shadow-lg"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="w-16 h-16 bg-white text-kiwizOrange rounded-full flex items-center justify-center font-bold text-3xl mb-4 shadow-md">
                  3
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">
                  Print & Play Instantly!
                </h3>
                <p className="text-base">
                  Your unique creation appears instantly, ready to be downloaded
                  and printed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          id="testimonials"
          className="py-16 md:py-24 px-4 bg-gradient-to-b from-kiwizBackground to-white"
        >
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-display font-bold text-kiwizOrange text-center mb-12 drop-shadow-sm"
              data-aos="fade-up"
            >
              {isLoading ? "What Happy Parents Say!" : t('home.testimonials.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                className="p-8 bg-white rounded-3xl shadow-xl border border-orange-100 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300"
                data-aos="fade-right"
              >
                <div className="flex mb-4">
                  <i data-feather="star" className="h-6 w-6 text-kiwizYellow" />
                  <i data-feather="star" className="h-6 w-6 text-kiwizYellow" />
                  <i data-feather="star" className="h-6 w-6 text-kiwizYellow" />
                  <i data-feather="star" className="h-6 w-6 text-kiwizYellow" />
                  <i data-feather="star" className="h-6 w-6 text-kiwizYellow" />
                </div>
                <p className="text-lg text-gray-700 mb-4 italic leading-relaxed">
                  "My 4-year-old is obsessed! Kiwiz creates exactly what she asks
                  for. It's been a lifesaver for rainy days and keeps her engaged
                  for hours!"
                </p>
                <p className="text-sm font-semibold text-gray-600">
                  - Sarah M., Mom of a budding artist
                </p>
              </div>

              <div
                className="p-8 bg-white rounded-3xl shadow-xl border border-orange-100 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300"
                data-aos="fade-left"
              >
                <div className="flex mb-4">
                  <i data-feather="star" className="h-6 w-6 text-kiwizYellow" />
                  <i data-feather="star" className="h-6 w-6 text-kiwizYellow" />
                  <i data-feather="star" className="h-6 w-6 text-kiwizYellow" />
                  <i data-feather="star" className="h-6 w-6 text-kiwizYellow" />
                  <i data-feather="star" className="h-6 w-6 text-kiwizYellow" />
                </div>
                <p className="text-lg text-gray-700 mb-4 italic leading-relaxed">
                  "My son's handwriting improved dramatically using the tracing
                  worksheets! He actually enjoys learning now because he can trace
                  his favorite characters."
                </p>
                <p className="text-sm font-semibold text-gray-600">
                  - Michael R., Dad of a diligent learner
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section
          id="cta"
          className="py-16 md:py-24 px-4 bg-gradient-to-r from-kiwizBlue to-blue-500 text-white text-center"
        >
          <div
            className="max-w-2xl mx-auto p-8 rounded-4xl shadow-2xl bg-white/10 backdrop-blur-sm"
            data-aos="zoom-in"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 drop-shadow-sm">
              {isLoading ? "Ready to Create Magic?" : t('home.cta.title')}
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              {isLoading ? "Join thousands of families making learning fun with AI-powered art!" : t('home.cta.subtitle')}
            </p>
              <Link
                href="/create"
                className="inline-flex items-center justify-center bg-kiwizYellow bg-yellow-200 hover:bg-yellow-300 text-kiwizOrange font-bold h-16 md:h-20 text-xl md:text-2xl px-10 rounded-full transition-all shadow-xl hover:scale-105 duration-300"
              >
                <i data-feather="zap" className="h-7 w-7 mr-3" />
                {isLoading ? "Start Your FREE Adventure!" : t('home.cta.button')}
              </Link>
            <p className="text-sm md:text-base mt-6 text-white/80">
              No signup required • Works on any device • Instant results
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 px-4 bg-gradient-to-r from-kiwizOrange to-orange-400 text-white text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-kiwizYellow flex items-center justify-center shadow-lg">
              <i data-feather="star" className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-display font-bold text-2xl mb-2">Kiwiz</h3>
            <p className="text-base text-white/90">
              AI-powered coloring & tracing for kids aged 2–8
            </p>
            <div className="flex justify-center gap-6 md:gap-8 text-sm md:text-base font-medium">
              <a href="#" className="hover:underline hover:text-kiwizYellow">
                How to Use
              </a>
              <a href="#" className="hover:underline hover:text-kiwizYellow">
                About Us
              </a>
              <a href="#" className="hover:underline hover:text-kiwizYellow">
                Membership
              </a>
              <a href="#" className="hover:underline hover:text-kiwizYellow">
                Privacy Policy
              </a>
            </div>
            <p className="text-xs md:text-sm text-white/70 mt-6">
              © {new Date().getFullYear()} Kiwiz. All rights reserved. Making
              learning fun with AI.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
