"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { cities } from "@/data/cities";
import { useLanguage } from "@/i18n/language-provider";
import { SectionBadge } from "@/components/shared/section-badge";

/** Browsing strip of the five launch destinations (real city imagery). */
export function CitiesSection() {
  const { t, locale, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section className="px-4 py-12 md:px-8 md:py-16">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div>
            <SectionBadge className="mb-4">{t.home.citiesBadge}</SectionBadge>
            <h2 className="text-3xl font-extrabold text-foreground md:text-5xl">
              {t.home.citiesTitle}
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">{t.home.citiesSubtitle}</p>
          </div>
          <Link
            href="/hotels"
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {t.home.viewAll}
            <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {cities.map((city, index) => (
            <Link
              key={city.id}
              href={`/hotels?city=${city.id}`}
              className={cn(
                "group relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-2xl border border-foreground/10 transition-all duration-300 hover:border-primary/40 hover:shadow-lg",
                index === 4 && "col-span-2 sm:col-span-1"
              )}
              aria-label={`${t.home.exploreCity} — ${city.name[locale]}`}
            >
              <Image
                src={city.image}
                alt={city.name[locale]}
                fill
                quality={80}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <h3 className="text-base font-bold text-white md:text-xl">{city.name[locale]}</h3>
                <p className="mt-0.5 hidden text-[11px] text-white/75 md:block">{city.tagline[locale]}</p>
                <p className="mt-1.5 text-[11px] font-semibold text-primary">
                  +{city.propertiesCount} {t.home.propertiesUnit}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
