import type { Metadata } from "next";
import { AboutView } from "@/components/pages/about-view";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "ستيرو — منصة سعودية للسفر والإقامات مرخّصة من وزارة السياحة برقم 73104535. لكل إقامة هناك قصة — قادم قريباً.",
};

export default function AboutPage() {
  return <AboutView />;
}
