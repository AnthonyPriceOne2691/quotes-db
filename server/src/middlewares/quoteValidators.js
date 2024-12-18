const { query, param, body } = require('express-validator');
const { CATEGORY_NAME_REGEX } = require('./categoryValidators');

const getQuotesValidators = [
  query('limit')
    .optional()
    .trim()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be in range 1...50'),
  query('offset').optional().trim().isInt({ min: 0 }),
  query('author').optional().trim().escape(),
  query('text').optional().trim().escape(),
  query('category')
    .optional()
    .trim()
    .escape()
    .custom((value) => {
      const regex = CATEGORY_NAME_REGEX;
      return regex.test(value)
        ? Promise.resolve()
        : Promise.reject(
            'Categories can only contain numbers, lowercase letters and dashes'
          );
    }),
];

const postQuotesValidators = [
  body('text')
    .trim()
    .isString()
    .isLength({ min: 10 })
    .withMessage('Text is required and has to be minimum 10 characters'),
  body('author')
    .trim()
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Author must be a string from 2 to 255 characters'),
  body('categories')
    .isArray({ min: 1 })
    .withMessage('Categories must be an array with at least one category'),
  body('categories.*')
    .trim()
    .matches(CATEGORY_NAME_REGEX)
    .withMessage('Each category mist be lowercase letters, numbers and dashes'),
];

const getRandomQuotesValidators = [
  query('limit').optional().trim().isInt({ min: 1, max: 20 }),
];

const quoteIdParamValidator = param('id')
  .trim()
  .isInt({ min: 1, max: 2147483647 })
  .withMessage('Quote ID must be an integer in range 1...2147483647');

const getSingleQuoteValidators = [quoteIdParamValidator];

const deleteSingleQuoteValidators = [quoteIdParamValidator];

const patchSingleQuoteValidators = [
  quoteIdParamValidator,
  body('text')
    .optional()
    .trim()
    .isString()
    .isLength({ min: 10 })
    .withMessage('Text must be contain minimum 10 characters'),
  body('author')
    .optional()
    .trim()
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Author must be a string from 2 to 255 characters'),
  body('categories').optional().isArray({ min: 1 }),
  body('categories.*')
    .optional()
    .trim()
    .matches(CATEGORY_NAME_REGEX)
    .withMessage(
      'Each category mist be only lowercase letters, numbers and dashes'
    ),
];

module.exports = {
  getQuotesValidators,
  getRandomQuotesValidators,
  getSingleQuoteValidators,
  deleteSingleQuoteValidators,
  postQuotesValidators,
  patchSingleQuoteValidators,
};
