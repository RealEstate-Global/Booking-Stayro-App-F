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
          {/* Decorative watermark — centered with soft radial fade, completely within bounds with zero border cutting */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10 [mask-image:radial-gradient(circle_at_center,black_40%,transparent_75%)]"
          >
            <StayroMark className="h-64 w-64 text-primary-foreground md:h-80 md:w-80" />
          </div>
          <h2 className="relative text-3xl font-extrabold text-primary-foreground md:text-5xl">
            {t.home.ctaTitle}
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-primary-foreground/85 md:text-lg">
            {t.home.ctaSubtitle}
          </p>
          <Button
            asChild
            size="lg"
            className="relative mt-7 rounded-full bg-background px-10 py-6 text-lg font-bold text-foreground transition-transform hover:scale-105 hover:bg-background/90"
          >
            <Link href="/hotels">{t.home.ctaButton}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
