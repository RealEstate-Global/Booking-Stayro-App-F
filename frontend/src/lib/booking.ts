/** Demo pricing & booking helpers (no backend yet — see backend/README.md). */

export const VAT_RATE = 0.15; // Saudi Arabia VAT

export function calculatePrice(pricePerNight: number, nights: number) {
  const subtotal = pricePerNight * nights;
  const vat = Math.round(subtotal * VAT_RATE);
  const total = subtotal + vat;
  return { subtotal, vat, total };
}

export function countNights(checkIn: Date, checkOut: Date): number {
  const ms = checkOut.getTime() - checkIn.getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export function formatSar(amount: number, locale: "ar" | "en" = "ar"): string {
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    maximumFractionDigits: 0,
  }).format(amount);
  return locale === "ar" ? `${formatted} ر.س` : `${formatted} SAR`;
}

export function generateBookingReference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `STY-${code}`;
}

/** Next Friday (local) as the default check-in, checkout one day later. */
export function defaultDates(): { checkIn: Date; checkOut: Date } {
  const now = new Date();
  const checkIn = new Date(now);
  const daysUntilFriday = (5 - now.getDay() + 7) % 7 || 7;
  checkIn.setDate(now.getDate() + daysUntilFriday);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkIn.getDate() + 1);
  return { checkIn, checkOut };
}

export function toISODate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Parse ?checkIn / ?checkOut safely, falling back to defaults. */
export function parseDateParam(value: string | null | undefined): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed;
}
