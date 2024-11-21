import QuoteFormFields from '@components/QuoteFormFields';
import Button from '@components/Button';

export default function QuoteForm({
  text,
  setText,
  author,
  setAuthor,
  categories,
  setCategories,
  validationErrors,
  handleSubmit,
  buttonText,
}) {
  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6 text-center dark:text-white">
        {buttonText === 'Create' ? 'Create New Quote' : 'Edit Quote'}
      </h1>
      <QuoteFormFields
        text={text}
        setText={setText}
        author={author}
        setAuthor={setAuthor}
        categories={categories}
        setCategories={setCategories}
        validationErrors={validationErrors}
      />
      <div className="flex justify-center mb-6">
        <Button onClick={handleSubmit} text={buttonText} />
      </div>
    </div>
  );
}
