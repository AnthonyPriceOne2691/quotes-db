'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import Quote from '../../components/Quote';

// Regex for category validation
const CATEGORY_NAME_REGEX = /^[a-z0-9\-]+$/;

const createSearchQueryString = ({ text, author, category, limit = 10 }) => {
  const params = new URLSearchParams();

  if (text) params.append('text', text);
  if (author) params.append('author', author);
  if (category) params.append('category', category);
  if (limit) params.append('limit', limit);

  return params.toString();
};

export default function Search() {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState();
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [errors, setErrors] = useState({});

  const handleSearch = async () => {
    setSearchButtonClicked(true);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      setSearchSubmitted(true);
      const query = createSearchQueryString({ text, author, category, limit });
      const response = await fetch(`http://localhost:3000/quotes?${query}`);

      if (!response.ok) {
        const errorData = await response.json();
        if (!errorData.errors || !Array.isArray(errorData.errors)) {
          toast.error('Unexpected error occured');
          return;
        }
        const fieldErrors = errorData.errors
          .filter((err) => err.type === 'field')
          .map((err) => `${err.msg} (${err.path}, ${err.value})`);

        fieldErrors.forEach((errorMessage) => {
          toast.error(errorMessage);
        });

        return;
      }

      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      toast.error(error.message);
    }
  };

  const clearSearch = () => {
    setText('');
    setAuthor('');
    setCategory('');
    setLimit();
    setSearchButtonClicked(false);
    setQuotes([]);
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
    if (name === 'limit') setLimit(value);

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

      <div className="text-xl grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_0.3fr] gap-4 mb-6">
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
        <div className="w-full">
          <input
            type="text"
            placeholder="Limit"
            value={limit}
            onChange={(e) => handleInputChange('limit', e.target.value)}
            className="p-2 w-full border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <Button onClick={handleSearch} text="Search" />
        <Button onClick={clearSearch} text="Clear" variant="secondary" />
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
