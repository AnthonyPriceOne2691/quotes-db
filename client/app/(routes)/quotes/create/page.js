'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { isQuoteFormValid } from '@utils/validation';
import QuoteForm from '@components/QuoteForm';
import fetcher from '@utils/fetcher';

const QUOTES_URL_ENDPOINT = `quotes`;

export default function CreateQuotePage() {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [categories, setCategories] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const router = useRouter();

  const handleSubmit = async () => {
    if (!isQuoteFormValid({ text, author, categories, setValidationErrors })) {
      return;
    }

    const payload = {
      text,
      author,
      categories: categories.split(',').map((category) => category.trim()),
    };

    const data = await fetcher.post(QUOTES_URL_ENDPOINT, payload);
    if (data) {
      toast.success('Quote created successfully!');
      // Redirect to the new quote page using the ID of the created quote
      router.push(`/quotes/${data.id}`);
    }
  };

  return (
    <QuoteForm
      text={text}
      setText={setText}
      author={author}
      setAuthor={setAuthor}
      categories={categories}
      setCategories={setCategories}
      validationErrors={validationErrors}
      handleSubmit={handleSubmit}
      buttonText="Create"
    />
  );
}
