"use client";

import Image from "next/image";
import { ShieldCheck, Heart, MapPin, Headset, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { SectionBadge } from "@/components/shared/section-badge";

const icons: LucideIcon[] = [ShieldCheck, Heart, MapPin, Headset];

/** Why Stayro — mirrors the brand values with a real room visual. */
export function WhyStayroSection() {
  const { t } = useLanguage();

  return (
    <section className="px-4 py-12 md:px-8 md:py-16">
      <div className="container mx-auto grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Visual panel */}
        <div className="relative mx-auto h-[360px] w-full max-w-md overflow-hidden rounded-[2.5rem] border border-foreground/10 shadow-2xl md:h-[480px] md:max-w-lg lg:mx-0">
          <Image
            src="/images/hotels/room-suite.webp"
            alt="غرفة فندقية مع ستيرو — Every Stayro stay"
            fill
            quality={80}
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <p className="absolute bottom-5 start-6 text-sm font-semibold text-white/90">
            {t.home.heroTitle}
          </p>
        </div>

        {/* Reasons */}
        <div>
          <SectionBadge className="mb-4">{t.home.whyBadge}</SectionBadge>
          <h2 className="text-3xl font-extrabold text-foreground md:text-5xl">{t.home.whyTitle}</h2>
          <p className="mt-3 max-w-lg text-muted-foreground">{t.home.whySubtitle}</p>

          <ul className="mt-8 space-y-5">
            {t.aboutPage.values.map((value, index) => {
              const Icon = icons[index % icons.length];
              return (
                <li key={value.title} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-bold text-foreground">{value.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
