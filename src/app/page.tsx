import PropertyListingGrid from "../components/PropertyListingGrid";
import SearchFilters from "../components/SearchFilters";
import SponsorBanner from "../components/SponsorBanner";

import { getApprovedDemoSponsor } from "../lib/sponsors/approved-content";

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
        <SponsorBanner sponsor={getApprovedDemoSponsor()} />
      </div>
    </main>
  );
}