"use client";

import { Star } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { SectionBadge } from "@/components/shared/section-badge";

/** Demo guest stories (sample reviews for the preview build). */
export function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="px-4 py-12 md:px-8 md:py-16">
      <div className="container mx-auto">
        <div className="mb-10 text-center md:mb-14">
          <SectionBadge className="mb-4">{t.home.testimonialsBadge}</SectionBadge>
          <h2 className="text-3xl font-extrabold text-foreground md:text-5xl">
            {t.home.testimonialsTitle}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {t.home.testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded-3xl border border-foreground/10 bg-card/60 p-5 backdrop-blur-sm"
            >
              <div className="mb-3 flex gap-0.5" aria-label={`${item.rating} / 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < item.rating
                        ? "h-4 w-4 fill-primary text-primary"
                        : "h-4 w-4 text-foreground/15"
                    }
                  />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                “{item.text}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-foreground/10 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-extrabold text-primary">
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-bold text-foreground">{item.name}</span>
                  <span className="block text-xs text-muted-foreground">{item.city}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
