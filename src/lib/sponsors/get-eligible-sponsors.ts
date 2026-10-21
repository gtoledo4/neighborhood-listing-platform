import "server-only";

import { supabaseAdmin } from "../supabase/admin";
import type { SponsorCandidate } from "./select-sponsor";

export async function getEligibleSponsors(
  propertyId: string,
  placement: "property_card" | "property_detail"
): Promise<SponsorCandidate[]> {
  const { data, error } = await supabaseAdmin.rpc(
    "get_eligible_sponsors",
    {
      p_property_id: propertyId,
      p_placement: placement,
      p_as_of: new Date().toISOString().slice(0, 10),
    }
  );

  if (error) {
    throw new Error(
      `Failed to retrieve eligible sponsors: ${error.message}`
    );
  }

  return (data ?? []) as SponsorCandidate[];
}