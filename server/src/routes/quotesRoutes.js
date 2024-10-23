const express = require('express');
const validationErrorHandler = require('../middlewares/validationErrorHandler');
const router = express.Router();
const quotesController = require('../controllers/quotesController');
const {
  getQuotesValidators,
  getRandomQuotesValidators,
  getSingleQuoteValidators,
  deleteSingleQuoteValidators,
  postQuotesValidators,
} = require('../middlewares/quoteValidators');

router.get(
  '/',
  getQuotesValidators,
  validationErrorHandler,
  quotesController.getQuotes
);

router.post(
  '/',
  postQuotesValidators,
  validationErrorHandler,
  quotesController.postQuote
);

router.get(
  '/random',
  getRandomQuotesValidators,
  validationErrorHandler,
  quotesController.getRandomQuotes
);

router.get(
  '/:id',
  getSingleQuoteValidators,
  validationErrorHandler,
  quotesController.getQuoteById
);

router.delete(
  '/:id',
  deleteSingleQuoteValidators,
  validationErrorHandler,
  quotesController.deleteQuoteById
);

module.exports = router;
