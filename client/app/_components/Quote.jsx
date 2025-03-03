import Link from 'next/link';

const MAX_VISIBLE_TEXT_LENGTH = 200;
const MAX_VISIBLE_CATEGORIES = 10;

export default function Quote({ quote, selectedCategory }) {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 p-4 shadow-md rounded-lg hover:-translate-y-1.5 hover:bg-gray-100 hover:dark:bg-gray-700 transition-transform duration 400">
      <Link href={`/quotes/${quote.id}`}>
        <p className="mb-4 text-xl italic text-gray-900 dark:text-gray-100">
          "
          {quote.text.length > MAX_VISIBLE_TEXT_LENGTH
            ? `${quote.text.slice(0, MAX_VISIBLE_TEXT_LENGTH)}...`
            : quote.text}
          "
        </p>
        <p className="mb-10 text-right text-xl font-semibold text-gray-700 dark:text-gray-300">
          — {quote.author}
        </p>
      </Link>

      <div className="flex flex-wrap mt-2">
        {quote.categories.slice(0, MAX_VISIBLE_CATEGORIES).map((category) => (
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
        {quote.categories.length > MAX_VISIBLE_CATEGORIES && (
          <span className="text-3xl">...</span>
        )}
      </div>
    </div>
  );
}
