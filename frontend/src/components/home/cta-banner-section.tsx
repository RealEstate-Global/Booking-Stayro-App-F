"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StayroMark } from "@/components/shared/logo";
import { useLanguage } from "@/i18n/language-provider";

/** Full-width closing CTA in brand orange. */
export function CtaBannerSection() {
  const { t } = useLanguage();

  return (
    <section className="px-4 pb-16 md:px-8">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-12 text-center md:py-16">
          {/* Decorative watermark — positioned on the left side, exactly matching stayro.com reference */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-6 -top-6 h-64 w-64 select-none text-black/[0.14] sm:-left-10 sm:-top-8 sm:h-80 sm:w-80 md:-left-14 md:-top-10 md:h-[26rem] md:w-[26rem] lg:-left-16 lg:h-[28rem] lg:w-[28rem]"
          >
            <StayroMark className="h-full w-full" />
          </div>
          <h2 className="relative text-3xl font-extrabold text-[#221E1F] md:text-5xl">
            {t.home.ctaTitle}
          </h2>
          <p className="relative mx-auto mt-3 max-w-md font-medium text-[#221E1F]/85 md:text-lg">
            {t.home.ctaSubtitle}
          </p>
          <Button
            asChild
            size="lg"
            className="relative mt-7 rounded-full bg-[#262222] px-10 py-6 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1A1819] active:scale-95 cursor-pointer"
          >
            <Link href="/hotels">{t.home.ctaButton}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
