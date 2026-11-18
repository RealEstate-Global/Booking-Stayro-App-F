"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Star,
  MapPin,
  Users,
  BedDouble,
  Quote,
} from "lucide-react";
import type { Hotel } from "@/data/hotels";
import { cities } from "@/data/cities";
import { amenityIcons } from "@/components/shared/amenity-icons";
import { DatePickerField } from "@/components/shared/date-picker-field";
import { useLanguage } from "@/i18n/language-provider";
import {
  calculatePrice,
  countNights,
  defaultDates,
  formatSar,
  generateBookingReference,
  parseDateParam,
} from "@/lib/booking";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HotelDetailViewProps {
  hotel: Hotel;
  searchParams: {
    checkIn?: string;
    checkOut?: string;
    guests?: string;
    rooms?: string;
  };
}

export function HotelDetailView({ hotel, searchParams }: HotelDetailViewProps) {
  const { t, locale, dir } = useLanguage();
  const router = useRouter();

  const city = cities.find((c) => c.id === hotel.city);
  const BackArrow = dir === "rtl" ? ArrowRight : ArrowLeft;
  const backParams = new URLSearchParams(
    Object.entries(searchParams).filter(([, v]) => Boolean(v)) as [string, string][]
  ).toString();

  const defaults = useMemo(() => defaultDates(), []);
  const [checkIn, setCheckIn] = useState(
    () => parseDateParam(searchParams.checkIn) ?? defaults.checkIn
  );
  const [checkOut, setCheckOut] = useState(
    () => parseDateParam(searchParams.checkOut) ?? defaults.checkOut
  );
  const [guests, setGuests] = useState(searchParams.guests ?? "2");
  const [rooms, setRooms] = useState(searchParams.rooms ?? "1");
  const [reference, setReference] = useState<string | null>(null);

  const nights = countNights(checkIn, checkOut);
  const { subtotal, vat, total } = calculatePrice(hotel.priceSar, nights);

  const handleCheckInChange = (next: Date | undefined) => {
    if (!next) return;
    setCheckIn(next);
    if (checkOut <= next) {
      const plusOne = new Date(next);
      plusOne.setDate(next.getDate() + 1);
      setCheckOut(plusOne);
    }
  };

  const handleConfirm = () => setReference(generateBookingReference());

  return (
    <div className="px-4 pb-16 pt-6 md:px-8">
      <div className="container mx-auto">
        {/* Back + verified badge */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={backParams ? `/hotels?${backParams}` : "/hotels"}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <BackArrow className="h-4 w-4" aria-hidden />
            {t.hotelDetail.backToResults}
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
            <BadgeCheck className="h-4 w-4" aria-hidden />
            {t.hotelDetail.verifiedStay}
          </span>
        </div>

        {/* Gallery */}
        <div className="grid gap-3 md:grid-cols-3 md:grid-rows-2">
          <div className="relative h-64 overflow-hidden rounded-3xl border border-foreground/10 md:col-span-2 md:row-span-2 md:h-full md:min-h-[26rem]">
            <Image
              src={hotel.images[0]}
              alt={hotel.name}
              fill
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover"
            />
          </div>
          {hotel.images.slice(1, 3).map((src, i) => (
            <div
              key={src + i}
              className="relative hidden h-full min-h-[12.75rem] overflow-hidden rounded-3xl border border-foreground/10 md:block"
            >
              <Image
                src={src}
                alt={`${hotel.name} — ${i + 2}`}
                fill
                quality={90}
                sizes="33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Content grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Main info */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {hotel.rating.toFixed(1)} · {hotel.reviewsCount.toLocaleString(locale === "ar" ? "ar-SA" : "en-US")} {t.hotelsPage.reviews}
              </span>
            </div>

            <h1 className="mt-2 text-3xl font-extrabold text-foreground md:text-5xl">{hotel.name}</h1>
            <p className="mt-2 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden />
              {hotel.district[locale]}
              {city ? ` — ${city.name[locale]}` : ""}
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/85">
              {hotel.description[locale]}
            </p>

            {/* Amenities */}
            <h2 className="mt-8 text-xl font-bold text-foreground">{t.hotelDetail.amenitiesTitle}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {hotel.amenities.map((amenity) => {
                const Icon = amenityIcons[amenity];
                return (
                  <li
                    key={amenity}
                    className="flex items-center gap-2 rounded-2xl border border-foreground/10 bg-card/50 px-4 py-3 text-sm font-medium text-muted-foreground"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                    {t.amenities[amenity]}
                  </li>
                );
              })}
            </ul>

            {/* Guest reviews (demo stories from the Stayro community) */}
            <h2 className="mt-8 text-xl font-bold text-foreground">{t.hotelDetail.reviewsTitle}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {t.home.testimonials.slice(0, 4).map((review) => (
                <figure
                  key={review.name}
                  className="rounded-3xl border border-foreground/10 bg-card/60 p-5 backdrop-blur-sm"
                >
                  <Quote className="h-6 w-6 text-primary/40" aria-hidden />
                  <blockquote className="mt-2 text-sm leading-relaxed text-foreground/90">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-3 text-xs font-bold text-muted-foreground">
                    {review.name} — {review.city}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Booking card */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 border-primary/30 bg-card/80 p-6 shadow-2xl backdrop-blur-md">
              {reference ? (
                /* Success state */
                <div className="flex flex-col items-center gap-4 py-4 text-center">
                  <CheckCircle2 className="h-16 w-16 text-primary" aria-hidden />
                  <h2 className="text-2xl font-extrabold text-foreground">{t.hotelDetail.confirmedTitle}</h2>
                  <p className="text-sm text-muted-foreground">{t.hotelDetail.confirmedNote}</p>
                  <div className="rounded-2xl border border-primary/40 bg-primary/10 px-6 py-4">
                    <p className="text-xs font-medium text-muted-foreground">{t.hotelDetail.reference}</p>
                    <p className="mt-1 font-mono text-2xl font-extrabold tracking-widest text-primary" dir="ltr">
                      {reference}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.hotelDetail.demoNote}</p>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/hotels")}
                    className="rounded-full"
                  >
                    {t.hotelDetail.bookAnother}
                  </Button>
                </div>
              ) : (
                /* Booking form */
                <>
                  <div className="flex items-end justify-between border-b border-foreground/10 pb-4">
                    <div>
                      <p className="text-[11px] text-muted-foreground">{t.hotelsPage.startingFrom}</p>
                      <p className="text-3xl font-extrabold text-foreground">
                        {formatSar(hotel.priceSar, locale)}
                        <span className="text-sm font-medium text-muted-foreground">
                          {" "}
                          {t.hotelsPage.perNight}
                        </span>
                      </p>
                    </div>
                    <span className="rounded-xl bg-primary px-3 py-1.5 text-sm font-extrabold text-primary-foreground">
                      {hotel.rating.toFixed(1)}
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg font-bold text-foreground">{t.hotelDetail.bookingTitle}</h2>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <Label htmlFor="detail-checkin" className="text-xs text-muted-foreground">
                        {t.search.checkIn}
                      </Label>
                      <div className="mt-1 flex h-12 items-center rounded-2xl border border-foreground/10 bg-background px-3 transition-colors hover:border-primary/40 focus-within:border-primary/60">
                        <DatePickerField
                          id="detail-checkin"
                          aria-label={t.search.checkIn}
                          date={checkIn}
                          onSelect={handleCheckInChange}
                          showArrow={false}
                        />
                      </div>
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="detail-checkout" className="text-xs text-muted-foreground">
                        {t.search.checkOut}
                      </Label>
                      <div className="mt-1 flex h-12 items-center rounded-2xl border border-foreground/10 bg-background px-3 transition-colors hover:border-primary/40 focus-within:border-primary/60">
                        <DatePickerField
                          id="detail-checkout"
                          aria-label={t.search.checkOut}
                          date={checkOut}
                          onSelect={(next) => next && setCheckOut(next)}
                          minDate={new Date(checkIn.getTime() + 86_400_000)}
                          showArrow={false}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="detail-guests" className="text-xs text-muted-foreground">
                        {t.hotelDetail.guestsLabel}
                      </Label>
                      <div className="relative mt-1">
                        <Users className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" aria-hidden />
                        <Select value={guests} onValueChange={setGuests}>
                          <SelectTrigger id="detail-guests" className="h-11 ps-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                              <SelectItem key={n} value={String(n)}>
                                {n} {t.search.guestsUnit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="detail-rooms" className="text-xs text-muted-foreground">
                        {t.hotelDetail.roomsLabel}
                      </Label>
                      <div className="relative mt-1">
                        <BedDouble className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" aria-hidden />
                        <Select value={rooms} onValueChange={setRooms}>
                          <SelectTrigger id="detail-rooms" className="h-11 ps-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => (
                              <SelectItem key={n} value={String(n)}>
                                {n} {t.search.roomsUnit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <dl className="mt-5 space-y-2 border-t border-foreground/10 pt-4 text-sm">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <dt>
                        {formatSar(hotel.priceSar, locale)} × {nights}{" "}
                        {nights === 1 ? t.hotelDetail.night : t.hotelDetail.nights}
                      </dt>
                      <dd dir="ltr">{formatSar(subtotal, locale)}</dd>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <dt>{t.hotelDetail.vat}</dt>
                      <dd dir="ltr">{formatSar(vat, locale)}</dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-foreground/10 pt-2 text-base font-extrabold text-foreground">
                      <dt>{t.hotelDetail.total}</dt>
                      <dd dir="ltr">{formatSar(total, locale)}</dd>
                    </div>
                  </dl>
                  <p className="mt-1 text-[10px] text-muted-foreground">{t.hotelDetail.taxesIncluded}</p>

                  <Button
                    size="lg"
                    onClick={handleConfirm}
                    className="mt-4 h-12 w-full rounded-full bg-primary text-lg font-bold text-primary-foreground hover:bg-primary/90"
                  >
                    {t.hotelDetail.confirm}
                  </Button>
                  <p className="mt-2 text-center text-[10px] text-muted-foreground">{t.hotelDetail.demoNote}</p>
                </>
              )}
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
