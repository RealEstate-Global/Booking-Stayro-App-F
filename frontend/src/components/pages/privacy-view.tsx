"use client";

import Link from "next/link";
import { BadgeCheck, Mail, Shield } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";

export function PrivacyView() {
  const { t } = useLanguage();
  const p = t.privacyPage;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      {/* Header */}
      <div className="mb-10 space-y-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Shield className="h-3.5 w-3.5" aria-hidden />
          {p.badge}
        </span>
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          {p.title}
        </h1>
        <p className="text-sm text-muted-foreground">{p.lastUpdated}</p>
      </div>

      {/* Intro */}
      <Section title={p.introTitle} body={p.introBody} />

      {/* What we collect */}
      <Section title={p.collectTitle} body={null}>
        <ul className="list-disc space-y-2 ps-5 text-sm text-muted-foreground">
          {p.collectItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      {/* How we use */}
      <Section title={p.useTitle} body={null}>
        <ul className="list-disc space-y-2 ps-5 text-sm text-muted-foreground">
          {p.useItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      {/* Cookies */}
      <Section title={p.cookiesTitle} body={p.cookiesBody} />

      {/* Sharing */}
      <Section title={p.sharingTitle} body={p.sharingBody} />

      {/* Retention */}
      <Section title={p.retentionTitle} body={p.retentionBody} />

      {/* Your rights */}
      <Section title={p.rightsTitle} body={null}>
        <ul className="list-disc space-y-2 ps-5 text-sm text-muted-foreground">
          {p.rightsItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      {/* License */}
      <div className="my-6 flex items-start gap-3 rounded-xl border border-primary/15 bg-primary/5 p-4">
        <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <p className="text-sm leading-relaxed text-foreground/80">{p.licenseText}</p>
      </div>

      {/* Contact */}
      <Section title={p.contactTitle} body={null}>
        <p className="text-sm text-muted-foreground">
          {p.contactPrefix}
          <Link
            href="/support"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            {p.contactLink}
          </Link>
          {p.contactOrEmail}
          <a
            href="mailto:support@stayro.com"
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
            support@stayro.com
          </a>
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
