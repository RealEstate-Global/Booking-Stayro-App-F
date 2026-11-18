"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getFeaturedHotels } from "@/data/hotels";
import { useLanguage } from "@/i18n/language-provider";
import { SectionBadge } from "@/components/shared/section-badge";
import { HotelCard } from "@/components/hotels/hotel-card";

/** Six hand-tracked featured stays on the home page. */
export function FeaturedStaysSection() {
  const { t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const featured = getFeaturedHotels();

  return (
    <section className="px-4 py-12 md:px-8 md:py-16">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div>
            <SectionBadge className="mb-4">{t.home.featuredBadge}</SectionBadge>
            <h2 className="text-3xl font-extrabold text-foreground md:text-5xl">
              {t.home.featuredTitle}
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">{t.home.featuredSubtitle}</p>
          </div>
          <Link
            href="/hotels"
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {t.home.viewAll}
            <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((hotel) => (
            <HotelCard key={hotel.slug} hotel={hotel} query="" />
          ))}
        </div>
      </div>
    </section>
  );
}
