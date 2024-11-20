import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Quotes App
          </h1>
        </Link>

        <div className="text-xl pl-20 flex space-x-8">
          <Link
            href="/"
            className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
          >
            Random
          </Link>
          <Link
            href="/search"
            className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
          >
            Search
          </Link>
          <Link
            href="/quotes/create"
            className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
          >
            Create New
          </Link>
        </div>
      </div>
    </nav>
  );
}
