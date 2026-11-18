"use client";

import Link from "next/link";
import { ShieldCheck, Heart, MapPin, Headset, BadgeCheck, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { SectionBadge } from "@/components/shared/section-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const valueIcons: LucideIcon[] = [ShieldCheck, Heart, MapPin, Headset];

export function AboutView() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center px-4 pb-16 pt-10 text-center sm:px-6 md:pt-16">
        <SectionBadge className="mb-6">{t.aboutPage.badge}</SectionBadge>

        <h1 className="max-w-4xl text-5xl font-extrabold leading-tight text-foreground md:text-7xl">
          {t.aboutPage.title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/85 md:text-xl">
          {t.aboutPage.subtitle}
        </p>

        {/* Official license */}
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/60 px-5 py-2 text-sm font-medium text-primary backdrop-blur-sm">
          <BadgeCheck className="h-4 w-4" aria-hidden />
          {t.aboutPage.licenseLabel}
        </p>
      </section>

      {/* Story */}
      <section className="px-4 py-12 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl font-bold text-foreground md:text-4xl">
            {t.aboutPage.storyTitle}
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            {t.aboutPage.storyParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-12 sm:px-6">
        <div className="container mx-auto">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-5xl">
              {t.aboutPage.valuesTitle}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">{t.aboutPage.valuesSubtitle}</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
            {t.aboutPage.values.map((value, index) => {
              const ValueIcon = valueIcons[index % valueIcons.length];
              return (
                <Card
                  key={value.title}
                  className="flex h-full flex-col border-foreground/10 bg-card/50 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/50"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <ValueIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">{value.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 pt-8 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="animate-fade-rise text-3xl font-bold text-foreground md:text-5xl">
            {t.aboutPage.ctaTitle}
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">{t.aboutPage.ctaSubtitle}</p>
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-full bg-primary px-10 py-6 text-lg font-semibold text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90"
          >
            <Link href="/support">{t.aboutPage.contactUs}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
