export const siteConfig = {
  name: "Stayro",
  nameAr: "ستيرو",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://stayro.com",
  tagline: {
    ar: "لكل إقامة هناك قصة",
    en: "Every stay has a story",
  },
  description: {
    ar: "ستيرو منصة حجز السفر والإقامة — احجز رحلاتك وفنادقك وتأجير سيارتك في مكان واحد.",
    en: "Stayro is your travel & stays booking platform — flights, hotels and car rentals in one place.",
  },
  // Ministry of Tourism (Saudi Arabia) license, as published on stayro.com
  license: {
    number: "73104535",
    authority: {
      ar: "وزارة السياحة",
      en: "Ministry of Tourism",
    },
  },
  contacts: {
    phones: ["+966 55 123 4471", "+966 546 546 480"],
    phonesHref: ["tel:+966551234471", "tel:+966546546480"],
    emails: ["Rakan@stayro.com", "Abdulrahman@stayro.com"],
  },
  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/stayroapp/",
      handle: "@stayroapp",
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@StayroApp",
      handle: "@StayroApp",
    },
    {
      label: "X",
      href: "https://x.com/StayroApp",
      handle: "@StayroApp",
    },
  ],
  // Official link published in Stayro's verified Instagram bio
  appStore: {
    label: "Stayro Business",
    href: "https://apps.apple.com/sa/app/stayro-business/id6740650889",
  },
  foundingYear: 2023,
} as const;

export type SiteConfig = typeof siteConfig;
