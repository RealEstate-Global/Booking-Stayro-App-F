import type { Metadata } from "next";
import { Suspense } from "react";
import { HotelsView } from "@/components/pages/hotels-view";

export const metadata: Metadata = {
  title: "الإقامات",
  description:
    "إقامات سعودية مرخّصة — ابحث واكتشف فنادق وشقق وشاليهات ومنتجعات في مكة والمدينة والرياض وجدة والدمام مع ستيرو.",
};

export default function HotelsPage() {
  return (
    <Suspense fallback={<HotelsSkeleton />}>
      <HotelsView />
    </Suspense>
  );
}

function HotelsSkeleton() {
  return (
    <div className="container mx-auto flex flex-1 flex-col gap-6 px-4 py-8 md:px-8" aria-hidden>
      <div className="mx-auto h-8 w-64 animate-pulse rounded-full bg-foreground/10" />
      <div className="h-14 w-full animate-pulse rounded-3xl bg-foreground/10" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-80 animate-pulse rounded-2xl bg-foreground/10" />
        ))}
      </div>
    </div>
  );
}
