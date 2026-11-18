"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import type { Hotel } from "@/data/hotels";
import { amenityIcons } from "@/components/shared/amenity-icons";
import { useLanguage } from "@/i18n/language-provider";
import { SaudiRiyalSymbol } from "@/components/shared/saudi-riyal-symbol";
import { cities } from "@/data/cities";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface HotelCardProps {
  hotel: Hotel;
  /** Preserves the user's search across the card link */
  query: string;
}

export function HotelCard({ hotel, query }: HotelCardProps) {
  const { t, locale } = useLanguage();
  const city = cities.find((c) => c.id === hotel.city);
  const href = `/hotels/${hotel.slug}${query ? `?${query}` : ""}`;
  const ratingLabel = hotel.rating.toFixed(1);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      <Link href={href} className="relative block h-48 w-full overflow-hidden sm:h-52">
        <Image
          src={hotel.images[0]}
          alt={hotel.name}
          fill
          quality={80}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Rating badge */}
        <div
          className="absolute end-3 top-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 shadow-md backdrop-blur-md"
          aria-label={`${hotel.rating} ${t.hotelsPage.reviews}`}
        >
          <span className="rounded-md bg-primary px-1.5 py-0.5 text-xs font-extrabold text-primary-foreground">
            {ratingLabel}
          </span>
          <span className="text-xs font-medium text-foreground">
            {hotel.reviewsCount.toLocaleString(locale === "ar" ? "ar-SA" : "en-US")} {t.hotelsPage.reviews}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Name + stars */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-lg font-bold leading-snug text-foreground" title={hotel.name}>
            {hotel.name}
          </h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex shrink-0 items-center gap-0.5 pt-1 cursor-help" aria-label={`${hotel.stars} stars`}>
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                ))}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={4}>
              {locale === "ar" ? `تصنيف ${hotel.stars} نجوم معتمد` : `${hotel.stars}-Star Certified Rating`}
            </TooltipContent>
          </Tooltip>
        </div>

        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span className="line-clamp-1">
            {hotel.district[locale]}
            {city ? ` — ${city.name[locale]}` : ""}
          </span>
        </p>

        {/* Amenities */}
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {hotel.amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity];
            return (
              <li
                key={amenity}
                className="flex items-center gap-1 rounded-full border border-foreground/10 bg-foreground/5 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
              >
                <Icon className="h-3 w-3 text-primary" aria-hidden />
                {t.amenities[amenity]}
              </li>
            );
          })}
        </ul>

        {/* Price + CTA pinned to bottom — continuous modern card surface without inner divider */}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-3 gap-y-3 pt-4">
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-muted-foreground">{t.hotelsPage.startingFrom}</p>
            <div className="flex items-baseline gap-1 text-foreground">
              <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
                {hotel.priceSar.toLocaleString(locale === "ar" ? "ar-SA" : "en-US")}
              </span>
              <SaudiRiyalSymbol className="text-foreground" />
              <span className="text-xs font-medium text-muted-foreground ms-1">
                {t.hotelsPage.perNight}
              </span>
            </div>
          </div>
          <Button asChild className="shrink-0 rounded-full bg-primary font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all active:scale-95">
            <Link href={href}>{t.hotelsPage.bookNow}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
