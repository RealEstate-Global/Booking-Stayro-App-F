"use client";

import Image from "next/image";
import { BadgeCheck, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/language-provider";
import { StaySearchForm } from "@/components/shared/stay-search-form";

/**
 * Stayro home hero — full-viewport background (Riyadh skyline) with the
 * licensed Stayro headline and the live stays search front and center.
 */
export function StayHeroSection() {
  const { t } = useLanguage();

  return (
    <section
      aria-label={t.home.heroTitle}
      className="relative isolate -mt-16 flex min-h-svh w-full flex-col justify-center overflow-hidden md:-mt-20"
    >
      {/* Full-height background image with smooth reverse gradient fade into canvas */}
      <Image
        src="/images/cities/riyadh.webp"
        alt=""
        fill
        priority
        quality={95}
        sizes="100vw"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.4) 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.4) 80%, transparent 100%)",
        }}
        className="-z-10 object-cover object-[center_55%]"
      />
      {/* Legibility gradients — dark at the top and fading smoothly to transparent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-black/45 via-45% to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/20 to-transparent rtl:bg-gradient-to-l"
      />

      {/* Seamless progressive reverse blur — fades to 0 at bottom with zero solid cut */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-36 md:h-60 backdrop-blur-[6px] [mask-image:linear-gradient(to_top,black_0%,transparent_100%)] [webkit-mask-image:linear-gradient(to_top,black_0%,transparent_100%)]"
      />

      <div className="container mx-auto w-full px-4 pb-14 pt-28 md:px-8 md:pb-16 md:pt-32">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 text-center md:gap-6">
          <span className="animate-fade-rise inline-flex w-fit items-center gap-2 rounded-full border border-primary/50 bg-black/55 px-4 py-2 text-xs font-semibold text-primary backdrop-blur-sm">
            <BadgeCheck className="h-4 w-4" aria-hidden />
            {t.home.heroBadge}
          </span>

          <h1 className="animate-fade-rise max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.08] text-white drop-shadow-lg">
            {t.home.heroTitle}
          </h1>

          <p className="animate-fade-rise max-w-2xl text-base text-white/90 md:text-xl">
            {t.home.heroSubtitle}
          </p>

          <div className="animate-fade-rise-late w-full pt-2">
            <StaySearchForm className="mx-auto border-white/10 bg-background/95 shadow-2xl" />
          </div>

          <div className="animate-fade-rise-later flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/75">
            <span dir="ltr" className="transition-colors hover:text-primary">
              {siteConfig.contacts.phones[0]}
            </span>
            <span className="hidden opacity-40 sm:inline">•</span>
            <span className="transition-colors hover:text-primary">
              {siteConfig.contacts.emails[0]}
            </span>
            <span className="hidden opacity-40 sm:inline">•</span>
            <span dir="ltr" className="transition-colors hover:text-primary">
              {siteConfig.socials[0].handle}
            </span>
          </div>
        </div>
      </div>

      {/* Floating rating card — top-end corner, lg+ only */}
      <div className="animate-float-y absolute end-6 top-28 z-10 hidden items-center gap-3 rounded-2xl border border-white/15 bg-black/60 p-3 pe-4 backdrop-blur-md lg:flex">
        <Star className="h-8 w-8 fill-primary text-primary" aria-hidden />
        <div>
          <p className="text-lg font-extrabold leading-none text-white">4.9</p>
          <p className="mt-1 text-[10px] text-white/75">
            {t.hotelsPage.ratingOutOf} · 12,000+ {t.hotelsPage.reviews}
          </p>
        </div>
      </div>
    </section>
  );
}
