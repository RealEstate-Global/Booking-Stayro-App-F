import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hotels, getHotelBySlug } from "@/data/hotels";
import { HotelDetailView } from "@/components/pages/hotel-detail-view";

interface HotelDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    checkIn?: string;
    checkOut?: string;
    guests?: string;
    rooms?: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return hotels.map((hotel) => ({ slug: hotel.slug }));
}

export async function generateMetadata({
  params,
}: HotelDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const hotel = getHotelBySlug(slug);
  if (!hotel) return { title: "Not found" };

  return {
    title: hotel.name,
    description: hotel.description.ar,
    openGraph: {
      title: hotel.name,
      description: hotel.description.ar,
      images: [{ url: hotel.images[0], alt: hotel.name }],
    },
  };
}

export default async function HotelDetailPage({
  params,
  searchParams,
}: HotelDetailPageProps) {
  const { slug } = await params;
  const hotel = getHotelBySlug(slug);
  if (!hotel) notFound();

  const sp = await searchParams;
  return <HotelDetailView hotel={hotel} searchParams={sp} />;
}
