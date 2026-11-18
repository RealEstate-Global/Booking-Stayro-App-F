"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  BedDouble,
  Users,
  CalendarDays,
  MapPin,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { hotels } from "@/data/hotels";
import { cities, getCityById } from "@/data/cities";
import { useLanguage } from "@/i18n/language-provider";
import { StaySearchForm } from "@/components/shared/stay-search-form";
import { HotelCard } from "@/components/hotels/hotel-card";
import { SectionBadge } from "@/components/shared/section-badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ITEMS_PER_PAGE = 6;
type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

export function HotelsView() {
  const { t, locale, dir } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL query parameters
  const city = searchParams.get("city") ?? "all";
  const rawQ = searchParams.get("q") ?? "";
  const guests = searchParams.get("guests") ?? "2";
  const rooms = searchParams.get("rooms") ?? "1";
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const sortParam = (searchParams.get("sort") as SortKey) ?? "recommended";
  const pageParam = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

  // Local state for search text to allow smooth typing
  const [prevRawQ, setPrevRawQ] = useState(rawQ);
  const [searchInput, setSearchInput] = useState(rawQ);

  // Sync search input when URL query changes (official React pattern without useEffect)
  if (rawQ !== prevRawQ) {
    setPrevRawQ(rawQ);
    setSearchInput(rawQ);
  }

  // Helper to build URL with updated search params
  const updateUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === "" || (key === "city" && val === "all") || (key === "page" && val === "1") || (key === "sort" && val === "recommended")) {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    const queryString = params.toString();
    router.push(`/hotels${queryString ? `?${queryString}` : ""}`);
  };

  // City filter tabs
  const handleCitySelect = (selectedCityId: string) => {
    updateUrl({ city: selectedCityId === "all" ? null : selectedCityId, page: "1" });
  };

  // Search input handlers
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl({ q: searchInput.trim() ? searchInput.trim() : null, page: "1" });
  };

  const handleClearSearch = () => {
    setSearchInput("");
    updateUrl({ q: null, page: "1" });
  };

  // Sort handler
  const handleSortChange = (newSort: string) => {
    updateUrl({ sort: newSort === "recommended" ? null : newSort, page: "1" });
  };

  // Page handler
  const handlePageChange = (newPage: number) => {
    updateUrl({ page: newPage === 1 ? null : String(newPage) });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  // Filter & Sort calculation
  const filteredAndSortedHotels = useMemo(() => {
    let result = [...hotels];

    // 1. Filter by city
    if (city && city !== "all") {
      result = result.filter((h) => h.city === city);
    }

    // 2. Filter by search query (name, district, city name, description)
    const query = rawQ.trim().toLowerCase();
    if (query) {
      result = result.filter((h) => {
        const nameMatch = h.name.toLowerCase().includes(query);
        const districtArMatch = h.district.ar.toLowerCase().includes(query);
        const districtEnMatch = h.district.en.toLowerCase().includes(query);
        const descArMatch = h.description.ar.toLowerCase().includes(query);
        const descEnMatch = h.description.en.toLowerCase().includes(query);
        const hotelCity = getCityById(h.city);
        const cityArMatch = hotelCity?.name.ar.toLowerCase().includes(query);
        const cityEnMatch = hotelCity?.name.en.toLowerCase().includes(query);

        return (
          nameMatch ||
          districtArMatch ||
          districtEnMatch ||
          descArMatch ||
          descEnMatch ||
          Boolean(cityArMatch) ||
          Boolean(cityEnMatch)
        );
      });
    }

    // 3. Sort
    switch (sortParam) {
      case "price-asc":
        return result.sort((a, b) => a.priceSar - b.priceSar);
      case "price-desc":
        return result.sort((a, b) => b.priceSar - a.priceSar);
      case "rating":
        return result.sort((a, b) => b.rating - a.rating);
      case "recommended":
      default:
        return result.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    }
  }, [city, rawQ, sortParam]);

  // Pagination calculation
  const totalItems = filteredAndSortedHotels.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const currentPage = Math.min(pageParam, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedHotels = filteredAndSortedHotels.slice(startIndex, endIndex);

  const selectedCity = getCityById(city === "all" ? undefined : city);
  const summaryCity = selectedCity ? selectedCity.name[locale] : t.hotelsPage.allCities;
  const currentQueryString = searchParams.toString();

  const PrevIcon = dir === "rtl" ? ChevronRight : ChevronLeft;
  const NextIcon = dir === "rtl" ? ChevronLeft : ChevronRight;

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
          initialQ={rawQ}
          onCityChange={handleCitySelect}
        />

        {/* City Filter Pills / Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => handleCitySelect("all")}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              city === "all"
                ? "bg-primary text-primary-foreground shadow-md scale-105"
                : "border border-foreground/15 bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            <span>{t.hotelsPage.allCities}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                city === "all" ? "bg-white/25 text-white" : "bg-foreground/10 text-foreground"
              }`}
            >
              {hotels.length}
            </span>
          </button>
          {cities.map((c) => {
            const count = hotels.filter((h) => h.city === c.id).length;
            const isActive = city === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleCitySelect(c.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "border border-foreground/15 bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <span>{c.name[locale]}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                    isActive ? "bg-white/25 text-white" : "bg-foreground/10 text-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input & Sort Toolbar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-card/40 p-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Keyword Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              id="hotels-keyword-search"
              name="q"
              type="search"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder={t.hotelsPage.searchPlaceholder}
              aria-label={t.hotelsPage.searchLabel}
              className="h-10 w-full rounded-full border-foreground/15 bg-background/80 ps-9 pe-9 text-sm placeholder:text-muted-foreground/70 focus-visible:ring-primary"
            />
            {searchInput ? (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label={t.hotelsPage.clearSearch}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </form>

          {/* Sort selector */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline font-medium">{t.hotelsPage.sortRecommended}:</span>
            </div>
            <Select name="sort" value={sortParam} onValueChange={handleSortChange}>
              <SelectTrigger
                id="hotels-sort-trigger"
                name="sort"
                aria-label={t.hotelsPage.sortRecommended}
                className="h-10 w-[180px] rounded-full border-foreground/15 bg-background/80 text-xs font-semibold"
              >
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

        {/* Summary info strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground/10 pb-3 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
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
            {rawQ ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                &ldquo;{rawQ}&rdquo;
              </span>
            ) : null}
          </div>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {totalItems > 0
              ? t.hotelsPage.showingResults
                  .replace("{start}", String(totalItems === 0 ? 0 : startIndex + 1))
                  .replace("{end}", String(endIndex))
                  .replace("{total}", String(totalItems))
              : `0 ${t.hotelsPage.resultsCount}`}
          </span>
        </div>

        {/* Results grid / empty state */}
        {totalItems > 0 ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedHotels.map((hotel) => (
                <HotelCard key={hotel.slug} hotel={hotel} query={currentQueryString} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 ? (
              <nav
                role="navigation"
                aria-label={t.hotelsPage.paginationAria}
                className="mt-6 flex flex-wrap items-center justify-center gap-2 pt-4"
              >
                {/* Previous Page */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="rounded-full px-3 text-xs font-semibold gap-1"
                  aria-label={t.hotelsPage.prevPage}
                >
                  <PrevIcon className="h-4 w-4" aria-hidden />
                  <span className="hidden sm:inline">{t.hotelsPage.prevPage}</span>
                </Button>

                {/* Page Number Pills */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const isCurrent = p === currentPage;
                  return (
                    <Button
                      key={p}
                      variant={isCurrent ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(p)}
                      className={`h-9 w-9 rounded-full p-0 text-xs font-bold transition-transform ${
                        isCurrent ? "bg-primary text-primary-foreground scale-105 shadow-md" : ""
                      }`}
                      aria-current={isCurrent ? "page" : undefined}
                      aria-label={t.hotelsPage.pageNumberAria.replace("{page}", String(p))}
                    >
                      {p}
                    </Button>
                  );
                })}

                {/* Next Page */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="rounded-full px-3 text-xs font-semibold gap-1"
                  aria-label={t.hotelsPage.nextPage}
                >
                  <span className="hidden sm:inline">{t.hotelsPage.nextPage}</span>
                  <NextIcon className="h-4 w-4" aria-hidden />
                </Button>
              </nav>
            ) : null}
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
            <p className="text-6xl font-extrabold text-primary/20">0</p>
            <h2 className="text-2xl font-bold text-foreground">{t.hotelsPage.emptyTitle}</h2>
            <p className="max-w-md text-muted-foreground">{t.hotelsPage.emptySubtitle}</p>
            <Button
              onClick={() => {
                setSearchInput("");
                router.push("/hotels");
              }}
              className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer"
            >
              {t.hotelsPage.resetSearch}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
