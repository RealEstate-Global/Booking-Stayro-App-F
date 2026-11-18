import type { LucideIcon } from "lucide-react";
import {
  Wifi,
  Waves,
  Sparkles,
  Dumbbell,
  UtensilsCrossed,
  Car,
  Coffee,
  ConciergeBell,
  Baby,
} from "lucide-react";
import type { AmenityKey } from "@/data/hotels";

export const amenityIcons: Record<AmenityKey, LucideIcon> = {
  wifi: Wifi,
  pool: Waves,
  spa: Sparkles,
  gym: Dumbbell,
  restaurant: UtensilsCrossed,
  parking: Car,
  breakfast: Coffee,
  shuttle: ConciergeBell,
  kids: Baby,
};
