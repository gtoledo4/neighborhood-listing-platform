export default function Header() {
  return (
    <header className="border-b bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
      >
        <a href="/" className="text-xl font-bold text-gray-900">
          Neighborhood Listings
        </a>

        <div className="flex gap-6">
          <a
            href="/"
            className="text-gray-600 hover:text-gray-900"
          >
            Home
          </a>

          <a
            href="/listings"
            className="text-gray-600 hover:text-gray-900"
          >
            Listings
          </a>
        </div>
      </nav>
    </header>
  );
}