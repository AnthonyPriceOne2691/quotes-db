'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { isQuoteFormValid } from '@utils/validation';
import QuoteForm from '@components/QuoteForm';
import fetcher from '@utils/fetcher';

export default function EditQuotePage({ params }) {
  const { id } = params;
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [categories, setCategories] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const QUOTE_API_ENDPOINT = `quotes/${id}`;

  useEffect(() => {
    // Fetch the existing quote data
    const fetchQuote = async () => {
      const data = await fetcher.get(QUOTE_API_ENDPOINT);
      if (data) {
        setText(data.text);
        setAuthor(data.author);
        setCategories(data.categories.join(', ')); // Assuming categories is an array
      }
      setIsLoading(false);
    };
    fetchQuote();
  }, []);

  const handleSubmit = async () => {
    if (!isQuoteFormValid({ text, author, categories, setValidationErrors }))
      return;

    const payload = {
      text,
      author,
      categories: categories.split(',').map((category) => category.trim()),
    };

    const data = await fetcher.patch(QUOTE_API_ENDPOINT, payload);
    if (data) {
      toast.success('Quote updated successfully!');
      router.push(`/quotes/${id}`);
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
