import type { Metadata } from "next";
import { SupportView } from "@/components/pages/support-view";

export const metadata: Metadata = {
  title: "الدعم",
  description:
    "تواصل مع فريق دعم ستيرو على مدار الساعة — عبر الهاتف أو البريد أو الدردشة المباشرة. نحن هنا لمساعدتك.",
};

export default function SupportPage() {
  return <SupportView />;
}
