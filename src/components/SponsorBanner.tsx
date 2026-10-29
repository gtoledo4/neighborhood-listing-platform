import type { Sponsor } from "../types";

interface SponsorBannerProps {
  sponsor: Sponsor | null;
}

export default function SponsorBanner({
  sponsor,
}: SponsorBannerProps) {
  if (!sponsor) {
    return (
      <aside
        aria-label="Neighborhood information"
        className="rounded-lg border border-gray-300 bg-gray-50 p-4"
      >
        <h2 className="text-xl font-bold">
          Neighborhood Listing Platform
        </h2>

        <p className="mt-2">
          Explore local resources and discover more about your neighborhood.
        </p>
      </aside>
    );
  }

  return (
    <aside
      aria-labelledby={`sponsor-${sponsor.id}`}
      aria-describedby={`sponsor-disclosure-${sponsor.id}`}
      className="rounded-lg border border-amber-300 bg-amber-50 p-4"
    >
      <p
        id={`sponsor-disclosure-${sponsor.id}`}
        className="text-sm font-semibold uppercase text-gray-700"
      >
        Sponsored
      </p>

      <h2
        id={`sponsor-${sponsor.id}`}
        className="mt-1 text-xl font-bold"
      >
        {sponsor.businessName}
      </h2>

      <p className="mt-2">{sponsor.message}</p>

      <a
        href={sponsor.websiteUrl}
        aria-label={`Visit ${sponsor.businessName} (Sponsored link)`}
        className="mt-3 inline-block rounded text-blue-700 underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
      >
        Visit {sponsor.businessName}
      </a>
    </aside>
  );
}