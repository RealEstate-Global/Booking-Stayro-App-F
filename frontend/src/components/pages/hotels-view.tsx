"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, BedDouble, Users, CalendarDays, MapPin } from "lucide-react";
import { hotels, getHotelsByCity } from "@/data/hotels";
import { getCityById } from "@/data/cities";
import { useLanguage } from "@/i18n/language-provider";
import { StaySearchForm } from "@/components/shared/stay-search-form";
import { HotelCard } from "@/components/hotels/hotel-card";
import { SectionBadge } from "@/components/shared/section-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

export function HotelsView() {
  const { t, locale } = useLanguage();
  const searchParams = useSearchParams();

  const city = searchParams.get("city") ?? "all";
  const guests = searchParams.get("guests") ?? "2";
  const rooms = searchParams.get("rooms") ?? "1";
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const query = searchParams.toString();

  const [sort, setSort] = useState<SortKey>("recommended");

  const results = useMemo(() => {
    const base = city === "all" ? [...hotels] : [...getHotelsByCity(city)];
    switch (sort) {
      case "price-asc":
        return base.sort((a, b) => a.priceSar - b.priceSar);
      case "price-desc":
        return base.sort((a, b) => b.priceSar - a.priceSar);
      case "rating":
        return base.sort((a, b) => b.rating - a.rating);
      case "recommended":
      default:
        return base.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    }
  }, [city, sort]);

  const selectedCity = getCityById(city === "all" ? undefined : city);
  const summaryCity = selectedCity ? selectedCity.name[locale] : t.search.anyCity;

  return (
    <div className="flex flex-1 flex-col px-4 pb-16 pt-6 md:px-8">
      <div className="container mx-auto flex flex-1 flex-col gap-6">
        {/* Header */}
        <div className="text-center">
          <SectionBadge className="mb-3">{t.hotelsPage.badge}</SectionBadge>
          <h1 className="text-3xl font-extrabold text-foreground md:text-5xl">{t.hotelsPage.title}</h1>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">{t.hotelsPage.subtitle}</p>
        </div>

        {/* Search bar (prefilled from URL) */}
        <StaySearchForm
          initialCity={city === "all" ? "all" : city}
          initialCheckIn={checkIn || undefined}
          initialCheckOut={checkOut || undefined}
          initialGuests={Number(guests) || 2}
          initialRooms={Number(rooms) || 1}
        />

        {/* Toolbar: summary + sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground/10 pb-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 font-semibold text-foreground">
              <MapPin className="h-4 w-4 text-primary" aria-hidden />
              {summaryCity}
            </span>
            {checkIn && checkOut ? (
              <span className="flex items-center gap-1.5" dir="ltr">
                <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
                {checkIn} → {checkOut}
              </span>
            ) : null}
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-primary" aria-hidden /> {guests}
              <BedDouble className="ms-1 h-4 w-4 text-primary" aria-hidden /> {rooms}
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              {results.length} {t.hotelsPage.resultsCount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" aria-hidden />
            <Select name="sort" value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger id="hotels-sort-trigger" name="sort" aria-label={t.hotelsPage.sortRecommended} className="h-10 w-[190px] rounded-full border-foreground/15 bg-transparent text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">{t.hotelsPage.sortRecommended}</SelectItem>
                <SelectItem value="price-asc">{t.hotelsPage.sortPriceAsc}</SelectItem>
                <SelectItem value="price-desc">{t.hotelsPage.sortPriceDesc}</SelectItem>
                <SelectItem value="rating">{t.hotelsPage.sortRating}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results grid / empty state */}
        {results.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((hotel) => (
              <HotelCard key={hotel.slug} hotel={hotel} query={query} />
            ))}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
            <p className="text-6xl font-extrabold text-primary/20">0</p>
            <h2 className="text-2xl font-bold text-foreground">{t.hotelsPage.emptyTitle}</h2>
            <p className="max-w-md text-muted-foreground">{t.hotelsPage.emptySubtitle}</p>
            <Link
              href="/hotels"
              className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {t.hotelsPage.resetSearch}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
