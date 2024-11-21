export const createQuoteInputFields = ({
  text,
  setText,
  author,
  setAuthor,
  categories,
  setCategories,
  validationErrors,
}) => {
  return [
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
};

export const createSearchInputFields = ({
  text,
  author,
  category,
  limit,
  validationErrors,
}) => {
  return [
    {
      name: 'text',
      placeholder: 'Search by text',
      value: text,
      error: validationErrors.text,
    },
    {
      name: 'author',
      placeholder: 'Search by author',
      value: author,
      error: validationErrors.author,
    },
    {
      name: 'category',
      placeholder: 'Search by category',
      value: category,
      error: validationErrors.category,
    },
    { name: 'limit', placeholder: 'limit', value: limit || '', error: null },
  ];
};
