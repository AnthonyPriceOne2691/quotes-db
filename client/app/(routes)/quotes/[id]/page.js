'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import Button from '@components/Button';
import { API_URL } from '@config/config';
import Link from 'next/link';

export default function QuotePage(props) {
  const { id } = props.params;
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const SINGLE_QUOTE_API_URL = `${API_URL}/quotes/${id}`;

  const isValidId = (id) => {
    const parsedId = parseInt(id, 10);
    return Number.isInteger(parsedId) && parsedId > 0;
  };

  const deleteQuote = async () => {
    const response = await fetch(SINGLE_QUOTE_API_URL, {
      method: 'DELETE',
    });

    if (!response.ok) {
      toast.error(
        response.status === 404
          ? `Quote with id ${id} was not found`
          : `Unknown error. Quote with id ${id} was not deleted`
      );
      return;
    }

    toast.success(`Quote with id ${id} was successfully deleted`);
    setTimeout(() => router.push('/'), 2000);
  };

  const fetchQuote = async () => {
    if (!isValidId(id)) {
      toast.error(
        `Invalid quote ID ${id}. It must be an integer greater than 0.`
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(SINGLE_QUOTE_API_URL);
      const data = await response.json();
      if (response.status === 404) {
        toast.error(data.message);
        console.log(data.message);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={60} color="#4A90E2" />
      </div>
    );
  }

  if (!quote) {
    return (
      <p className="text-center text-2xl mt-10">{`Quote with id ${id} not found.`}</p>
    );
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 mt-7 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-violet-900 dark:text-violet-300">
          {quote.text}
        </h2>
        <p className="text-2xl text-center text-gray-600 dark:text-gray-300 mb-4">
          — {quote.author}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {quote.categories.map((category) => (
            <span
              key={category}
              className="text-base bg-violet-200 text-violet-900 py-2 px-4 rounded-lg dark:bg-violet-700 dark:text-violet-100"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <Link href={`/quotes/${quote.id}/edit`}>
          <Button text="Edit" variant="primary" />
        </Link>
        <Button onClick={deleteQuote} text="Delete" variant="danger" />
      </div>
    </div>
  );
}