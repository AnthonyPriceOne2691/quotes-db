'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@components/Button';
import Quotes from '@components/Quotes';
import { API_URL } from '@config/config';

const RANDOM_QUOTES_URL = `${API_URL}/quotes/random?limit=10`;

export default function RandomQuotesPage() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(RANDOM_QUOTES_URL);
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      toast.error(error.message);
      console.error('Error fetching quotes', error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6 text-center dark:text-white">
        Random Quotes
      </h1>
      <Button onClick={fetchQuotes} text="Get Random Quotes" />

      <Quotes quotes={quotes} />
    </div>
  );
}
