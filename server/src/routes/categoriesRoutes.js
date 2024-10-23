const express = require('express');
const router = express.Router();
const validationErrorHandler = require('../middlewares/validationErrorHandler');
const categoriesController = require('../controllers/categoriesController');
const {
  getCategoriesValidators,
  getSingleCategoryValidators,
} = require('../middlewares/categoryValidators');

router.get(
  '/',
  getCategoriesValidators,
  validationErrorHandler,
  categoriesController.getCategories
);

router.get(
  '/:id',
  getSingleCategoryValidators,
  validationErrorHandler,
  categoriesController.getCategoryById
);

module.exports = router;
