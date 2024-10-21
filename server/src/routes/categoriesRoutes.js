const express = require('express');
const router = express.Router();
const { query, param } = require('express-validator');
const validationErrorHandler = require('../middlewares/validationErrorHandler');
const categoriesController = require('../controllers/categoriesController');

const getAllCategoriesValidators = [
  query('limit').optional().trim().isInt({ min: 1, max: 50 }),
  query('offset').optional().trim().isInt({ min: 0 }),
  query('name')
    .optional()
    .trim()
    .escape()
    .custom((value) => {
      const regex = /^[a-z\-]+$/i;
      return regex.test(value)
        ? Promise.resolve()
        : Promise.reject('Categories can only contain letters and dashes');
    }),
];

router.get(
  '/',
  getAllCategoriesValidators,
  validationErrorHandler,
  categoriesController.getAllCategories
);

router.get(
  '/:id',
  [param('id').trim().isInt({ min: 1 })],
  validationErrorHandler,
  categoriesController.getCategoryById
);

module.exports = router;
