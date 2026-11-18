"use client";

import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

/**
 * The pulsing "Coming Soon" pill from stayro.com —
 * pinging dot + bordered pill, orange on dark.
 */
export function ComingSoonPill({ className }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <span className={cn("relative inline-flex", className)}>
      <span
        aria-hidden
        className="absolute start-0 top-0 inline-flex size-2.5 animate-ping rounded-full bg-primary opacity-75"
      />
      <span className="relative inline-flex items-center justify-center whitespace-nowrap rounded-full border border-primary/40 bg-background px-6 py-2 text-xs font-medium text-primary md:text-sm">
        {t.header.comingSoon}
      </span>
    </span>
  );
}
