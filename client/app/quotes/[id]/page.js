'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

export default function QuotePage(props) {
  const { id } = props.params;
  const [quote, setQuote] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  const isValidId = (id) => {
    const parseId = parseInt(id, 10);
    return Number.isInteger(parseId) && parseId > 0;
  };

  const fetchQuote = async () => {
    if (!isValidId(id)) {
      toast.error(
        `Invalid quote ID ${id}. It must be an integer greater than 0`
      );
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/quotes/${id}`);
      const data = await response.json();
      if (response.status === 404) {
        toast.error(data.message);
        return;
      }
      if (response.ok) {
        setQuote(data);
      }
    } catch (error) {
      toast.error(error.message);
      console.error('Error fetching quote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (isloading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={60} color="#4A90E2" />
      </div>
    );
  }

  if (!quote) {
    return (
      <p className="text-center text-2xl">{`Quote with id: ${id} not found`}</p>
    );
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <h2 className="text xl md:text-2xl font-bold text-center mb-6 text-violet-900 dark:text-violet-300">
          {quote.text}
        </h2>
        <p className="text-2xl text-center text-gray-600 dark:text-gray-300 mb-4">
          - {quote.author}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {quote.categories.map((category) => (
            <span
              key={category}
              className="text-base bg-violet-200 text-violet-900 py-2 px-4 rounded-lg dark:bg-violet-700
            dark:text-violet-100"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
