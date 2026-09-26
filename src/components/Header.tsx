import Link from "next/link";
export default function Header() {
  return (
    <header className="border-b bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
      >
        <Link href="/" className="text-xl font-bold text-gray-900">
          Neighborhood Listings
        </Link>

        <div className="flex gap-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900"
          >
            Home
          </Link>

          <Link
            href="/listings"
            className="text-gray-600 hover:text-gray-900"
          >
            Listings
          </Link>
        </div>
      </nav>
    </header>
  );
}