import Link from 'next/link';

export default function Quote({ quote }) {
  return (
    <Link
      href={`/quotes/${quote.id}`}
      className="bg-gray-100 dark:bg-gray-800 p-4 shadow-md rounded-lg hover:-translate-y-1.5 hover:bg-gray-100 hover:dark:bg-gray-700 transition-transform duration-400"
    >
      <p className="mb-4 text-lg italic text-gray-900 dark:text-gray-100">
        "{quote.text}"
      </p>
      <p className="mb-10 text-xl text-right font-semibold text-gray-700 dark:text-gray-300">
        — {quote.author}
      </p>
      <div className="flex flex-wrap mt-2">
        {quote.categories.map((category) => (
          <span
            key={category}
            className="text-lg bg-blue-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full mr-2 mb-2"
          >
            {category}
          </span>
        ))}
      </div>
    </Link>
  );
}
