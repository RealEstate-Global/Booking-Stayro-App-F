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
      {/* Full-height background image with enhanced quality and smooth bottom mask */}
      <Image
        src="/images/cities/riyadh.jpg"
        alt=""
        fill
        priority
        quality={95}
        sizes="100vw"
        style={{
          maskImage: "linear-gradient(to bottom, black 50%, black 72%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, black 72%, transparent 100%)",
        }}
        className="-z-10 object-cover object-[center_55%]"
      />
      {/* Legibility gradients — dark at the top/edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/45 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/20 to-transparent rtl:bg-gradient-to-l"
      />

      {/* Seamless bottom merge with reverse progressive blur and gradient into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 md:h-72 bg-gradient-to-t from-background via-background/85 via-45% to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 md:h-52 backdrop-blur-[12px] [mask-image:linear-gradient(to_top,black_25%,transparent_100%)] [webkit-mask-image:linear-gradient(to_top,black_25%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-8 md:h-14 bg-background"
      />

      <div className="container mx-auto w-full px-4 pb-14 pt-28 md:px-8 md:pb-16 md:pt-32">
        <div className="flex w-full max-w-5xl flex-col items-start gap-4 text-start md:gap-5">
          <span className="animate-fade-rise inline-flex w-fit items-center gap-2 rounded-full border border-primary/50 bg-black/55 px-4 py-2 text-xs font-semibold text-primary backdrop-blur-sm">
            <BadgeCheck className="h-4 w-4" aria-hidden />
            {t.home.heroBadge}
          </span>

          <h1 className="animate-fade-rise max-w-3xl text-[clamp(2.75rem,8vw,6.5rem)] font-extrabold leading-[1.05] text-white drop-shadow-lg">
            {t.home.heroTitle}
          </h1>

          <p className="animate-fade-rise max-w-2xl text-base text-white/90 md:text-xl">
            {t.home.heroSubtitle}
          </p>

          <div className="animate-fade-rise-late w-full">
            <StaySearchForm className="border-white/10 bg-background/90 shadow-2xl" />
          </div>

          <div className="animate-fade-rise-later flex flex-wrap items-center gap-x-6 gap-y-1 text-[11px] text-white/70">
            <span dir="ltr">{siteConfig.contacts.phones[0]}</span>
            <span>{siteConfig.contacts.emails[0]}</span>
            <span dir="ltr">{siteConfig.socials[0].handle}</span>
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
