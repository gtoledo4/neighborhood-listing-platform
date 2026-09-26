"use client";
export default function SearchFilters() {
  return (
    <form
      className="rounded-lg bg-gray-100 p-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <h2 className="text-xl font-semibold">
        Search properties
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="property-type"
            className="block font-medium"
          >
            Property type
          </label>

          <select
            id="property-type"
            name="propertyType"
            className="mt-1 w-full rounded border border-gray-400 bg-white p-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            <option value="">All property types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="townhouse">Townhouse</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="maximum-price"
            className="block font-medium"
          >
            Maximum price
          </label>

          <select
            id="maximum-price"
            name="maximumPrice"
            className="mt-1 w-full rounded border border-gray-400 bg-white p-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            <option value="">No maximum price</option>
            <option value="300000">$300,000</option>
            <option value="500000">$500,000</option>
            <option value="750000">$750,000</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 rounded bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
      >
        Search properties
      </button>
    </form>
  );
}