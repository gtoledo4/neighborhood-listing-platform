import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getSelectedSponsor } from "@/lib/sponsors/get-selected-sponsor";
import { sponsorToBanner } from "@/lib/sponsors/sponsor-to-banner";
import SponsorBanner from "@/components/SponsorBanner";
import SponsorImpressionTracker from "@/components/SponsorImpressionTracker";

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { id } = await params;

  const { data: property, error } = await supabaseAdmin
    .from("properties")
    .select(
      "id, property_id, address, city, state, zip_code, price, bedrooms, bathrooms, square_feet, amenities"
    )
    .eq("id", id)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch property:", error.message);
    throw new Error("Unable to load property details.");
  }

  if (!property) {
    notFound();
  }

  // Retrieve and select an eligible sponsor for this property.
  const selectedSponsor = await getSelectedSponsor({
    propertyId: property.id,
    placement: "property_detail",
  });

  // Convert the selected sponsor to the banner's expected format.
  const bannerSponsor = sponsorToBanner(selectedSponsor, property.id);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold">
        Property Details
      </h1>

      <p className="mt-4 text-lg">
        {property.address}, {property.city}, {property.state}{" "}
        {property.zip_code}
      </p>

      <p className="mt-4 text-2xl font-semibold">
        ${property.price.toLocaleString()}
      </p>

      <p className="mt-4">
        {property.bedrooms} bedrooms · {property.bathrooms} bathrooms ·{" "}
        {property.square_feet.toLocaleString()} sq. ft.
      </p>

      <section className="mt-8">
        <SponsorBanner sponsor={bannerSponsor} />

        {selectedSponsor && (
          <SponsorImpressionTracker
            sponsorId={selectedSponsor.id}
            propertyId={property.id}
            placement="property_detail"
          />
        )}
      </section>
    </main>
  );
}