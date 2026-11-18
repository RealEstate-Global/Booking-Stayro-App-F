import { HomeSkeleton } from "@/components/shared/page-skeletons";

/** Home route fallback — mirrors the hero, city strip and featured stays. */
export default function Loading() {
  return <HomeSkeleton />;
}
