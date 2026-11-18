"use client";

import { CalendarDays, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { ar as arLocale, enUS as enUSLocale } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/language-provider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface DatePickerFieldProps {
  id?: string;
  "aria-label": string;
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  /** Earliest selectable day (defaults to today) */
  minDate?: Date;
  /** Latest selectable day */
  maxDate?: Date;
  /** Date-fns format of the trigger label */
  formatAs?: string;
  /** Optional field label shown above date */
  label?: string;
  /** Whether to show a trailing chevron arrow */
  showArrow?: boolean;
  className?: string;
}

/**
 * Reusable date field — Popover + Calendar (react-day-picker), locale aware.
 * Used by the search form, the hotel booking card and anywhere else a date is needed.
 */
export function DatePickerField({
  id,
  "aria-label": ariaLabel,
  date,
  onSelect,
  minDate,
  maxDate,
  formatAs = "d MMM",
  label,
  showArrow = true,
  className,
}: DatePickerFieldProps) {
  const { t, locale, dir } = useLanguage();
  const dateLocale = locale === "ar" ? arLocale : enUSLocale;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="ghost"
          aria-label={ariaLabel}
          className={cn(
            "h-full w-full justify-start gap-2.5 border-0 bg-transparent px-0 font-normal text-foreground shadow-none ring-offset-transparent hover:bg-transparent focus-visible:ring-0",
            className
          )}
        >
          <CalendarDays className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          <div className="flex flex-col text-start min-w-0 flex-1">
            {label && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground truncate leading-tight">
                {label}
              </span>
            )}
            <span className="truncate text-sm font-semibold text-foreground leading-tight">
              {date ? (
                format(date, formatAs, { locale: dateLocale })
              ) : (
                <span className="font-normal text-muted-foreground">{t.search.selectDate}</span>
              )}
            </span>
          </div>
          {showArrow && (
            <ChevronDown
              className="h-4 w-4 shrink-0 opacity-50 ms-auto text-muted-foreground"
              aria-hidden
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto rounded-3xl border-foreground/15 bg-background/95 p-1 shadow-2xl backdrop-blur-xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden overflow-hidden"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          autoFocus
          dir={dir}
          locale={dateLocale}
          disabled={[
            { before: minDate ?? today },
            ...(maxDate ? [{ after: maxDate }] : []),
          ]}
        />
      </PopoverContent>
    </Popover>
  );
}
