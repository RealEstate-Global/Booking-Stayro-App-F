"use client";

import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { BadgeCheck, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/language-provider";
import { StayroLogo } from "@/components/shared/logo";

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
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
      <path d="M18.244 3H21l-6.52 7.45L22.5 21h-5.36l-4.19-5.48L8.06 21H5.3l6.97-7.97L2 3h5.5l3.79 5L18.244 3z" />
    </svg>
  );
}

const socialIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  X: XIcon,
};

export function SiteFooter() {
  const { t, locale } = useLanguage();
  const year = new Date().getFullYear();

  const navigationLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.footer.about },
    { href: "/hotels", label: t.footer.hotels },
    { href: "/support", label: t.footer.contactUs },
  ];

  const supportLinks = [
    { href: "/support", label: t.footer.help },
    { href: "/support", label: t.footer.supportCenter },
    { href: "/support", label: t.footer.contactUs },
  ];

  return (
    <footer className="relative z-10 border-t border-foreground/10 bg-background/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-10 sm:px-6 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-12">
          {/* Brand + license + contacts */}
          <div className="space-y-3 md:col-span-4">
            <Link href="/" aria-label="Stayro">
              <StayroLogo className="h-7 w-auto text-primary md:h-8" />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t.footer.description}
            </p>
            <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              {t.header.license}
            </p>
            <ul className="space-y-1.5 text-sm">
              {siteConfig.contacts.phones.map((phone, i) => (
                <li key={phone}>
                  <a
                    href={siteConfig.contacts.phonesHref[i]}
                    dir="ltr"
                    className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {phone}
                  </a>
                </li>
              ))}
              {siteConfig.contacts.emails.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 break-all text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-2" aria-label="Footer navigation">
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              {t.footer.navigation}
            </h3>
            <ul className="space-y-2">
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

          {/* Support */}
          <nav className="md:col-span-2" aria-label="Footer support">
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              {t.footer.support}
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
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

          {/* Social */}
          <div className="md:col-span-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              {t.footer.social}
            </h3>
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
                      className="flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                      {social.handle}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-foreground/10 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {locale === "ar" ? "ستيرو" : "Stayro"} — {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-primary">
              {t.footer.privacy}
            </Link>
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-primary">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
