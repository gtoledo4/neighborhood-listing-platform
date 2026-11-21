
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Property } from "../types";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [property.imageUrl]);

  const isAiIllustration = /^\/images\/fictional-home-[123]\.webp$/.test(
    property.imageUrl
  );

  return (
    <article className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
      {imageFailed ? (
        <div
          role="img"
          aria-label="Property image unavailable"
          className="flex h-48 w-full items-center justify-center bg-gray-100 px-4 text-center text-sm text-gray-600"
        >
          Property image unavailable
        </div>
      ) : (
        <Image
          src={property.imageUrl}
          alt={property.imageAlt}
          width={1200}
          height={800}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-48 w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      )}

      {isAiIllustration && (
        <p className="px-4 pt-2 text-xs text-gray-600">
          AI-generated illustration. Not an actual photograph of this property.
        </p>
      )}

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

        {property.detailsUrl && (
          <a
            href={property.detailsUrl}
            className="mt-4 inline-block rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            View details for {property.title}
          </a>
        )}
      </div>
    </article>
  );
}
