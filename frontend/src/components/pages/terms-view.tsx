"use client";

import Link from "next/link";
import { BadgeCheck, FileText } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";

export function TermsView() {
  const { t, locale } = useLanguage();
  const isAr = locale === "ar";
  const updated = isAr ? "١٥ نوفمبر ٢٠٢٦" : "15 November 2026";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      {/* Header */}
      <div className="mb-10 space-y-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <FileText className="h-3.5 w-3.5" aria-hidden />
          {t.footer.terms}
        </span>
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          {isAr ? "الشروط والأحكام" : "Terms of Use"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isAr ? `آخر تحديث: ${updated}` : `Last updated: ${updated}`}
        </p>
      </div>

      {/* Demo notice */}
      <div className="mb-8 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-300">
        {isAr
          ? "⚠️ ستيرو حالياً في مرحلة الاختبار (Demo). الحجوزات تجريبية ولا يتم تحصيل أي مبالغ حتى الإطلاق الرسمي."
          : "⚠️ Stayro is currently in Demo mode. Bookings are for demonstration only — no payment is collected until the official launch."}
      </div>

      <Section
        title={isAr ? "قبول الشروط" : "Acceptance of Terms"}
        body={
          isAr
            ? "باستخدامك لمنصة ستيرو فأنت توافق على هذه الشروط والأحكام. إن كنت لا توافق على أي بند من هذه الشروط فيرجى التوقف عن استخدام المنصة."
            : "By using the Stayro platform you agree to these Terms of Use. If you do not agree to any provision, please stop using the platform."
        }
      />

      <Section
        title={isAr ? "وصف الخدمة" : "Service Description"}
        body={
          isAr
            ? "ستيرو منصة سعودية لحجز الإقامات (فنادق، شقق، شاليهات ومنتجعات) في المملكة العربية السعودية. المنصة مرخّصة من وزارة السياحة برقم 73104535."
            : "Stayro is a Saudi platform for booking stays (hotels, apartments, chalets and resorts) across Saudi Arabia. The platform is licensed by the Ministry of Tourism (License No. 73104535)."
        }
      />

      <Section
        title={isAr ? "الحجز والإلغاء" : "Booking & Cancellation"}
        body={null}
      >
        <ul className="list-disc space-y-2 ps-5 text-sm text-muted-foreground">
          {(isAr
            ? [
                "يُعدّ الحجز مؤكداً عند استلام رقم التأكيد من المنصة.",
                "تُعرض سياسة الإلغاء الخاصة بكل إقامة قبل تأكيد الحجز.",
                "كثير من الإقامات تتيح الإلغاء المجاني حتى 24 ساعة قبل الوصول.",
                "في حالة الحجوزات التجريبية (Demo) لا يوجد أي تحصيل مالي.",
              ]
            : [
                "A booking is confirmed once a confirmation number is issued by the platform.",
                "Each property's cancellation policy is shown before you confirm.",
                "Many properties allow free cancellation up to 24 hours before check-in.",
                "Demo bookings involve no financial transaction.",
              ]
          ).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section
        title={isAr ? "الأسعار والضرائب" : "Prices & Taxes"}
        body={
          isAr
            ? "جميع الأسعار بالريال السعودي (ر.س) وتشمل ضريبة القيمة المضافة (15%) حيث ينطبق ذلك. لا توجد رسوم خفية — السعر المعروض هو السعر النهائي."
            : "All prices are in Saudi Riyal (SAR) and include VAT (15%) where applicable. There are no hidden fees — the displayed price is the final price."
        }
      />

      <Section
        title={isAr ? "مسؤولية المستخدم" : "User Responsibilities"}
        body={null}
      >
        <ul className="list-disc space-y-2 ps-5 text-sm text-muted-foreground">
          {(isAr
            ? [
                "تقديم بيانات صحيحة عند الحجز.",
                "الامتثال للأنظمة والتعليمات الخاصة بمكان الإقامة.",
                "احترام قواعد الإقامة وسياسات الإلغاء المعلنة.",
              ]
            : [
                "Provide accurate information when booking.",
                "Comply with the rules and instructions of the property.",
                "Respect published cancellation policies.",
              ]
          ).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section
        title={isAr ? "تحديد المسؤولية" : "Limitation of Liability"}
        body={
          isAr
            ? "ستيرو وسيط بين المسافر ومزود الإقامة. لا تتحمل المنصة المسؤولية عن أي خلافات تنشأ مباشرة بين الضيف ومكان الإقامة، غير أن فريقنا يسعى دائماً للوساطة وحل المشكلات."
            : "Stayro acts as an intermediary between the traveller and the property provider. The platform is not liable for disputes arising directly between the guest and the property, though our team always endeavours to mediate and resolve issues."
        }
      />

      <Section
        title={isAr ? "الملكية الفكرية" : "Intellectual Property"}
        body={
          isAr
            ? "جميع محتويات منصة ستيرو — الشعار والتصميم والنصوص والبرمجة — محمية بموجب قوانين حقوق الملكية الفكرية السارية في المملكة العربية السعودية."
            : "All Stayro platform content — logo, design, text and code — is protected under applicable Saudi intellectual property laws."
        }
      />

      <Section
        title={isAr ? "القانون الحاكم" : "Governing Law"}
        body={
          isAr
            ? "تخضع هذه الشروط لأنظمة وقوانين المملكة العربية السعودية. تختص المحاكم السعودية بالنظر في أي نزاع ينشأ عن استخدام المنصة."
            : "These Terms are governed by the laws of the Kingdom of Saudi Arabia. Saudi courts have exclusive jurisdiction over any dispute arising from use of the platform."
        }
      />

      {/* License */}
      <div className="my-6 flex items-start gap-3 rounded-xl border border-primary/15 bg-primary/5 p-4">
        <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <p className="text-sm leading-relaxed text-foreground/80">
          {isAr
            ? "ستيرو منصة مرخّصة رسمياً من وزارة السياحة في المملكة العربية السعودية برقم الترخيص 73104535."
            : "Stayro is officially licensed by the Ministry of Tourism of Saudi Arabia, License No. 73104535."}
        </p>
      </div>

      {/* Contact */}
      <Section title={isAr ? "تواصل معنا" : "Contact Us"} body={null}>
        <p className="text-sm text-muted-foreground">
          {isAr ? "لأي استفسار تواصل معنا عبر " : "For any enquiry reach us through "}
          <Link
            href="/support"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            {isAr ? "صفحة التواصل" : "our contact page"}
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
