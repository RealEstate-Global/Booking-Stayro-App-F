import { commonAr } from "./common";
import { homeAr } from "./home";
import { searchAr } from "./search";
import { hotelsAr } from "./hotels";
import { aboutAr } from "./about";
import { supportAr } from "./support";
import { legalAr } from "./legal";
import { footerAr } from "./footer";

export const ar = {
  ...commonAr,
  home: homeAr,
  search: searchAr,
  ...hotelsAr,
  ...aboutAr,
  ...supportAr,
  ...legalAr,
  ...footerAr,
};

export type Dictionary = typeof ar;
