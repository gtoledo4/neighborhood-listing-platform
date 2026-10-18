"use client";

import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { apiPropertyToCard } from "@/data/api-property-adapter";
import type { ApiProperty } from "@/types/api-property";

export default function ListingsPage() {
  const [listings, setListings] = useState<ApiProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadListings() {
      try {
        const response = await fetch("/api/listings", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load listings.");
        }

        const data: unknown = await response.json();

        if (
          typeof data !== "object" ||
          data === null ||
          !("listings" in data) ||
          !Array.isArray(data.listings)
        ) {
          throw new Error("Invalid listings response.");
        }

        setListings(data.listings);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load listings."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadListings();

    return () => controller.abort();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">
          Property Listings
        </h1>

        {loading ? (
          <p role="status" className="text-gray-600">
            Loading listings...
          </p>
        ) : error ? (
          <p role="alert" className="text-red-700">
            {error}
          </p>
        ) : listings.length === 0 ? (
          <p role="status" className="text-gray-600">
            No active listings are available right now.
          </p>
        ) : (
          <section
            aria-label="Available properties"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {listings.map((listing) => (
              <PropertyCard
                key={listing.id}
                property={apiPropertyToCard(listing)}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}