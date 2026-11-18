"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "stayro-cookies-accepted";

export function CookieConsent() {
  const { t, dir } = useLanguage();
  const [visible, setVisible] = useState(false);

  // Show banner after 3 s — only if not yet accepted/declined
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = (value: "true" | "declined") => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          dir={dir}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            "fixed bottom-4 inset-x-4 z-[60] mx-auto max-w-xl",
            "rounded-2xl border border-foreground/10 bg-background/95 shadow-2xl backdrop-blur-xl p-4",
            "flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          )}
          role="dialog"
          aria-live="polite"
          aria-label={t.cookies.title}
        >
          {/* Icon */}
          <Cookie className="h-6 w-6 shrink-0 text-primary hidden sm:block" aria-hidden />

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground mb-0.5">
              {t.cookies.title}
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t.cookies.message}{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 hover:text-primary transition-colors"
              >
                {t.cookies.learnMore}
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => dismiss("declined")}
              className="rounded-full border border-foreground/15 px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              {t.cookies.decline}
            </button>
            <button
              type="button"
              onClick={() => dismiss("true")}
              className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
            >
              {t.cookies.accept}
            </button>
            <button
              type="button"
              onClick={() => dismiss("declined")}
              aria-label={t.common.close}
              className="rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
