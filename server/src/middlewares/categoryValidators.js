const { query, param } = require('express-validator');

const CATEGORY_NAME_REGEX = /^[a-z0-9\-]+$/;
const CATEGORY_NAME_I_REGEX = /^[a-z0-9\-]+$/i;

const getCategoriesValidators = [
  query('limit').optional().trim().isInt({ min: 1, max: 50 }),
  query('offset').optional().trim().isInt({ min: 0 }),
  query('name')
    .optional()
    .trim()
    .escape()
    .custom((value) => {
      const regex = CATEGORY_NAME_I_REGEX;
      return regex.test(value)
        ? Promise.resolve()
        : Promise.reject(
            'Categories can only contain letters, numbers and dashes'
          );
    }),
];

const getSingleCategoryValidators = [param('id').trim().isInt({ min: 1 })];

module.exports = {
  getCategoriesValidators,
  getSingleCategoryValidators,
  CATEGORY_NAME_REGEX,
};
