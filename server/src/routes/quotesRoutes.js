const express = require('express');
const { query, param } = require('express-validator');
const validationErrorHandler = require('../middlewares/validationErrorHandler');
const router = express.Router();
const quotesController = require('../controllers/quotesController');

const getAllQuotesValidators = [
  query('limit').optional().trim().isInt({ min: 1, max: 50 }),
  query('offset').optional().trim().isInt({ min: 0 }),
  query('author').optional().trim().escape(),
  query('text').optional().trim().escape(),
  query('category')
    .optional()
    .trim()
    .escape()
    .custom((value) => {
      const regex = /^[a-z\-]+$/;
      return regex.test(value)
        ? Promise.resolve()
        : Promise.reject('Categories can only contain letters and dashes');
    }),
];

router.get(
  '/',
  getAllQuotesValidators,
  validationErrorHandler,
  quotesController.getAllQuotes
);

router.get(
  '/:id',
  [param('id').trim().isInt({ min: 1 })],
  validationErrorHandler,
  quotesController.getQuoteById
);

module.exports = router;
