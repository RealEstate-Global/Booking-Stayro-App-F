/**
 * Stayro demo catalog — real Saudi hotel brands & locations.
 * Ratings, review counts and prices are demo values for the preview build.
 */

export type AmenityKey =
  | "wifi"
  | "pool"
  | "spa"
  | "gym"
  | "restaurant"
  | "parking"
  | "breakfast"
  | "shuttle"
  | "kids";

export interface Hotel {
  slug: string;
  name: string;
  city: string;
  district: { ar: string; en: string };
  stars: number;
  /** Demo rating out of 10 (Booking-style) */
  rating: number;
  /** Demo review count */
  reviewsCount: number;
  /** Demo price per night in SAR */
  priceSar: number;
  amenities: AmenityKey[];
  images: string[];
  description: { ar: string; en: string };
  featured?: boolean;
}

export const hotels: Hotel[] = [
  {
    slug: "raffles-makkah-palace",
    name: "Raffles Makkah Palace",
    city: "makkah",
    district: { ar: "أبراج البيت، أمام المسجد الحرام", en: "Abraj Al Bait, facing the Holy Mosque" },
    stars: 5,
    rating: 9.4,
    reviewsCount: 2387,
    priceSar: 3280,
    amenities: ["wifi", "restaurant", "breakfast", "shuttle", "spa", "gym"],
    images: ["/images/hotels/room-suite.webp", "/images/hotels/fairmont-makkah.webp", "/images/hotels/room-executive.webp"],
    description: {
      ar: "إقامة فاخرة على بُعد خطوات من الحرم المكي — إطلالات على الكعبة وخدمة تليق بضيوف الرحمن.",
      en: "Luxury stay steps from the Holy Mosque — Kaaba views and service worthy of the guests of Allah.",
    },
    featured: true,
  },
  {
    slug: "oberoi-madina",
    name: "The Oberoi Madina",
    city: "madinah",
    district: { ar: "مركز المدينة المنورة", en: "Central Madinah, near the Prophet's Mosque" },
    stars: 5,
    rating: 9.6,
    reviewsCount: 1754,
    priceSar: 2850,
    amenities: ["wifi", "restaurant", "breakfast", "shuttle", "kids"],
    images: ["/images/hotels/oberoi-madinah.webp", "/images/hotels/room-executive.webp", "/images/hotels/room-deluxe.webp"],
    description: {
      ar: "هدوء وروحانية على بُعد دقائق من المسجد النبوي — أرقى فنادق المدينة المنورة.",
      en: "Serenity and spirituality minutes from the Prophet's Mosque — Madinah's finest address.",
    },
    featured: true,
  },
  {
    slug: "four-seasons-riyadh-kingdom-centre",
    name: "Four Seasons Hotel Riyadh at Kingdom Centre",
    city: "riyadh",
    district: { ar: "مركز المملكة، حي العليا", en: "Kingdom Centre, Al Olaya" },
    stars: 5,
    rating: 9.5,
    reviewsCount: 3120,
    priceSar: 2450,
    amenities: ["wifi", "pool", "spa", "gym", "restaurant", "parking", "breakfast", "kids"],
    images: ["/images/hotels/four-seasons.webp", "/images/hotels/room-suite.webp", "/images/hotels/room-executive.webp"],
    description: {
      ar: "إطلالة أيقونية على أفق الرياض داخل مركز المملكة — فخامة لا تُضاهى.",
      en: "Iconic views over the Riyadh skyline inside Kingdom Centre — unmatched luxury.",
    },
    featured: true,
  },
  {
    slug: "ritz-carlton-riyadh",
    name: "The Ritz-Carlton Riyadh",
    city: "riyadh",
    district: { ar: "حي الحمراء", en: "Al Hamra District" },
    stars: 5,
    rating: 9.2,
    reviewsCount: 2845,
    priceSar: 2120,
    amenities: ["wifi", "pool", "spa", "gym", "restaurant", "parking", "breakfast", "kids"],
    images: ["/images/hotels/ritz-riyadh.webp", "/images/hotels/room-suite.webp", "/images/hotels/room-executive.webp"],
    description: {
      ar: "منتجع أخضر أنيق في قلب الحي الدبلوماسي — ملاذ هادئ وسط المدينة.",
      en: "An elegant green resort in the diplomatic quarter — a calm oasis in the city.",
    },
    featured: true,
  },
  {
    slug: "park-hyatt-jeddah",
    name: "Park Hyatt Jeddah – The Club",
    city: "jeddah",
    district: { ar: "الواجهة البحرية، جدة", en: "Jeddah Waterfront" },
    stars: 5,
    rating: 9.1,
    reviewsCount: 1980,
    priceSar: 2380,
    amenities: ["wifi", "pool", "spa", "gym", "restaurant", "parking", "breakfast"],
    images: ["/images/hotels/park-hyatt-pool.webp", "/images/hotels/room-deluxe.webp", "/images/hotels/room-executive.webp"],
    description: {
      ar: "بإطلالة مباشرة وخدمة راقية على البحر الأحمر — أهدأ وجهات جدة الساحلية.",
      en: "A Red Sea jewel — Jeddah's most tranquil coastal retreat.",
    },
    featured: true,
  },
  {
    slug: "fairmont-makkah",
    name: "Fairmont Makkah Clock Royal Tower",
    city: "makkah",
    district: { ar: "أبراج البيت، أمام الحرم", en: "Abraj Al Bait Towers" },
    stars: 5,
    rating: 9.0,
    reviewsCount: 4210,
    priceSar: 2980,
    amenities: ["wifi", "restaurant", "breakfast", "shuttle", "gym"],
    images: ["/images/hotels/room-executive.webp", "/images/hotels/fairmont-makkah.webp", "/images/hotels/room-suite.webp"],
    description: {
      ar: "داخل برج الساعة الأشهر في العالم — إطلالة على الحرم من غرفتك مباشرة.",
      en: "Inside the world's most famous clock tower — Haram views from your window.",
    },
    featured: true,
  },
  {
    slug: "mandarin-oriental-al-faisaliah",
    name: "Mandarin Oriental Al Faisaliah",
    city: "riyadh",
    district: { ar: "برج الفيصلية، حي العليا", en: "Al Faisaliah Tower, Al Olaya" },
    stars: 5,
    rating: 8.9,
    reviewsCount: 1543,
    priceSar: 2650,
    amenities: ["wifi", "pool", "spa", "gym", "restaurant", "breakfast"],
    images: ["/images/hotels/room-suite.webp", "/images/hotels/room-executive.webp", "/images/hotels/ritz-riyadh.webp"],
    description: {
      ar: "القمة الجديدة للفخامة فوق قمة برج الفيصلية التاريخي.",
      en: "A new summit of luxury atop the historic Al Faisaliah tower.",
    },
  },
  {
    slug: "hilton-jeddah",
    name: "Jeddah Hilton Hotel",
    city: "jeddah",
    district: { ar: "حي الحمراء، على الكورنيش", en: "Al Hamra, on the Corniche" },
    stars: 5,
    rating: 8.3,
    reviewsCount: 3410,
    priceSar: 980,
    amenities: ["wifi", "pool", "gym", "restaurant", "parking", "breakfast"],
    images: ["/images/hotels/room-deluxe.webp", "/images/hotels/park-hyatt-pool.webp", "/images/hotels/room-executive.webp"],
    description: {
      ar: "أيقونة جدة على الكورنيش — اختيار العائلات والتجار منذ عقود.",
      en: "The Corniche legend — Jeddah's choice for families and business for decades.",
    },
  },
  {
    slug: "conrad-makkah",
    name: "Conrad Makkah",
    city: "makkah",
    district: { ar: "حي أجياد، قريب من الحرم", en: "Ajyad District, near the Holy Mosque" },
    stars: 4,
    rating: 8.6,
    reviewsCount: 2876,
    priceSar: 1650,
    amenities: ["wifi", "restaurant", "breakfast", "shuttle"],
    images: ["/images/hotels/room-deluxe.webp", "/images/hotels/room-executive.webp", "/images/hotels/fairmont-makkah.webp"],
    description: {
      ar: "قريب من الحرم بأسعار مناسبة — قيمة ممتازة للمعتمر والحاج.",
      en: "Close to the Haram at smart rates — excellent value for pilgrims.",
    },
  },
  {
    slug: "pullman-zamzam-madina",
    name: "Pullman Zamzam Madina",
    city: "madinah",
    district: { ar: "وسط المدينة المنورة", en: "Central Madinah" },
    stars: 4,
    rating: 8.4,
    reviewsCount: 2321,
    priceSar: 920,
    amenities: ["wifi", "restaurant", "breakfast", "parking"],
    images: ["/images/hotels/room-suite.webp", "/images/hotels/oberoi-madinah.webp", "/images/hotels/room-deluxe.webp"],
    description: {
      ar: "من أفضل قيمة مقابل السعر قرب المسجد النبوي — مثالي للعائلات.",
      en: "Best value near the Prophet's Mosque — ideal for families.",
    },
  },
  {
    slug: "sheraton-dammam",
    name: "Sheraton Dammam Hotel & Convention Center",
    city: "dammam",
    district: { ar: "حي الكورنيش، الدمام", en: "Corniche District, Dammam" },
    stars: 4,
    rating: 8.1,
    reviewsCount: 1688,
    priceSar: 760,
    amenities: ["wifi", "pool", "gym", "restaurant", "parking", "breakfast"],
    images: ["/images/hotels/room-suite.webp", "/images/hotels/villa-resort.webp", "/images/hotels/room-deluxe.webp"],
    description: {
      ar: "القيمة الأولى لرجال الأعمال في المنطقة الشرقية — قرب الكورنيش وواجهة البحر.",
      en: "The Eastern Province business first choice — near the Corniche and the seafront.",
    },
  },
  {
    slug: "golden-tulip-dammam",
    name: "Golden Tulip Dammam",
    city: "dammam",
    district: { ar: "حي الشاطئ، الدمام", en: "Beach District, Dammam" },
    stars: 4,
    rating: 7.9,
    reviewsCount: 1245,
    priceSar: 690,
    amenities: ["wifi", "pool", "restaurant", "parking", "breakfast", "kids"],
    images: ["/images/hotels/villa-resort.webp", "/images/hotels/room-executive.webp", "/images/hotels/room-deluxe.webp"],
    description: {
      ar: "إطلالة بحرية وعائلات سعيدة — منتجع شاطئي على كورنيش الدمام.",
      en: "Seaside views and happy families — a beach resort on Dammam's cornice.",
    },
  },
];

export function getHotelBySlug(slug: string): Hotel | undefined {
  return hotels.find((hotel) => hotel.slug === slug);
}

export function getHotelsByCity(cityId: string): Hotel[] {
  return hotels.filter((hotel) => hotel.city === cityId);
}

export function getFeaturedHotels(): Hotel[] {
  return hotels.filter((hotel) => hotel.featured);
}
