export interface City {
  id: string;
  name: { ar: string; en: string };
  tagline: { ar: string; en: string };
  image: string;
  /** Demo count of partner properties */
  propertiesCount: number;
}

export const cities: City[] = [
  {
    id: "makkah",
    name: { ar: "مكة المكرمة", en: "Makkah" },
    tagline: { ar: "جوار الحرم الشريف", en: "Next to the Holy Mosque" },
    image: "/images/cities/makkah.jpg",
    propertiesCount: 240,
  },
  {
    id: "madinah",
    name: { ar: "المدينة المنورة", en: "Madinah" },
    tagline: { ar: "طيبة الطيبة", en: "The Radiant City" },
    image: "/images/cities/madinah.jpg",
    propertiesCount: 180,
  },
  {
    id: "riyadh",
    name: { ar: "الرياض", en: "Riyadh" },
    tagline: { ar: "قلب المملكة النابض", en: "The beating heart of the Kingdom" },
    image: "/images/cities/riyadh.jpg",
    propertiesCount: 320,
  },
  {
    id: "jeddah",
    name: { ar: "جدة", en: "Jeddah" },
    tagline: { ar: "عروس البحر الأحمر", en: "The bride of the Red Sea" },
    image: "/images/cities/jeddah.jpg",
    propertiesCount: 150,
  },
  {
    id: "dammam",
    name: { ar: "الدمام", en: "Dammam" },
    tagline: { ar: "واجهة الخليج الشرقي", en: "Eastern gateway of the Gulf" },
    image: "/images/cities/dammam.jpg",
    propertiesCount: 90,
  },
];

export function getCityById(id: string | null | undefined): City | undefined {
  return cities.find((city) => city.id === id);
}
