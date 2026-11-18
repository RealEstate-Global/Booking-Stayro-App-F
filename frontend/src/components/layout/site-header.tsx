"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import {
  BadgeCheck,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Headset,
  Home,
  Info,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { navItems, type NavItemKey } from "@/data/navigation";
import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";
import { StayroLogo } from "@/components/shared/logo";

const navIcons: Record<NavItemKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  home: Home,
  about: Info,
  hotels: BedDouble,
  support: Headset,
};

function ThemeToggle({ isScrolled }: { isScrolled: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

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
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full backdrop-blur-md transition-all active:scale-95",
        isScrolled
          ? "border border-foreground/15 bg-background/80 text-primary hover:border-primary/40 hover:bg-accent/20"
          : "border border-white/20 bg-black/45 text-primary hover:border-primary/50 hover:bg-black/60 shadow-sm"
      )}
    >
      <Sun
        aria-hidden
        className={cn(
          "h-[1.1rem] w-[1.1rem] transition-all duration-300",
          isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"
        )}
      />
      <Moon
        aria-hidden
        className={cn(
          "absolute h-[1.1rem] w-[1.1rem] transition-all duration-300",
          isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"
        )}
      />
    </button>
  );
}

function LanguageToggle({ isScrolled }: { isScrolled: boolean }) {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={locale === "ar" ? t.header.switchToEnglish : t.header.switchToArabic}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-bold backdrop-blur-md transition-all active:scale-95",
        isScrolled
          ? "border border-foreground/15 bg-background/80 text-foreground hover:border-primary/40 hover:text-primary"
          : "border border-white/20 bg-black/45 text-white hover:border-primary/50 hover:text-primary shadow-sm"
      )}
    >
      <span className="text-xs font-black text-primary">{locale === "ar" ? "EN" : "ع"}</span>
      <span className="hidden sm:inline text-xs">
        {locale === "ar" ? t.header.switchToEnglish : t.header.switchToArabic}
      </span>
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { t, dir, locale } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const Arrow = dir === "rtl" ? ChevronLeft : ChevronRight;

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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "px-3 pt-2 sm:px-6 md:pt-3" : "px-0 pt-0"
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex w-full max-w-screen-xl items-center justify-between gap-4 transition-all duration-300",
          isScrolled
            ? "h-14 rounded-full border border-foreground/15 bg-background/85 px-4 shadow-lg backdrop-blur-2xl md:h-16 md:px-6"
            : "h-16 bg-transparent px-4 md:h-20 md:px-8 border-0"
        )}
      >
        {/* Start side: license line (collapses smoothly on scroll) + Stayro wordmark */}
        <div className="flex shrink-0 flex-col-reverse items-start gap-1 md:gap-1.5">
          <Link href="/" aria-label="Stayro" className="flex items-center">
            <StayroLogo
              aria-label="Stayro"
              className={cn(
                "block w-auto transition-all duration-300 hover:opacity-90",
                isScrolled ? "h-5 md:h-7 text-foreground" : "h-6 md:h-9 text-white"
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
            <p
              className={cn(
                "flex max-w-[16rem] items-center gap-1.5 text-[9px] leading-tight sm:max-w-none sm:text-[11px] md:text-xs transition-colors",
                isScrolled ? "text-foreground/85" : "text-white/90 drop-shadow-sm"
              )}
            >
              <BadgeCheck className="h-3 w-3 shrink-0 text-primary md:h-3.5 md:w-3.5" aria-hidden />
              <span className="truncate">{t.header.license}</span>
            </p>
          </div>
        </div>

        {/* Center: desktop navigation pill in EXACT mathematical center */}
        <nav
          className={cn(
            "hidden items-center gap-1 rounded-full p-1.5 backdrop-blur-md lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:flex transition-all",
            isScrolled
              ? "border border-foreground/15 bg-background/80 shadow-sm"
              : "border border-white/20 bg-black/45 shadow-md"
          )}
          aria-label="Main"
        >
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200",
                  active
                    ? "bg-primary text-white shadow-sm"
                    : isScrolled
                    ? "text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                )}
              >
                {t.nav[item.key]}
              </Link>
            );
          })}
        </nav>

        {/* End side: toggles + mobile menu button */}
        <div className="flex items-center gap-2 md:gap-2.5">
          <LanguageToggle isScrolled={isScrolled} />
          <ThemeToggle isScrolled={isScrolled} />
          <button
            type="button"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all active:scale-95 lg:hidden",
              isScrolled
                ? "border border-foreground/15 bg-background/80 text-foreground hover:border-primary/40 hover:text-primary"
                : "border border-white/20 bg-black/45 text-white hover:border-primary/50 hover:text-primary shadow-sm"
            )}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={t.header.toggleMenu}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation — modern spring drawer with enhanced responsive layout */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dim backdrop with blur */}
            <motion.button
              key="backdrop"
              aria-label={t.common.close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-40 cursor-default bg-black/60 backdrop-blur-sm"
            />
            {/* Floating glass panel */}
            <motion.div
              key="panel"
              dir={dir}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="absolute inset-x-3 top-full z-50 mt-2 origin-top overflow-hidden rounded-3xl border border-foreground/15 bg-background/95 p-4 shadow-2xl backdrop-blur-2xl sm:inset-x-6"
            >
              {/* Header inside mobile sheet */}
              <div className="mb-3 flex items-center justify-between border-b border-foreground/10 pb-3">
                <div className="flex items-center gap-2">
                  <StayroLogo className="h-5 w-auto text-primary" />
                </div>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <BadgeCheck className="h-3 w-3 text-primary" aria-hidden />
                  {locale === "ar" ? "مرخّص من وزارة السياحة" : "Ministry of Tourism"}
                </span>
              </div>

              {/* Navigation list */}
              <nav className="flex flex-col gap-1.5" aria-label="Mobile">
                {navItems.map((item, index) => {
                  const active = isActive(item.path);
                  const Icon = navIcons[item.key];
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: dir === "rtl" ? 16 : -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + index * 0.04, duration: 0.22 }}
                    >
                      <Link
                        href={item.path}
                        aria-current={active ? "page" : undefined}
                        onClick={closeMobileMenu}
                        className={cn(
                          "group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all",
                          active
                            ? "border border-primary/30 bg-primary/10 text-primary shadow-xs"
                            : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-xl transition-colors",
                              active
                                ? "bg-primary text-white"
                                : "bg-foreground/5 text-muted-foreground group-hover:text-foreground"
                            )}
                          >
                            <Icon className="h-4 w-4" aria-hidden />
                          </span>
                          <span>{t.nav[item.key]}</span>
                        </div>
                        <Arrow
                          className={cn(
                            "h-4 w-4 transition-transform",
                            active
                              ? "text-primary translate-x-0"
                              : "text-muted-foreground/60 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                          )}
                          aria-hidden
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom quick CTA in mobile menu */}
              <div className="mt-4 border-t border-foreground/10 pt-3">
                <Link
                  href="/hotels"
                  onClick={closeMobileMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
                >
                  <BedDouble className="h-4 w-4" aria-hidden />
                  {locale === "ar" ? "ابحث عن إقامتك الآن" : "Search Stays Now"}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
