import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { hotels } from "@/data/hotels";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/hotels", "/support"];

  const hotelEntries: MetadataRoute.Sitemap = hotels.map((hotel) => ({
    url: `${siteConfig.url}/hotels/${hotel.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    })),
    ...hotelEntries,
  ];
}
