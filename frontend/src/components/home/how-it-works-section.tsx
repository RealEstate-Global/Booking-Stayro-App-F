"use client";

import { MapPin, Scale, BadgeCheck, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { SectionBadge } from "@/components/shared/section-badge";

const stepIcons: LucideIcon[] = [MapPin, Scale, BadgeCheck];

/** How Stayro works — three simple steps, ghost-numbered cards. */
export function HowItWorksSection() {
  const { t } = useLanguage();

  return (
    <section className="px-4 py-12 md:px-8 md:py-16">
      <div className="container mx-auto">
        <div className="mb-10 text-center md:mb-14">
          <SectionBadge className="mb-4">{t.home.stepsBadge}</SectionBadge>
          <h2 className="text-3xl font-extrabold text-foreground md:text-5xl">
            {t.home.stepsTitle}
          </h2>
        </div>

        <ol className="grid gap-4 md:grid-cols-3 md:gap-6">
          {t.home.steps.map((step, index) => {
            const Icon = stepIcons[index % stepIcons.length];
            return (
              <li
                key={step.title}
                className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40 md:p-8"
              >
                {/* Ghost number */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-4 end-2 select-none text-8xl font-extrabold text-primary/10 md:text-9xl"
                >
                  {index + 1}
                </span>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
