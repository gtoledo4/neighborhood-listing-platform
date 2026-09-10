import ListingGrid from "@/components/ListingGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Neighborhood Listing Platform
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Discover useful places, services, and resources in your
            neighborhood.
          </p>
        </header>

        <ListingGrid />
      </div>
    </main>
  );
}