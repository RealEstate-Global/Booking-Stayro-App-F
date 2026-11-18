export const navItems = [
  { path: "/", key: "home" },
  { path: "/about", key: "about" },
  { path: "/hotels", key: "hotels" },
  { path: "/support", key: "support" },
] as const;

export type NavItemKey = (typeof navItems)[number]["key"];
