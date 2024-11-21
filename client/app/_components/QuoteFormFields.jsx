import InputField from '@components/InputField';

export default function QuoteFormFields({
  text,
  setText,
  author,
  setAuthor,
  categories,
  setCategories,
  validationErrors,
}) {
  const inputFields = [
    {
      name: 'text',
      placeholder: 'Quote text',
      value: text,
      error: validationErrors.text,
      onChange: (e) => setText(e.target.value),
    },
    {
      name: 'author',
      placeholder: 'Author',
      value: author,
      error: validationErrors.author,
      onChange: (e) => setAuthor(e.target.value),
    },
    {
      name: 'categories',
      placeholder: 'Categories (comma-separated)',
      value: categories,
      error: validationErrors.categories,
      onChange: (e) => setCategories(e.target.value),
    },
  ];

  return (
    <div className="text-xl grid grid-cols-1 gap-4 mx-auto mb-6 md:w-3/4 lg:w-1/2">
      {inputFields.map(({ name, placeholder, value, error, onChange }) => (
        <InputField
          key={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
          showError={true}
        />
      ))}
    </div>
  );
}
