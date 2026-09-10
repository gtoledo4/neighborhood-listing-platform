import type { Listing } from "@/data/listings";

type ListingCardProps = {
  listing: Listing;
};

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-2xl font-semibold text-gray-900">
        {listing.title}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        {listing.address}
      </p>

      <p className="mt-4 text-gray-600">
        {listing.description}
      </p>
    </article>
  );
}