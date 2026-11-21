import "server-only";

import { getEligibleSponsors } from "./get-eligible-sponsors";
import {
  selectSponsor,
  type SponsorCandidate,
  type SponsorContext,
} from "./select-sponsor";

export async function getSelectedSponsor(
  context: SponsorContext
): Promise<SponsorCandidate | null> {
  const candidates = await getEligibleSponsors(
    context.propertyId,
    context.placement
  );

  return selectSponsor(context, candidates);
}