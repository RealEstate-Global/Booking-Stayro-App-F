"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, Menu, Moon, Sun, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";
import { StayroLogo } from "@/components/shared/logo";

/**
 * Single, centralized theme toggle — sun/moon crossfade+rotate,
 * the same interaction pattern as stayro.com.
 */
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Hydration-safe mount flag: SSR always renders the default (dark) icon, the
  // client unlocks the real resolvedTheme afterwards — avoids a theme flicker.
  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-shot post-hydration sync
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={t.header.toggleTheme}
      title={t.header.toggleTheme}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-foreground/10 bg-background text-primary transition-colors hover:bg-accent/20"
    >
      <Sun
        aria-hidden
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all duration-300",
          isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"
        )}
      />
      <Moon
        aria-hidden
        className={cn(
          "absolute h-[1.2rem] w-[1.2rem] transition-all duration-300",
          isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"
        )}
      />
    </button>
  );
}

function LanguageToggle() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={locale === "ar" ? t.header.switchToEnglish : t.header.switchToArabic}
      className="inline-flex h-10 items-center gap-1.5 rounded-full border border-foreground/10 bg-background px-3 text-xs font-bold text-foreground transition-colors hover:text-primary"
    >
      <span className="text-sm text-primary">{locale === "ar" ? "EN" : "ع"}</span>
      <span className="hidden sm:inline">
        {locale === "ar" ? t.header.switchToEnglish : t.header.switchToArabic}
      </span>
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { t, dir } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-foreground/10 bg-background/85 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-screen-xl items-center justify-between gap-4 px-4 transition-all duration-300 md:px-8",
          isScrolled ? "h-14 md:h-16" : "h-16 md:h-20"
        )}
      >
        {/* Start side: license line (collapses smoothly on scroll) + Stayro wordmark */}
        <div className="flex shrink-0 flex-col-reverse items-start gap-1 md:gap-1.5">
          <Link href="/" aria-label="Stayro" className="flex items-center">
            <StayroLogo
              aria-label="Stayro"
              className={cn(
                "block w-auto text-foreground transition-all duration-300",
                isScrolled ? "h-5 md:h-7" : "h-6 md:h-9"
              )}
            />
          </Link>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isScrolled
                ? "max-h-0 -translate-y-2 opacity-0 pointer-events-none"
                : "max-h-8 translate-y-0 opacity-100"
            )}
          >
            <p className="flex max-w-[16rem] items-center gap-1.5 text-[9px] leading-tight text-foreground/80 sm:max-w-none sm:text-[11px] md:text-xs">
              <BadgeCheck className="h-3 w-3 shrink-0 text-primary md:h-3.5 md:w-3.5" aria-hidden />
              <span className="truncate">{t.header.license}</span>
            </p>
          </div>
        </div>

        {/* Center: desktop navigation */}
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(item.path)
                  ? "bg-foreground/10 text-primary"
                  : "text-foreground/80 hover:text-primary"
              )}
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>

        {/* End side: toggles + mobile menu */}
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className="p-2 text-foreground lg:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={t.header.toggleMenu}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation — floating rounded sheet with a springy open */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dim backdrop, tap to close */}
            <motion.button
              key="backdrop"
              aria-label={t.common.close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 cursor-default bg-black/50 backdrop-blur-[2px]"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="absolute inset-x-3 top-full z-50 mt-2 origin-top overflow-hidden rounded-3xl border border-foreground/10 bg-background/95 p-2 shadow-2xl backdrop-blur-xl"
            >
              <nav className="flex flex-col" aria-label="Mobile">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: dir === "rtl" ? 14 : -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={item.path}
                      aria-current={isActive(item.path) ? "page" : undefined}
                      onClick={closeMobileMenu}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-5 py-3.5 font-semibold transition-colors",
                        isActive(item.path)
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground hover:bg-foreground/5 hover:text-primary"
                      )}
                    >
                      {t.nav[item.key]}
                      {isActive(item.path) ? (
                        <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                      ) : null}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
