"use client";

import type { FormEvent } from "react";
import { Mail, Phone, Share2 } from "lucide-react";
import { toast } from "sonner";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/language-provider";
import { SectionBadge } from "@/components/shared/section-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function SupportView() {
  const { t } = useLanguage();

  // No backend yet — compose a real email to the official channel instead.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(`Stayro — ${name || "contact"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${siteConfig.contacts.emails[0]}?subject=${subject}&body=${body}`;
    toast.info(t.supportPage.toastCompose);
  };

  return (
    <div className="flex flex-1 flex-col px-4 pb-16 pt-10 sm:px-6">
      <div className="container mx-auto flex flex-1 flex-col justify-center">
        {/* Header */}
        <div className="animate-fade-rise mb-10 text-center md:mb-14">
          <SectionBadge className="mb-6">{t.supportPage.badge}</SectionBadge>

          <h1 className="text-4xl font-extrabold text-foreground md:text-6xl">
            {t.supportPage.title}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-primary md:text-xl">
            {t.supportPage.subtitle}
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2">
          {/* Contact form */}
          <Card className="border-foreground/10 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              {t.supportPage.formTitle}
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name" className="text-muted-foreground">
                  {t.supportPage.name}
                </Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder={t.supportPage.namePlaceholder}
                  className="mt-2 border-foreground/10 bg-background transition-colors focus:border-primary"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-muted-foreground">
                  {t.supportPage.email}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={t.supportPage.emailPlaceholder}
                  className="mt-2 border-foreground/10 bg-background transition-colors focus:border-primary"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-muted-foreground">
                  {t.supportPage.message}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder={t.supportPage.messagePlaceholder}
                  className="mt-2 resize-none border-foreground/10 bg-background transition-colors focus:border-primary"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {t.supportPage.send}
              </Button>
            </form>
          </Card>

          {/* Contact channels */}
          <div className="space-y-4">
            <Card className="border-foreground/10 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {t.supportPage.phoneTitle}
                  </h3>
                  {siteConfig.contacts.phones.map((phone, i) => (
                    <a
                      key={phone}
                      href={siteConfig.contacts.phonesHref[i]}
                      dir="ltr"
                      className="block font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {phone}
                    </a>
                  ))}
                  <p className="mt-1 text-sm text-muted-foreground">{t.supportPage.phoneNote}</p>
                </div>
              </div>
            </Card>

            <Card className="border-foreground/10 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {t.supportPage.emailTitle}
                  </h3>
                  {siteConfig.contacts.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block break-all font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {email}
                    </a>
                  ))}
                  <p className="mt-1 text-sm text-muted-foreground">{t.supportPage.emailNote}</p>
                </div>
              </div>
            </Card>

            <Card className="border-foreground/10 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-4">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {t.supportPage.socialTitle}
                  </h3>
                  <ul className="space-y-1">
                    {siteConfig.socials.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer me"
                          className="font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                          {social.label} — {social.handle}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm text-muted-foreground">{t.supportPage.socialNote}</p>
                </div>
              </div>
            </Card>
          </div>
          {/* FAQ */}
          <div className="col-span-full mx-auto mt-6 w-full max-w-4xl md:mt-14">
            <div className="mb-6 text-center">
              <SectionBadge className="mb-4">{t.supportPage.faqBadge}</SectionBadge>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                {t.supportPage.faqTitle}
              </h2>
            </div>
            <Accordion type="single" collapsible className="rounded-3xl border border-foreground/10 bg-card/50 px-6 backdrop-blur-sm">
              {t.supportPage.faq.map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger className="text-start text-base font-bold text-foreground hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
