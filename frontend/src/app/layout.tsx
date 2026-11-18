import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { siteConfig } from "@/config/site";
import { LanguageProvider } from "@/i18n/language-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.nameAr} (${siteConfig.name}) | ${siteConfig.tagline.ar}`,
    template: `%s | ${siteConfig.nameAr} (${siteConfig.name})`,
  },
  description: siteConfig.description.ar,
  keywords: [
    "ستيرو",
    "Stayro",
    "Stayro App",
    "حجز فنادق السعودية",
    "شقق فندقية الرياض",
    "فنادق مكة المكرمة",
    "فنادق المدينة المنورة",
    "شاليهات ومنتجعات جدة",
    "إقامات العلا",
    "منصة إقامات مرخصة",
    "وزارة السياحة 73104535",
    "ضيافة سعودية",
    "Saudi hotels booking",
    "luxury stays Riyadh",
    "Makkah hotels",
    "Madinah stays",
    "Jeddah luxury resorts",
    "AlUla desert escapes",
    "Saudi Arabia accommodation",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: "Stayro", url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "travel",
  formatDetection: {
    telephone: true,
    date: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.nameAr} | ${siteConfig.name}`,
    title: `${siteConfig.nameAr} (${siteConfig.name}) | ${siteConfig.tagline.ar}`,
    description: siteConfig.description.ar,
    images: [
      {
        url: "/images/stayro-hero.webp",
        width: 1920,
        height: 1080,
        alt: `${siteConfig.nameAr} — ${siteConfig.tagline.ar}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@StayroApp",
    creator: "@StayroApp",
    title: `${siteConfig.nameAr} (${siteConfig.name}) | ${siteConfig.tagline.ar}`,
    description: siteConfig.description.ar,
    images: ["/images/stayro-hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "ar-SA": "/",
      "en-US": "/?lang=en",
      "x-default": "/",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#141316" },
    { media: "(prefers-color-scheme: light)", color: "#FAF6F5" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      alternateName: [siteConfig.nameAr, "Stayro App"],
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.svg`,
      image: `${siteConfig.url}/images/stayro-hero.webp`,
      description: siteConfig.description.ar,
      foundingDate: String(siteConfig.foundingYear),
      telephone: siteConfig.contacts.phones[0],
      email: siteConfig.contacts.emails[0],
      priceRange: "SAR 250 - SAR 2500",
      currenciesAccepted: "SAR",
      paymentAccepted: "Mada, Visa, Mastercard, Apple Pay",
      areaServed: {
        "@type": "Country",
        name: "Saudi Arabia",
        alternateName: "المملكة العربية السعودية",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "SA",
        addressRegion: "Riyadh",
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Government License",
        name: "Ministry of Tourism License",
        recognizedBy: {
          "@type": "GovernmentOrganization",
          name: "Ministry of Tourism - Saudi Arabia",
          alternateName: "وزارة السياحة السعودية",
        },
      },
      sameAs: siteConfig.socials.map((social) => social.href),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: `${siteConfig.nameAr} | ${siteConfig.name}`,
      description: siteConfig.description.ar,
      inLanguage: ["ar-SA", "en-US"],
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteConfig.url}/hotels?city={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={tajawal.variable}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <LanguageProvider>
            <SiteHeader />
            <main className="relative z-10 flex flex-1 flex-col pt-16 md:pt-20">{children}</main>
            <SiteFooter />
            <ScrollToTop />
            <CookieConsent />
            <Toaster position="top-center" richColors />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
