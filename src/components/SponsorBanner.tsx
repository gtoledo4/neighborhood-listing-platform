import type { Sponsor } from "../types";

interface SponsorBannerProps {
  sponsor: Sponsor;
}

export default function SponsorBanner({
  sponsor,
}: SponsorBannerProps) {
  return (
    <aside
      aria-labelledby={`sponsor-${sponsor.id}`}
      className="rounded-lg border border-amber-300 bg-amber-50 p-4"
    >
      <p className="text-sm font-semibold uppercase text-gray-700">
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
        className="mt-3 inline-block rounded text-blue-700 underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
      >
        Visit {sponsor.businessName}
      </a>
    </aside>
  );
}