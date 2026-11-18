"use client";

import Image from "next/image";
import { BadgeCheck, ShieldCheck, Sparkles, Star, Zap } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { StaySearchForm } from "@/components/shared/stay-search-form";

/**
 * Stayro home hero — full-viewport background (Riyadh skyline) with the
 * licensed Stayro headline and the live stays search front and center.
 *
 * In dark mode: no heavy body blur, no muddy opacity overlay — direct image
 * clarity with subtle legibility gradient for text.
 */
export function StayHeroSection() {
  const { t, locale } = useLanguage();

  return (
    <section
      aria-label={t.home.heroTitle}
      className="relative isolate -mt-16 flex min-h-svh w-full flex-col justify-center overflow-hidden md:-mt-20"
    >
      {/* Full-height background image — direct, vibrant and sharp without heavy blur */}
      <Image
        src="/images/cities/riyadh.webp"
        alt="Riyadh skyline"
        fill
        priority
        quality={95}
        sizes="100vw"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 70%, rgba(0,0,0,0.8) 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 70%, rgba(0,0,0,0.8) 85%, transparent 100%)",
        }}
        className="-z-10 object-cover object-[center_55%] transition-transform duration-1000 scale-[1.01]"
      />

      {/* Subtle legibility top & bottom gradients — direct image visibility in dark mode */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-black/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-background via-background/40 to-transparent"
      />

      {/* Main hero container */}
      <div className="container relative mx-auto w-full px-4 pb-14 pt-28 md:px-8 md:pb-16 md:pt-32">
        {/* Floating rating stats card — anchored INSIDE container bounds so it never flies out */}
        <div className="animate-float-y absolute end-4 top-24 z-10 hidden items-center gap-3 rounded-2xl border border-white/20 bg-black/60 p-3.5 pe-5 shadow-2xl backdrop-blur-md xl:flex">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <Star className="h-6 w-6 fill-primary text-primary" aria-hidden />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold leading-none text-white">4.9</span>
              <span className="text-xs font-semibold text-white/60">/ 5</span>
            </div>
            <p className="mt-1 text-[11px] font-medium text-white/80">
              12,000+ {t.hotelsPage.reviews}
            </p>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 text-center md:gap-6">
          {/* Saudi Ministry of Tourism License badge */}
          <span className="animate-fade-rise inline-flex w-fit items-center gap-2 rounded-full border border-primary/50 bg-black/60 px-4 py-2 text-xs font-semibold text-primary backdrop-blur-sm shadow-md">
            <BadgeCheck className="h-4 w-4" aria-hidden />
            {t.home.heroBadge}
          </span>

          <h1 className="animate-fade-rise max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.08] text-white drop-shadow-xl">
            {t.home.heroTitle}
          </h1>

          <p className="animate-fade-rise max-w-2xl text-base text-white/90 drop-shadow md:text-xl">
            {t.home.heroSubtitle}
          </p>

          {/* Stays search form — centered with prominent elevation */}
          <div className="animate-fade-rise-late w-full pt-2">
            <StaySearchForm className="mx-auto border-white/15 bg-background/95 shadow-2xl backdrop-blur-xl" />
          </div>

          {/* Saudi hospitality trust indicators — centered, responsive, culturally resonant */}
          <div className="animate-fade-rise-later flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 pt-1 text-xs text-white/90 drop-shadow">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Zap className="h-3.5 w-3.5 text-primary" aria-hidden />
              {locale === "ar" ? "تأكيد فوري للحجز" : "Instant Confirmation"}
            </span>
            <span className="hidden opacity-40 sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
              {locale === "ar" ? "إقامات مرخصة وموثوقة" : "Licensed & Verified Stays"}
            </span>
            <span className="hidden opacity-40 sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              {locale === "ar" ? "ضيافة سعودية أصيلة" : "Authentic Saudi Hospitality"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
