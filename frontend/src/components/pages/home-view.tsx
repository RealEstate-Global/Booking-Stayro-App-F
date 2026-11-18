import { StayHeroSection } from "@/components/home/stay-hero-section";
import { CitiesSection } from "@/components/home/cities-section";
import { FeaturedStaysSection } from "@/components/home/featured-stays-section";
import { WhyStayroSection } from "@/components/home/why-stayro-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaBannerSection } from "@/components/home/cta-banner-section";

export function HomeView() {
  return (
    <div className="flex flex-1 flex-col">
      <StayHeroSection />
      <CitiesSection />
      <FeaturedStaysSection />
      <WhyStayroSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaBannerSection />
    </div>
  );
}
