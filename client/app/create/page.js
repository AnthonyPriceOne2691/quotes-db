'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@components/Button';
import InputField from '@components/InputField';
import { toast } from 'react-toastify';
import { API_URL } from '@config/config';

export default function CreateQuotePage() {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [categories, setCategories] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const router = useRouter();

  const isFormValid = () => {
    const errors = {};
    if (text.length < 10)
      errors.text = 'Text must be at least 10 characters long.';
    if (author.length < 2 || author.length > 255)
      errors.author = 'Author must be between 2 and 255 characters long.';
    if (!categories.trim())
      errors.categories = 'There must be at least one category.';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }

    const payload = {
      text,
      author,
      categories: categories.split(',').map((category) => category.trim()),
    };

    try {
      const response = await fetch(`${API_URL}/quotes`, {
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
