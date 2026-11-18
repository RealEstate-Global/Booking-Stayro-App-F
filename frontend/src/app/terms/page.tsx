import type { Metadata } from "next";
import { TermsView } from "@/components/pages/terms-view";

export const metadata: Metadata = {
  title: "الشروط والأحكام | Terms of Use",
  description:
    "شروط وأحكام استخدام منصة ستيرو — سياسات الحجز والإلغاء والمسؤولية. / Stayro Terms of Use — booking, cancellation and liability policies.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <TermsView />;
}
