import { listings } from "@/data/listings";
import ListingCard from "./ListingCard";

export default function ListingGrid() {
  return (
    <section
      aria-label="Neighborhood listings"
      className="grid gap-6 md:grid-cols-3"
    >
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </section>
  );
}