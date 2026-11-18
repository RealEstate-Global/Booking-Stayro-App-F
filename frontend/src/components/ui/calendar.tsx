"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type DayPickerProps } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = DayPickerProps;

function Calendar({ className, classNames, showOutsideDays = true, dir, ...props }: CalendarProps) {
  return (
    <DayPicker
      dir={dir}
      showOutsideDays={showOutsideDays}
      className={cn("p-3.5 relative", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center h-8",
        caption_label: "text-sm font-bold text-foreground",
        nav: "flex items-center justify-between w-full absolute inset-x-0 top-3.5 px-3.5 pointer-events-none z-10",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-background/90 hover:bg-foreground/10 p-0 rounded-full border border-foreground/15 text-foreground hover:text-primary transition-all pointer-events-auto shadow-sm cursor-pointer",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-background/90 hover:bg-foreground/10 p-0 rounded-full border border-foreground/15 text-foreground hover:text-primary transition-all pointer-events-auto shadow-sm cursor-pointer",
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex justify-between",
        weekday: "text-muted-foreground rounded-lg w-9 font-medium text-[0.8rem] text-center",
        week: "flex w-full justify-between mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative rounded-xl flex items-center justify-center focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal rounded-xl hover:rounded-xl hover:bg-foreground/10 aria-selected:opacity-100 transition-all cursor-pointer",
        ),
        range_start: "rounded-s-xl bg-primary text-white font-bold [&>button]:rounded-s-xl",
        range_end: "rounded-e-xl bg-primary text-white font-bold [&>button]:rounded-e-xl",
        range_middle: "bg-primary/15 text-foreground rounded-none [&>button]:rounded-none",
        selected:
          "!bg-primary !text-white !font-bold !rounded-xl shadow-md shadow-primary/30 hover:!bg-primary/90 focus:!bg-primary [&>button]:!bg-primary [&>button]:!text-white [&>button]:!rounded-xl [&>button]:!font-bold",
        today: "text-primary font-bold border border-primary/40 rounded-xl",
        outside: "day-outside text-muted-foreground opacity-40 aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-30 cursor-not-allowed",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          // react-day-picker reports the *logical* orientation. In RTL the
          // previous-month button sits on the right and must point right, and
          // the next-month button sits on the left and must point left.
          const Icon =
            (orientation === "left") !== (dir === "rtl") ? ChevronLeft : ChevronRight;
          return <Icon className="h-4 w-4" />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
