import type { Property } from "../types";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
      <img
        src={property.imageUrl}
        alt={property.imageAlt}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold">
          {property.title}
        </h3>

        <address className="mt-1 not-italic text-gray-600">
          {property.address}
        </address>

        <p className="mt-3 text-lg font-bold">
          ${property.price.toLocaleString()}
        </p>

        <ul className="mt-2 flex flex-wrap gap-4 text-sm">
          <li>{property.bedrooms} bedrooms</li>
          <li>{property.bathrooms} bathrooms</li>
          <li>{property.squareFeet.toLocaleString()} sq. ft.</li>
        </ul>

        <a
          href={property.detailsUrl}
          className="mt-4 inline-block rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
        >
          View details for {property.title}
        </a>
      </div>
    </article>
  );
}