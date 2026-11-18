"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Cookie, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const STORAGE_KEY = "stayro-cookie-consent-v2";

/**
 * Stayro Luxury Cookie & Privacy Consent Banner
 * Displays smoothly 3 seconds after page loading (Saudi PDPL compliant).
 */
export function CookieConsent() {
  const { t, dir } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const isOverride = window.location.search.includes("cookies=1");
      if (!isOverride && window.localStorage.getItem(STORAGE_KEY)) {
        return;
      }
    } catch {
      // LocalStorage access restricted (e.g. private mode) — proceed safely
    }

    // Trigger exactly after 3 seconds of page load
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = (value: "true" | "declined") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore write errors
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          key="stayro-cookie-banner"
          dir={dir}
          initial={{ opacity: 0, y: 32, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "fixed bottom-6 inset-x-4 z-[70] mx-auto max-w-xl",
            "rounded-3xl border border-primary/20 bg-background/95 p-5 shadow-[0_16px_48px_rgba(0,0,0,0.22)] backdrop-blur-2xl",
            "flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4.5"
          )}
          role="dialog"
          aria-live="polite"
          aria-label={t.cookies.title}
        >
          {/* Brand Cookie Icon badge */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
            <Cookie className="h-6 w-6" aria-hidden />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm font-bold text-foreground">
                {t.cookies.title}
              </span>
              <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t.cookies.message}{" "}
              <Link
                href="/privacy"
                className="font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
              >
                {t.cookies.learnMore}
              </Link>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={() => dismiss("declined")}
              className="rounded-full border border-foreground/15 bg-background/60 px-4 py-2 text-xs font-semibold text-muted-foreground transition-all hover:border-foreground/30 hover:bg-foreground/5 hover:text-foreground active:scale-95 cursor-pointer"
            >
              {t.cookies.decline}
            </button>
            <button
              type="button"
              onClick={() => dismiss("true")}
              className="rounded-full bg-primary px-5 py-2 text-xs font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              {t.cookies.accept}
            </button>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => dismiss("declined")}
                  aria-label={t.common.close}
                  className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={6}>
                {t.common.close}
              </TooltipContent>
            </Tooltip>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
