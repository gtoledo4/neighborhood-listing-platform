export interface SponsorCandidate {
  id: string;
  business_name: string;
  category: string;
  website_url: string | null;
  priority: number;
}

export interface SponsorContext {
  propertyId: string;
  placement: "property_card" | "property_detail";
}
export function selectSponsor(
  context: SponsorContext,
  candidates: SponsorCandidate[]
): SponsorCandidate | null {
  if (candidates.length === 0) {
    return null;
  }

  // Highest priority wins.
  const highestPriority = Math.max(
    ...candidates.map((sponsor) => sponsor.priority)
  );

  // Keep only unique sponsors with the highest priority.
  const uniqueSponsors = new Map<string, SponsorCandidate>();

  for (const sponsor of candidates) {
    if (sponsor.priority === highestPriority) {
      uniqueSponsors.set(sponsor.id, sponsor);
    }
  }

  const tiedSponsors = Array.from(uniqueSponsors.values()).sort(
    (a, b) => a.id.localeCompare(b.id)
  );

  // Create a stable number from the property and placement.
  const rotationKey = `${context.propertyId}:${context.placement}`;

  let hash = 0;

  for (let i = 0; i < rotationKey.length; i++) {
    hash = (hash * 31 + rotationKey.charCodeAt(i)) >>> 0;
  }

  // Select a predictable sponsor among tied candidates.
  const selectedIndex = hash % tiedSponsors.length;

  return tiedSponsors[selectedIndex];
}