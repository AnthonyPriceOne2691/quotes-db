'use client';

import { useEffect, useState } from 'react';
import Button from '@components/Button';
import Quotes from '@components/Quotes';
import fetcher from '@utils/fetcher';

const RANDOM_QUOTES_LIMIT = 10;
const RANDOM_QUOTES_ENDPOINT = `quotes/random`;

export default function RandomQuotesPage() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    const queryParams = {
      limit: RANDOM_QUOTES_LIMIT,
    };
    const data = await fetcher.get(RANDOM_QUOTES_ENDPOINT, queryParams);
    if (data) setQuotes(data);
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
