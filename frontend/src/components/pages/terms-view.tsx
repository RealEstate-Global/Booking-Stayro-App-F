"use client";

import Link from "next/link";
import { BadgeCheck, FileText } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";

export function TermsView() {
  const { t } = useLanguage();
  const tm = t.termsPage;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      {/* Header */}
      <div className="mb-10 space-y-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <FileText className="h-3.5 w-3.5" aria-hidden />
          {tm.badge}
        </span>
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          {tm.title}
        </h1>
        <p className="text-sm text-muted-foreground">{tm.lastUpdated}</p>
      </div>

      {/* Demo notice */}
      <div className="mb-8 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-300">
        {tm.demoNotice}
      </div>

      <Section title={tm.acceptanceTitle} body={tm.acceptanceBody} />
      <Section title={tm.serviceTitle} body={tm.serviceBody} />

      <Section title={tm.bookingTitle} body={null}>
        <ul className="list-disc space-y-2 ps-5 text-sm text-muted-foreground">
          {tm.bookingItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title={tm.pricesTitle} body={tm.pricesBody} />

      <Section title={tm.responsibilitiesTitle} body={null}>
        <ul className="list-disc space-y-2 ps-5 text-sm text-muted-foreground">
          {tm.responsibilitiesItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title={tm.liabilityTitle} body={tm.liabilityBody} />
      <Section title={tm.ipTitle} body={tm.ipBody} />
      <Section title={tm.governingTitle} body={tm.governingBody} />

      {/* License */}
      <div className="my-6 flex items-start gap-3 rounded-xl border border-primary/15 bg-primary/5 p-4">
        <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <p className="text-sm leading-relaxed text-foreground/80">{tm.licenseText}</p>
      </div>

      {/* Contact */}
      <Section title={tm.contactTitle} body={null}>
        <p className="text-sm text-muted-foreground">
          {tm.contactPrefix}
          <Link
            href="/support"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            {tm.contactLink}
          </Link>
          .
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  body,
  children,
}: {
  title: string;
  body: string | null;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 space-y-2">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      {body && <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>}
      {children}
    </div>
  );
}
