const express = require('express');
const { query, param } = require('express-validator');
const validationErrorHandler = require('../middlewares/validationErrorHandler');
const router = express.Router();
const quotesController = require('../controllers/quotesController');

router.get(
  '/',
  [
    query('limit').optional().trim().isInt({ min: 1, max: 50 }),
    query('offset').optional().trim().isInt({ min: 0 }),
  ],
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
