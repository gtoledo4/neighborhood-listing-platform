import { properties } from "../data/properties";
import PropertyCard from "./PropertyCard";

export default function PropertyListingGrid() {
  return (
    <section aria-labelledby="property-listings-heading">
      <h2
        id="property-listings-heading"
        className="text-2xl font-bold"
      >
        Property listings
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>
    </section>
  );
}