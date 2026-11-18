"use client";

import Link from "next/link";
import { BadgeCheck, Mail, Shield } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";

export function PrivacyView() {
  const { t, locale } = useLanguage();
  const isAr = locale === "ar";
  const updated = isAr ? "١٥ نوفمبر ٢٠٢٦" : "15 November 2026";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      {/* Header */}
      <div className="mb-10 space-y-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Shield className="h-3.5 w-3.5" aria-hidden />
          {t.footer.privacy}
        </span>
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isAr ? `آخر تحديث: ${updated}` : `Last updated: ${updated}`}
        </p>
      </div>

      {/* Intro */}
      <Section
        title={isAr ? "مقدمة" : "Introduction"}
        body={
          isAr
            ? "ستيرو منصة سعودية مرخّصة من وزارة السياحة. نلتزم بحماية خصوصيتك وفقاً لنظام حماية البيانات الشخصية في المملكة العربية السعودية. تصف هذه السياسة كيف نجمع بياناتك ونستخدمها ونحميها."
            : "Stayro is a Saudi platform licensed by the Ministry of Tourism. We are committed to protecting your privacy in accordance with the Saudi Personal Data Protection Law (PDPL). This policy describes how we collect, use and protect your data."
        }
      />

      {/* What we collect */}
      <Section
        title={isAr ? "البيانات التي نجمعها" : "Data We Collect"}
        body={null}
      >
        <ul className="list-disc space-y-2 ps-5 text-sm text-muted-foreground">
          {(isAr
            ? [
                "الاسم والبريد الإلكتروني عند ملء نموذج التواصل",
                "بيانات الحجز (التواريخ، عدد الضيوف، الإقامة المختارة)",
                "بيانات تقنية: نوع المتصفح، اللغة، عنوان IP، الصفحات المُزارة",
                "ملفات تعريف الارتباط (Cookies) لتحسين تجربة الموقع",
              ]
            : [
                "Name and email when you fill the contact form",
                "Booking data (dates, guests count, selected property)",
                "Technical data: browser type, language, IP address, pages visited",
                "Cookies to improve your site experience",
              ]
          ).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      {/* How we use */}
      <Section
        title={isAr ? "كيف نستخدم بياناتك" : "How We Use Your Data"}
        body={null}
      >
        <ul className="list-disc space-y-2 ps-5 text-sm text-muted-foreground">
          {(isAr
            ? [
                "معالجة حجوزاتك وإرسال تأكيدات الحجز",
                "الرد على استفساراتك ودعمك عبر قنوات التواصل",
                "تحليل استخدام الموقع وتحسين تجربة المستخدم",
                "الامتثال للمتطلبات التنظيمية والقانونية في المملكة العربية السعودية",
              ]
            : [
                "Process your bookings and send confirmation details",
                "Reply to your enquiries and support you through our channels",
                "Analyse site usage and improve the user experience",
                "Comply with Saudi regulatory and legal requirements",
              ]
          ).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      {/* Cookies */}
      <Section
        title={isAr ? "ملفات تعريف الارتباط" : "Cookies"}
        body={
          isAr
            ? "نستخدم ملفات تعريف الارتباط لتذكر تفضيلاتك واللغة المختارة وتحليل حركة الزيارات. يمكنك قبول أو رفض ملفات تعريف الارتباط عند ظهور الإشعار. لن يؤثر الرفض على استخدامك الأساسي للموقع."
            : "We use cookies to remember your preferences, chosen language and to analyse traffic. You can accept or decline cookies when the notice appears. Declining does not affect core use of the site."
        }
      />

      {/* Sharing */}
      <Section
        title={isAr ? "مشاركة البيانات" : "Data Sharing"}
        body={
          isAr
            ? "لا نبيع بياناتك الشخصية أو نشاركها مع أطراف ثالثة لأغراض تجارية. قد نشارك البيانات الضرورية مع شركاء الخدمة (مزودو الاستضافة والبريد) ضمن اتفاقيات حماية بيانات صارمة."
            : "We do not sell or share your personal data with third parties for commercial purposes. We may share necessary data with service partners (hosting, email) under strict data-protection agreements."
        }
      />

      {/* Retention */}
      <Section
        title={isAr ? "مدة الاحتفاظ بالبيانات" : "Data Retention"}
        body={
          isAr
            ? "نحتفظ ببيانات الحجز لمدة لا تتجاوز 5 سنوات وفقاً للأنظمة السعودية. يمكنك طلب حذف بياناتك في أي وقت عبر التواصل معنا."
            : "We retain booking data for no longer than 5 years in line with Saudi regulations. You may request deletion of your data at any time by contacting us."
        }
      />

      {/* Your rights */}
      <Section
        title={isAr ? "حقوقك" : "Your Rights"}
        body={null}
      >
        <ul className="list-disc space-y-2 ps-5 text-sm text-muted-foreground">
          {(isAr
            ? [
                "الوصول إلى بياناتك الشخصية",
                "تصحيح أي بيانات غير دقيقة",
                "طلب حذف بياناتك",
                "الاعتراض على معالجة بياناتك لأغراض التسويق",
              ]
            : [
                "Access your personal data",
                "Correct any inaccurate data",
                "Request deletion of your data",
                "Object to processing of your data for marketing purposes",
              ]
          ).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

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
      <Section
        title={isAr ? "تواصل معنا" : "Contact Us"}
        body={null}
      >
        <p className="text-sm text-muted-foreground">
          {isAr
            ? "لأي استفسار متعلق بالخصوصية، يمكنك التواصل معنا عبر "
            : "For any privacy-related enquiry, reach us through "}
          <Link
            href="/support"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            {isAr ? "صفحة التواصل" : "our contact page"}
          </Link>
          {isAr ? " أو عبر البريد الإلكتروني: " : " or by email: "}
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
