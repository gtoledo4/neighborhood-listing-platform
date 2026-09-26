import PropertyListingGrid from "../components/PropertyListingGrid";
import SearchFilters from "../components/SearchFilters";
import SponsorBanner from "../components/SponsorBanner";
import type { Sponsor } from "../types";

const sponsor: Sponsor = {
  id: "sunshine-mortgage",
  businessName: "Sunshine Mortgage",
  message: "Explore financing options for your next home.",
  websiteUrl: "https://example.com",
};

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl p-4">
      <h1 className="text-3xl font-bold">
        Pacific Properties
      </h1>

      <div className="mt-6">
        <SearchFilters />
      </div>

      <div className="mt-8">
        <PropertyListingGrid />
      </div>

      <div className="mt-8">
        <SponsorBanner sponsor={sponsor} />
      </div>
    </main>
  );
}