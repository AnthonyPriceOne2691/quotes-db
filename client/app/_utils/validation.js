const CATEGORY_NAME_REGEX = /^[a-z0-9\-]+$/;

export const isQuoteFormValid = ({
  text,
  author,
  categories,
  setValidationErrors,
}) => {
  const errors = {};

  // Validate quote text
  if (text.length < 10)
    errors.text = 'Text must be at least 10 characters long.';

  // Validate quote author
  if (author.length < 2 || author.length > 255)
    errors.author = 'Author must be between 2 and 255 characters long.';

  // Validate quote categories (split by comma and trim whitespace)
  if (!categories.trim()) {
    errors.categories = 'There must be at least one category.';
  } else {
    const categoryArray = categories
      .split(',')
      .map((category) => category.trim());

    const invalidCategories = categoryArray.filter(
      (category) => !CATEGORY_NAME_REGEX.test(category)
    );

    if (invalidCategories.length > 0) {
      errors.categories = `Invalid categories: ${invalidCategories.join(
        ', '
      )}. Category names can only contain lowercase letters, numbers, and dashes.`;
    }
  }

  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};