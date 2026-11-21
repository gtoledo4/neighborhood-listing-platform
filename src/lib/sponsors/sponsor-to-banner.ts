import type { Sponsor } from "../../types";
import type { SponsorCandidate } from "./select-sponsor";

export function sponsorToBanner(
  candidate: SponsorCandidate | null,
  propertyId: string
): Sponsor | null {
  if (!candidate) {
    return null;
  }

  return {
    id: candidate.id,
    businessName: candidate.business_name,
    message: "Explore local services from this neighborhood sponsor.",
    websiteUrl:
      `/api/sponsor-click/${encodeURIComponent(candidate.id)}` +
      `?propertyId=${encodeURIComponent(propertyId)}`,
  };
}