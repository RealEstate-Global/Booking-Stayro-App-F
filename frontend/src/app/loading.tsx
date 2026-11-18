import { WelcomeExperience } from "@/components/shared/welcome-experience";

/**
 * Route streaming fallback — the same full-screen Stayro welcome experience,
 * layered above the header and footer so the first view is always the brand
 * screen, never a half-loaded page.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99998]" role="status" aria-label="Stayro Loading">
      <WelcomeExperience />
    </div>
  );
}
