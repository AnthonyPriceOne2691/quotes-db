'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@components/Button';
import InputField from '@components/InputField';
import { toast } from 'react-toastify';
import { API_URL } from '@config/config';
import { isFormValid } from 'app/quotes/utils/validation';

const QUOTES_URL = `${API_URL}/quotes`;

export default function CreateQuotePage() {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [categories, setCategories] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const router = useRouter();

  const handleSubmit = async () => {
    if (!isFormValid({ text, author, categories, setValidationErrors })) {
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
    <div className="p-4">
      <h1 className="text-3xl mb-6 text-center dark:text-white">
        Create New Quote
      </h1>
      <div className="text-xl grid grid-cols-1 gap-4 mx-auto mb-6 md:w-3/4 lg:w-1/2">
        <InputField
          placeholder="Quote text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          error={validationErrors.text}
          showError={true}
        />
        <InputField
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          error={validationErrors.author}
          showError={true}
        />
        <InputField
          placeholder="Categories (comma-separated)"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          error={validationErrors.categories}
          showError={true}
        />
      </div>
      <div className="flex justify-center mb-6">
        <Button onClick={handleSubmit} text="Create" />
      </div>
    </div>
  );
}
