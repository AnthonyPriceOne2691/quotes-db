import Link from 'next/link';
import CategoryTags from '@components/CategoryTags';

const MAX_VISIBLE_TEXT_LENGTH = 200;

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

      <CategoryTags categories={quote.categories} selectedCategory={selectedCategory} />
      </div>
  );
}
