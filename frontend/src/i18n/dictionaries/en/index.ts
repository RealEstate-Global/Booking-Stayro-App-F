import type { Dictionary } from "../ar";
import { commonEn } from "./common";
import { homeEn } from "./home";
import { searchEn } from "./search";
import { hotelsEn } from "./hotels";
import { aboutEn } from "./about";
import { supportEn } from "./support";
import { legalEn } from "./legal";
import { footerEn } from "./footer";

export const en: Dictionary = {
  ...commonEn,
  home: homeEn,
  search: searchEn,
  ...hotelsEn,
  ...aboutEn,
  ...supportEn,
  ...legalEn,
  ...footerEn,
};
