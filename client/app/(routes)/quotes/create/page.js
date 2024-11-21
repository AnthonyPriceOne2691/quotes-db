'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { API_URL } from '@config/config';
import { isQuoteFormValid } from '@utils/validation';
import QuoteForm from '@components/QuoteForm';

const QUOTES_URL = `${API_URL}/quotes`;

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

    try {
      const response = await fetch(QUOTES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create quote.');
      }

      const data = await response.json();
      toast.success('Quote created successfully!');

      // Redirect to the new quote page using the ID of the created quote
      router.push(`/quotes/${data.id}`);
    } catch (error) {
      toast.error(error.message);
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
