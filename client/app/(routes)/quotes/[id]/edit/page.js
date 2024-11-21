'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { API_URL } from '@config/config';
import { isQuoteFormValid } from '@utils/validation';
import QuoteForm from '@components/QuoteForm';

export default function EditQuotePage({ params }) {
  const { id } = params;
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [categories, setCategories] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const QUOTE_API_URL = `${API_URL}/quotes/${id}`;

  useEffect(() => {
    // Fetch the existing quote data
    const fetchQuote = async () => {
      try {
        const response = await fetch(QUOTE_API_URL);
        if (!response.ok) throw new Error('Failed to load quote data');
        const data = await response.json();
        setText(data.text);
        setAuthor(data.author);
        setCategories(data.categories.join(', ')); // Assuming categories is an array
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuote();
  }, [id]);

  const handleSubmit = async () => {
    if (!isQuoteFormValid({ text, author, categories, setValidationErrors }))
      return;

    const payload = {
      text,
      author,
      categories: categories.split(',').map((category) => category.trim()),
    };

    try {
      const response = await fetch(QUOTE_API_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to update quote.');
      const data = await response.json();
      toast.success('Quote updated successfully!');
      router.push(`/quotes/${id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={60} color="#4A90E2" />
      </div>
    );
  }

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
      buttonText="Update"
    />
  );
}
