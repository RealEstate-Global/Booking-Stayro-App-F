"use client";

import Link from "next/link";
import { useState, type ComponentType, type FormEvent, type SVGProps } from "react";
import { BadgeCheck, HelpCircle, MessageSquare, Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/language-provider";
import { StayroLogo } from "@/components/shared/logo";
import { PaymentBadges } from "@/components/shared/payment-badges";

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .6.05.89.14V9.4a6.37 6.37 0 0 0-1-.08A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function AppleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.76 1.06-1.82.94-2.88-.91.04-2.02.61-2.67 1.37-.58.67-1.08 1.74-.95 2.78 1.02.08 2.06-.51 2.68-1.27z" />
    </svg>
  );
}

function GooglePlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3.609 1.814L13.793 12 3.61 22.186a2.37 2.37 0 0 1-.61-.926V2.74c.16-.367.37-.688.61-.926zm11.242 11.244l2.128 2.128-11.45 6.467 9.322-8.595zm2.128-2.116l-2.128 2.128-9.322-8.595 11.45 6.467zm1.053 1.058l3.142 1.774c.915.516.915 1.358 0 1.874l-3.142 1.774-2.34-2.34 2.34-2.082z" />
    </svg>
  );
}

const socialIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  X: XIcon,
};

export function SiteFooter() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  // Pure navigation links — zero overlap with support
  const navigationLinks = [
    { href: "/", label: t.nav.home },
    { href: "/hotels", label: t.footer.hotels },
    { href: "/about", label: t.footer.about },
    { href: "/privacy", label: t.footer.privacy },
    { href: "/terms", label: t.footer.terms },
  ];

  // Pure support links — zero overlap with navigation
  const supportLinks = [
    { href: "/support", label: t.footer.help, icon: HelpCircle },
    { href: "/support", label: t.footer.supportCenter, icon: MessageSquare },
    { href: "/support#faq", label: t.supportPage.faqTitle, icon: ShieldCheck },
  ];

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success(t.footer.subscribedToast);
    setEmail("");
  };

  return (
    <footer className="relative z-10 border-t border-foreground/10 bg-background/80 backdrop-blur-md pb-6">
      <div className="container mx-auto px-4 pt-12 sm:px-6 md:pt-16">
        {/* 4 Dedicated, Non-Overlapping Columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Col 1: Brand Logo + About Summary + License + Contact Ways (lg:col-span-4) */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <Link href="/" aria-label="Stayro" className="inline-block">
              <StayroLogo className="h-8 w-auto text-foreground transition-opacity hover:opacity-90" />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t.footer.description}
            </p>
            <div className="flex items-start gap-2.5 rounded-2xl border border-primary/20 bg-primary/5 p-3 text-xs leading-relaxed text-foreground/85">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>{t.header.license}</span>
            </div>

            {/* Official App Download Badges (iOS & Android) */}
            <div className="mt-2 flex flex-col gap-2.5 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={siteConfig.appStore.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-foreground/15 bg-foreground/[0.03] px-3.5 py-2.5 transition-all hover:border-primary/50 hover:bg-foreground/[0.06] active:scale-95"
              >
                <AppleIcon className="h-6 w-6 text-foreground transition-transform group-hover:scale-110" />
                <div className="flex flex-col text-start">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                    {t.footer.appStoreLabel}
                  </span>
                  <span className="text-xs font-bold leading-tight text-foreground">
                    App Store
                  </span>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-foreground/15 bg-foreground/[0.03] px-3.5 py-2.5 transition-all hover:border-primary/50 hover:bg-foreground/[0.06] active:scale-95"
              >
                <GooglePlayIcon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                <div className="flex flex-col text-start">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                    {t.footer.googlePlayLabel}
                  </span>
                  <span className="text-xs font-bold leading-tight text-foreground">
                    Google Play
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Col 2: Pure Navigation Links (lg:col-span-2) */}
          <nav className="flex flex-col lg:col-span-2" aria-label="Footer navigation">
            <h3 className="mb-4 text-sm font-bold tracking-wide text-foreground">
              {t.footer.navigation}
            </h3>
            <ul className="space-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: Pure Support Links (lg:col-span-2) */}
          <nav className="flex flex-col lg:col-span-2" aria-label="Footer support">
            <h3 className="mb-4 text-sm font-bold tracking-wide text-foreground">
              {t.footer.support}
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-primary/70" aria-hidden />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-2.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
              <span>{t.footer.liveSupport}</span>
            </div>
          </nav>

          {/* Col 4: Newsletter Subscription + Social Links (lg:col-span-4) */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            {/* Newsletter Subscription */}
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4">
              <h3 className="text-sm font-bold text-foreground">
                {t.footer.newsletterTitle}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.footer.newsletterSubtitle}
              </p>
              <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.newsletterPlaceholder}
                  aria-label={t.footer.newsletterPlaceholder}
                  className="w-full min-w-0 rounded-full border border-foreground/15 bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white shadow-sm transition-opacity hover:opacity-90 active:scale-95 cursor-pointer"
                >
                  <span>{t.footer.subscribe}</span>
                  <Send className="h-3 w-3 rtl:rotate-180" aria-hidden />
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="mb-2.5 text-xs font-semibold text-foreground/80">
                {t.footer.social}
              </h4>
              <ul className="flex flex-wrap gap-2">
                {siteConfig.socials.map((social) => {
                  const Icon = socialIcons[social.label];
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer me"
                        aria-label={`${social.label} — ${social.handle}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-background/80 px-3.5 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-primary active:scale-95"
                      >
                        {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                        <span>{social.handle}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Inward horizontal spacing from left/right + generous clearance for scroll button */}
        <div className="mt-10 border-t border-foreground/10 pt-4">
          <div className="mx-auto flex flex-col items-center justify-between gap-6 px-4 sm:px-12 md:px-20 lg:px-24 lg:flex-row">
            {/* Left / Start: Copyright — comfortably inset from the left edge so scrolltop button is 100% clear */}
            <div className="flex items-center text-center lg:text-start">
              <p className="text-xs leading-relaxed text-muted-foreground">
                © {year} {t.footer.brandName} — {t.footer.rights}
              </p>
            </div>

            {/* Center: Available payment methods (mada, Visa, Mastercard, Apple Pay) */}
            <div className="flex items-center justify-center">
              <PaymentBadges />
            </div>

            {/* Right / End: Legal links with inward spacing */}
            <div className="flex items-center gap-6 text-center lg:text-end">
              <Link
                href="/privacy"
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {t.footer.privacy}
              </Link>
              <Link
                href="/terms"
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {t.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
