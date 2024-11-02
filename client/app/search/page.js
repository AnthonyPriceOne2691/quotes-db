'use client';

import { useState } from 'react';
import Button from '../../components/Button';
import Quote from '../../components/Quote';

// Regex for category validation
const CATEGORY_NAME_REGEX = /^[a-z0-9\-]+$/;

const createSearchQueryString = ({ text, author, category }) => {
  const params = new URLSearchParams();

  if (text) params.append('text', text);
  if (author) params.append('author', author);
  if (category) params.append('category', category);

  params.append('limit', 10);

  return params.toString();
};

export default function Search() {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [errors, setErrors] = useState({});

  const handleSearch = async () => {
    setSearchButtonClicked(true);

    if (Object.keys(errors).length > 0) {
      return; // Exit early if there are validation errors
    }

    try {
      setSearchSubmitted(true);
      const query = createSearchQueryString({ text, author, category });
      const response = await fetch(`http://localhost:3000/quotes?${query}`);
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const getValidationMessage = (name, value) => {
    if (name === 'text' && value && value.length < 3) {
      return 'Text must be at least 3 characters long.';
    }
    if (name === 'author' && value && value.length < 2) {
      return 'Author must be at least 2 characters long.';
    }
    if (name === 'category' && value && !CATEGORY_NAME_REGEX.test(value)) {
      return 'Category can only contain lowercase letters, numbers, and dashes.';
    }
  };

  const handleInputChange = (name, value) => {
    if (name === 'text') setText(value);
    if (name === 'author') setAuthor(value);
    if (name === 'category') setCategory(value);

    const errorMessage = getValidationMessage(name, value);

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (errorMessage) {
        newErrors[name] = errorMessage;
      } else {
        delete newErrors[name]; // Remove the error if there is none
      }
      return newErrors;
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6 text-center dark:text-white">
        Search Quotes
      </h1>

      <div className="text-xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search by text"
            value={text}
            onChange={(e) => handleInputChange('text', e.target.value)}
            className="p-2 w-full border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          {searchButtonClicked && errors.text && (
            <p className="text-red-500 text-base">{errors.text}</p>
          )}
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Search by author"
            value={author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            className="p-2 w-full border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          {searchButtonClicked && errors.author && (
            <p className="text-red-500 text-base">{errors.author}</p>
          )}
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Search by category"
            value={category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="p-2 w-full border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          {searchButtonClicked && errors.category && (
            <p className="text-red-500 text-base">{errors.category}</p>
          )}
        </div>
      </div>

      {/* Search Button */}
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
        searchSubmitted && (
          <p className="text-2xl pt-10 text-center text-gray-600 dark:text-gray-400">
            No quotes found.
          </p>
        )
      )}
    </div>
  );
}
