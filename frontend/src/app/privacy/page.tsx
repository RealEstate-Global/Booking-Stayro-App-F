import type { Metadata } from "next";
import { PrivacyView } from "@/components/pages/privacy-view";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | Privacy Policy",
  description:
    "سياسة الخصوصية لمنصة ستيرو — كيف نجمع بياناتك ونستخدمها ونحميها. / Stayro Privacy Policy — how we collect, use and protect your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyView />;
}
