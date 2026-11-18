import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { siteConfig } from "@/config/site";
import { LanguageProvider } from "@/i18n/language-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
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
    template: `%s | ${siteConfig.nameAr}`,
  },
  description: siteConfig.description.ar,
  keywords: [
    "ستيرو",
    "Stayro",
    "حجز طيران",
    "حجز فنادق",
    "تأجير سيارات",
    "travel booking",
    "flight booking",
    "hotel booking",
    "Saudi Arabia travel",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.nameAr} (${siteConfig.name}) | ${siteConfig.tagline.ar}`,
    description: siteConfig.description.ar,
    images: [
      {
        url: "/images/stayro-hero.webp",
        width: 1920,
        height: 1080,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.nameAr} (${siteConfig.name})`,
    description: siteConfig.description.ar,
    images: ["/images/stayro-hero.webp"],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#3A3739" },
    { media: "(prefers-color-scheme: light)", color: "#FAF6F5" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteConfig.name,
  alternateName: siteConfig.nameAr,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.svg`,
  image: `${siteConfig.url}/images/stayro-hero.webp`,
  description: siteConfig.description.en,
  foundingDate: String(siteConfig.foundingYear),  telephone: "+966551234471",
  email: siteConfig.contacts.emails[0],
  areaServed: { "@type": "Country", name: "Saudi Arabia" },
  address: { "@type": "PostalAddress", addressCountry: "SA" },
  sameAs: siteConfig.socials.map((social) => social.href),
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
            <Toaster position="top-center" richColors />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
