import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getSelectedSponsor } from "@/lib/sponsors/get-selected-sponsor";
import { recordSponsorClick } from "@/lib/sponsors/record-click";
import { validateSponsorUrl } from "@/lib/sponsors/validate-sponsor-url";

interface RouteContext {
  params: Promise<{ id: string }>;
}

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  const { id: sponsorId } = await params;
  const propertyId = request.nextUrl.searchParams.get("propertyId");

  if (
    !UUID_PATTERN.test(sponsorId) ||
    !propertyId ||
    !UUID_PATTERN.test(propertyId)
  ) {
    return NextResponse.json(
      { error: "Invalid sponsor or property ID" },
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

    if (error) throw new Error(error.message);

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
        { error: "Sponsor is not eligible for this property" },
        { status: 403 }
      );
    }

    if (!selectedSponsor.website_url) {
      return NextResponse.json(
        { error: "Sponsor destination unavailable" },
        { status: 404 }
      );
    }

    const validation = validateSponsorUrl(selectedSponsor.website_url);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const destination = validation.destination;

    await recordSponsorClick({
      sponsorId: selectedSponsor.id,
      placement: "property_detail",
      propertyZipCode: property.zip_code,
    });

    return NextResponse.redirect(destination, 302);
  } catch (error) {
    console.error("Sponsor click redirect error:", error);

    return NextResponse.json(
      { error: "Unable to process sponsor click" },
      { status: 500 }
    );
  }
}