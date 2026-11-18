import type { Metadata } from "next";
import { AboutView } from "@/components/pages/about-view";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "ستيرو — منصة سعودية لحجز الإقامات الفندقية والشقق المخدومة مرخّصة من وزارة السياحة برقم 73104535. لكل إقامة هناك قصة.",
};

export default function AboutPage() {
  return <AboutView />;
}
