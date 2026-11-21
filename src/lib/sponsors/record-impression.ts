import "server-only";

import { supabaseAdmin } from "../supabase/admin";

export interface SponsorImpression {
  sponsorId: string;
  placement: "property_card" | "property_detail";
  propertyZipCode: string;
}

export async function recordSponsorImpression(
  impression: SponsorImpression
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("sponsor_impressions")
    .insert({
      sponsor_id: impression.sponsorId,
      placement: impression.placement,
      property_zip_code: impression.propertyZipCode,
    });

  if (error) {
    throw new Error(
      `Failed to record sponsor impression: ${error.message}`
    );
  }
}