import type { Metadata } from "next";
import { Suspense } from "react";
import { HotelsView } from "@/components/pages/hotels-view";
import { HotelsSkeleton } from "@/components/shared/page-skeletons";

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
