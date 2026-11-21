import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getSelectedSponsor } from "@/lib/sponsors/get-selected-sponsor";
import { recordSponsorImpression } from "@/lib/sponsors/record-impression";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }

  const values = body as Record<string, unknown>;
  const { sponsorId, propertyId, placement } = values;

  if (
    typeof sponsorId !== "string" ||
    !UUID_PATTERN.test(sponsorId) ||
    typeof propertyId !== "string" ||
    !UUID_PATTERN.test(propertyId) ||
    placement !== "property_detail"
  ) {
    return NextResponse.json(
      { error: "Invalid impression data" },
      { status: 400 }
    );
  }

  try {
    const { data: property, error } = await supabaseAdmin
      .from("properties")
      .select("id, zip_code")
      .eq("id", propertyId)
      .eq("status", "active")
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const selectedSponsor = await getSelectedSponsor({
      propertyId: property.id,
      placement: "property_detail",
    });

    if (!selectedSponsor || selectedSponsor.id !== sponsorId) {
      return NextResponse.json(
        { error: "Sponsor is not eligible for this placement" },
        { status: 403 }
      );
    }

    await recordSponsorImpression({
      sponsorId: selectedSponsor.id,
      placement: "property_detail",
      propertyZipCode: property.zip_code,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Sponsor impression error:", error);

    return NextResponse.json(
      { error: "Unable to record impression" },
      { status: 500 }
    );
  }
}