"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Users, BedDouble, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/language-provider";
import { cities, getCityById } from "@/data/cities";
import { defaultDates, toISODate, parseDateParam } from "@/lib/booking";
import { DatePickerField } from "@/components/shared/date-picker-field";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface StaySearchFormProps {
  className?: string;
  /** Initial values — used to prefill from the URL on /hotels */
  initialCity?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  initialRooms?: number;
  /** Optional search query preservation */
  initialQ?: string;
  /** Optional callback when destination changes directly */
  onCityChange?: (cityId: string) => void;
}

/**
 * The Stayro stays search bar — destination, reusable calendar date pickers,
 * guests/rooms and a search action. Fully responsive and RTL/LTR compliant.
 */
export function StaySearchForm({
  className,
  initialCity,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  initialRooms = 1,
  initialQ,
  onCityChange,
}: StaySearchFormProps) {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const defaults = useMemo(() => defaultDates(), []);

  // Default to "all" (All Cities) instead of forcing the first city
  const [prevCity, setPrevCity] = useState(initialCity);
  const [city, setCity] = useState(initialCity ?? "all");

  const [prevGuests, setPrevGuests] = useState(initialGuests);
  const [guests, setGuests] = useState(String(initialGuests));

  const [prevRooms, setPrevRooms] = useState(initialRooms);
  const [rooms, setRooms] = useState(String(initialRooms));

  const [checkIn, setCheckIn] = useState<Date>(
    () => parseDateParam(initialCheckIn) ?? defaults.checkIn
  );
  const [checkOut, setCheckOut] = useState<Date>(
    () => parseDateParam(initialCheckOut) ?? defaults.checkOut
  );

  // Sync state when props change during render (official React pattern)
  if (initialCity !== prevCity) {
    setPrevCity(initialCity);
    setCity(initialCity ?? "all");
  }

  if (initialGuests !== prevGuests) {
    setPrevGuests(initialGuests);
    setGuests(String(initialGuests));
  }

  if (initialRooms !== prevRooms) {
    setPrevRooms(initialRooms);
    setRooms(String(initialRooms));
  }

  const currentCity = useMemo(
    () => (city === "all" ? undefined : getCityById(city)),
    [city]
  );

  const handleCheckIn = (next: Date | undefined) => {
    if (!next) return;
    setCheckIn(next);
    if (checkOut <= next) {
      const plusOne = new Date(next);
      plusOne.setDate(next.getDate() + 1);
      setCheckOut(plusOne);
    }
  };

  const handleDestinationChange = (nextCity: string) => {
    setCity(nextCity);
    if (onCityChange) {
      onCityChange(nextCity);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (city && city !== "all") {
      params.set("city", city);
    } else {
      params.set("city", "all");
    }
    if (checkIn) params.set("checkIn", toISODate(checkIn));
    if (checkOut) params.set("checkOut", toISODate(checkOut));
    if (guests) params.set("guests", guests);
    if (rooms) params.set("rooms", rooms);
    if (initialQ && initialQ.trim()) params.set("q", initialQ.trim());
    params.set("page", "1");

    router.push(`/hotels?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label={t.search.submit}
      className={cn(
        "w-full rounded-3xl border border-foreground/10 bg-card/90 p-3 shadow-2xl backdrop-blur-xl transition-all",
        "grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3",
        "lg:flex lg:flex-row lg:items-center lg:rounded-full lg:p-2 lg:gap-0 lg:divide-x lg:rtl:divide-x-reverse lg:divide-foreground/10",
        className
      )}
    >
      {/* Destination */}
      <div className="flex-[1.3] min-w-0 col-span-1 sm:col-span-2 lg:col-span-1">
        <Select
          name="destination"
          value={city}
          onValueChange={handleDestinationChange}
        >
          <SelectTrigger
            id="search-city"
            name="destination"
            aria-label={t.search.destination}
            className="flex h-14 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-2xl border-0 bg-transparent px-3 text-start shadow-none transition-colors hover:bg-foreground/5 focus:ring-0 focus:ring-offset-0 lg:h-14 lg:rounded-full [&>svg]:hidden"
          >
            <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div className="flex flex-col text-start min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground truncate leading-tight">
                {t.search.destination}
              </span>
              <span className="truncate text-sm font-semibold text-foreground leading-tight">
                {currentCity ? currentCity.name[locale] : t.search.anyCity}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-60 text-muted-foreground ms-auto" aria-hidden />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.search.anyCity}</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name[locale]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Check-in */}
      <div className="flex-1 min-w-0 col-span-1">
        <DatePickerField
          id="search-checkin"
          aria-label={t.search.checkIn}
          label={t.search.checkIn}
          date={checkIn}
          onSelect={handleCheckIn}
          formatAs="d MMM"
          showArrow={true}
          className="h-14 rounded-2xl px-3 hover:bg-foreground/5 lg:rounded-full"
        />
        <input
          type="hidden"
          id="search-checkin-value"
          name="checkIn"
          value={checkIn ? checkIn.toISOString() : ""}
        />
      </div>

      {/* Check-out */}
      <div className="flex-1 min-w-0 col-span-1">
        <DatePickerField
          id="search-checkout"
          aria-label={t.search.checkOut}
          label={t.search.checkOut}
          date={checkOut}
          onSelect={(next) => next && setCheckOut(next)}
          minDate={new Date(checkIn.getTime() + 86_400_000)}
          formatAs="d MMM"
          showArrow={true}
          className="h-14 rounded-2xl px-3 hover:bg-foreground/5 lg:rounded-full"
        />
        <input
          type="hidden"
          id="search-checkout-value"
          name="checkOut"
          value={checkOut ? checkOut.toISOString() : ""}
        />
      </div>

      {/* Guests */}
      <div className="flex-[0.9] min-w-0 col-span-1">
        <Select name="guests" value={guests} onValueChange={setGuests}>
          <SelectTrigger
            id="search-guests"
            name="guests"
            aria-label={`${t.search.guests}: ${guests}`}
            className="flex h-14 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-2xl border-0 bg-transparent px-3 text-start shadow-none transition-colors hover:bg-foreground/5 focus:ring-0 focus:ring-offset-0 lg:h-14 lg:rounded-full [&>svg]:hidden"
          >
            <Users className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div className="flex flex-col text-start min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground truncate leading-tight">
                {t.search.guests}
              </span>
              <span className="truncate text-sm font-semibold text-foreground leading-tight">
                {guests} {t.search.guestsUnit}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-60 text-muted-foreground ms-auto" aria-hidden />
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

      {/* Rooms */}
      <div className="flex-[0.9] min-w-0 col-span-1">
        <Select name="rooms" value={rooms} onValueChange={setRooms}>
          <SelectTrigger
            id="search-rooms"
            name="rooms"
            aria-label={`${t.search.rooms}: ${rooms}`}
            className="flex h-14 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-2xl border-0 bg-transparent px-3 text-start shadow-none transition-colors hover:bg-foreground/5 focus:ring-0 focus:ring-offset-0 lg:h-14 lg:rounded-full [&>svg]:hidden"
          >
            <BedDouble className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div className="flex flex-col text-start min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground truncate leading-tight">
                {t.search.rooms}
              </span>
              <span className="truncate text-sm font-semibold text-foreground leading-tight">
                {rooms} {t.search.roomsUnit}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-60 text-muted-foreground ms-auto" aria-hidden />
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

      {/* Submit */}
      <div className="col-span-1 sm:col-span-2 lg:col-auto lg:shrink-0 lg:ps-2">
        <Button
          type="submit"
          className="h-12 w-full rounded-2xl bg-primary text-base font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-95 lg:h-13 lg:w-auto lg:rounded-full lg:px-7 whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer"
        >
          <Search className="h-5 w-5 shrink-0" aria-hidden />
          <span>{t.search.button}</span>
        </Button>
      </div>
    </form>
  );
}
