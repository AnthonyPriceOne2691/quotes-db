'use client';

import { useEffect, useState } from 'react';

const RANDOM_QUOTES_URL = 'http://localhost:3000/quotes/random?limit=10';

export default function Home() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(RANDOM_QUOTES_URL);
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes', error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center text-3xl mb-6 dark:text-white">
        Quotes frontend app
      </h1>

      <div className="text-center m-10">
        <button
          onClick={fetchQuotes}
          className="px-6 py-3 text-xl bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Get Random Quotes
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg"
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
                  className="text-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full mr-2 mb-2"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
