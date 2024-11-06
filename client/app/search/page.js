'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@components/Button';
import InputField from '@components/InputField';
import Quotes from '@components/Quotes';

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
  const [validationErrors, setValidationErrors] = useState({});

  const handleSearch = async () => {
    setSearchButtonClicked(true);

    if (Object.keys(validationErrors).length > 0) {
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

    const newValidationErrors = { ...validationErrors };
    if (errorMessage) {
      newValidationErrors[name] = errorMessage;
    } else {
      delete newValidationErrors[name]; // Remove the error if there is none
    }

    setValidationErrors(newValidationErrors);
  };

  const inputFields = [
    {
      name: 'text',
      placeholder: 'Search by text',
      value: text,
      error: validationErrors.text,
    },
    {
      name: 'author',
      placeholder: 'Search by author',
      value: author,
      error: validationErrors.author,
    },
    {
      name: 'category',
      placeholder: 'Search by category',
      value: category,
      error: validationErrors.category,
    },
    { name: 'limit', placeholder: 'limit', value: limit || '', error: null },
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6 text-center dark:text-white">
        Search Quotes
      </h1>

      <div className="text-xl grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_0.3fr] gap-4 mb-6">
        {inputFields.map(({ name, placeholder, value, error }) => (
          <InputField
            key={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleInputChange(name, e.target.value)}
            error={error}
            showError={searchButtonClicked}
          />
        ))}
      </div>

      <div className="flex justify-center mb-6">
        <Button onClick={handleSearch} text="Search" />
        <Button onClick={clearSearch} text="Clear" variant="secondary" />
      </div>

      {quotes.length > 0 ? (
        <Quotes quotes={quotes} />
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
