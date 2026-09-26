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

        <section
          aria-label="Platform features"
          className="grid gap-6 md:grid-cols-3"
        >
          <article className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-gray-900">
              Listings
            </h2>
            <p className="mt-3 text-gray-600">
              Find local places, services, and resources in your neighborhood.
            </p>
          </article>

          <article className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-gray-900">
              Neighborhood Sponsors
            </h2>
            <p className="mt-3 text-gray-600">
              Discover local organizations and businesses that support the
              community.
            </p>
          </article>

          <article className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-gray-900">
              Voice Help
            </h2>
            <p className="mt-3 text-gray-600">
              Get help finding neighborhood information using voice-friendly
              features.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}