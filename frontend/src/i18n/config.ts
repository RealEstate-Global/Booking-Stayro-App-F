export const locales = ["ar", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

export const localeStorageKey = "stayro-locale";

export function isLocale(value: unknown): value is Locale {
  return value === "ar" || value === "en";
}
