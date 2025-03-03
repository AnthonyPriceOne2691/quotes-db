import Link from 'next/link';

export default function Quote({ quote, selectedCategory }) {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 p-4 shadow-md rounded-lg hover:-translate-y-1.5 hover:bg-gray-100 hover:dark:bg-gray-700 transition-transform duration 400">
      <Link href={`/quotes/${quote.id}`}>
        <p className="mb-4 text-xl italic text-gray-900 dark:text-gray-100">
          "{quote.text}"
        </p>
        <p className="mb-10 text-right text-xl font-semibold text-gray-700 dark:text-gray-300">
          — {quote.author}
        </p>
      </Link>

      <div className="flex flex-wrap mt-2">
        {quote.categories.map((category) => (
          <Link
            key={category}
            href={`/search?category=${category}`}
            className={`${
              category === selectedCategory ? 'bg-yellow-200' : 'bg-blue-200'
            } text-lg text-gray-700 dark:text-gray-800 px-2 py-1 rounded-full mr-2 mb-2`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}
