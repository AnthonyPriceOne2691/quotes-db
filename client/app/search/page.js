'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import Quote from '@/components/Quote';

const createSearchQuery = ({ text, author, category }) => {
  const params = new URLSearchParams();

  if (text) params.append('text', text);
  if (author) params.append('author', author);
  if (category) params.append('category', category);

  params.append('limit', 10);

  const query = params.toString();
  return query;
};

export default function Search() {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [searchSubmited, setSearchSubmitted] = useState(false);
  const [quotes, setQuotes] = useState([]);

  const handleSearch = async () => {
    try {
      setSearchSubmitted(true);
      const query = createSearchQuery({ text, author, category });

      const response = await fetch(`http://localhost:3000/quotes?${query}`);
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-6 text-center dark:text-white">
        Search Quotes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <input
          type="text"
          placeholder="Search by text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          placeholder="Search by author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          placeholder="Search by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="text-center mb-6">
        <Button onClick={handleSearch} text="Search" />
      </div>
      {quotes.length > 0 ? (
        <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((quote) => (
            <Quote key={quote.id} quote={quote} />
          ))}
        </div>
      ) : (
        searchSubmited && (
          <p className="text 2xl pt-8 text-center text-gray-600 dark:text-gray-400">
            No quotes found
          </p>
        )
      )}
    </div>
  );
}
