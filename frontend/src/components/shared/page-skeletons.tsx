import type { ReactNode } from "react";

import { Skeleton } from "@/components/ui/skeleton";

/**
 * Route-matched loading placeholders. Each skeleton mirrors the real layout
 * (heights, grids, card shapes) so the streamed content swaps in without a
 * layout shift. Decorative shapes are aria-hidden; the region announces itself.
 */
function LoadingRegion({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="status" aria-live="polite" aria-label={label}>
      {children}
    </div>
  );
}

function SectionHeadingSkeleton({ center = false }: { center?: boolean }) {
  return (
    <div className={`mb-8 flex flex-col gap-3 md:mb-10 ${center ? "items-center" : ""}`}>
      <Skeleton className="h-6 w-28 rounded-full" />
      <Skeleton className="h-9 w-64 md:h-12 md:w-96" />
      <Skeleton className="h-4 w-80 max-w-full" />
    </div>
  );
}

export function SearchBarSkeleton() {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 md:px-8">
      <div className="grid gap-2 rounded-3xl border border-foreground/10 bg-card/80 p-4 shadow-lg backdrop-blur-sm md:grid-cols-[1.35fr_1fr_1fr_0.8fr_0.6fr_auto] md:items-center md:gap-4 md:rounded-full md:px-6 md:py-3">
        {["w-full", "w-full", "w-full", "w-3/4", "w-2/3"].map((width, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Skeleton className={`h-2.5 w-12 ${width}`} />
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
        <Skeleton className="h-11 w-full rounded-full md:h-12 md:w-28" />
      </div>
    </div>
  );
}

function HeroSkeleton() {
  return (
    <section className="relative -mt-16 min-h-svh w-full overflow-hidden bg-[#2b2729] md:-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
      <div className="container relative mx-auto flex min-h-svh flex-col items-center justify-center gap-5 px-4 pt-24 text-center md:px-8">
        <Skeleton className="h-7 w-56 rounded-full bg-white/10" />
        <Skeleton className="h-14 w-[min(90vw,42rem)] bg-white/10 md:h-20" />
        <Skeleton className="h-5 w-[min(80vw,32rem)] bg-white/10" />
        <Skeleton className="h-5 w-[min(65vw,26rem)] bg-white/10" />
        <div className="mt-6 w-full max-w-6xl">
          <SearchBarSkeleton />
        </div>
      </div>
    </section>
  );
}

function CityGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-48 rounded-2xl sm:h-56 md:h-64 ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
        />
      ))}
    </div>
  );
}

export function HotelCardSkeleton() {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-sm">
      <Skeleton className="h-48 w-full rounded-none sm:h-52" />
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-1/2" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-7 w-24" />
          </div>
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
      </div>
    </article>
  );
}

export function HotelGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <HotelCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Home route: hero, cities strip and featured stays. */
export function HomeSkeleton() {
  return (
    <LoadingRegion label="Loading home page">
      <div className="flex flex-1 flex-col">
        <HeroSkeleton />
        <section className="px-4 py-12 md:px-8 md:py-16">
          <div className="container mx-auto">
            <SectionHeadingSkeleton />
            <CityGridSkeleton />
          </div>
        </section>
        <section className="px-4 py-12 md:px-8 md:py-16">
          <div className="container mx-auto">
            <SectionHeadingSkeleton />
            <HotelGridSkeleton count={3} />
          </div>
        </section>
        <section className="px-4 pb-16 md:px-8">
          <div className="container mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-52 rounded-3xl" />
            ))}
          </div>
        </section>
      </div>
    </LoadingRegion>
  );
}

/** /hotels: search bar, city pills, results grid and pagination. */
export function HotelsSkeleton() {
  return (
    <LoadingRegion label="Loading stays">
      <div className="flex flex-1 flex-col gap-8 pb-16 pt-10">
        <SearchBarSkeleton />
        <div className="container mx-auto flex flex-wrap gap-2 px-4 md:px-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 md:px-8">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
        <div className="container mx-auto px-4 md:px-8">
          <HotelGridSkeleton count={6} />
        </div>
        <div className="container mx-auto flex justify-center gap-2 px-4 md:px-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-full" />
          ))}
        </div>
      </div>
    </LoadingRegion>
  );
}

/** /hotels/[slug]: gallery + sticky booking card. */
export function HotelDetailSkeleton() {
  return (
    <LoadingRegion label="Loading stay details">
      <div className="container mx-auto flex flex-1 flex-col gap-6 px-4 py-8 md:px-8 md:py-12">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-2/3 md:w-1/2" />
          <Skeleton className="h-5 w-56" />
        </div>
        <div className="grid gap-3 md:grid-cols-3 md:grid-rows-2">
          <Skeleton className="h-64 rounded-3xl md:col-span-2 md:row-span-2 md:h-full md:min-h-[26rem]" />
          <Skeleton className="hidden h-full rounded-3xl md:block" />
          <Skeleton className="hidden h-full rounded-3xl md:block" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <div className="grid gap-3 pt-4 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-12 rounded-xl" />
              ))}
            </div>
          </div>
          <Skeleton className="h-96 rounded-3xl" />
        </div>
      </div>
    </LoadingRegion>
  );
}

/** About / support / legal pages: heading, prose and feature cards. */
export function SimplePageSkeleton() {
  return (
    <LoadingRegion label="Loading page">
      <div className="container mx-auto flex flex-1 flex-col gap-6 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
        </div>
        <div className="mx-auto mt-6 grid w-full max-w-screen-xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-2xl" />
          ))}
        </div>
      </div>
    </LoadingRegion>
  );
}
