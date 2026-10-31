import "server-only";

import { supabaseAdmin } from "../supabase/admin";

export interface SponsorClick {
  sponsorId: string;
  placement: "property_card" | "property_detail";
  propertyZipCode: string;
}

export async function recordSponsorClick(
  click: SponsorClick
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("sponsor_clicks")
    .insert({
      sponsor_id: click.sponsorId,
      placement: click.placement,
      property_zip_code: click.propertyZipCode,
    });

  if (error) {
    throw new Error(
      `Failed to record sponsor click: ${error.message}`
    );
  }
}