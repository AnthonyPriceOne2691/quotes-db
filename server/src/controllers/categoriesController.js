const {
  findCategories,
  findSingleCategory,
} = require('../services/categoriesService');

const getAllCategories = async (req, res) => {
  const { limit = 10, offset = 0, name } = req.query;
  try {
    const categories = await findCategories({ limit, offset, name });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  const category = await findSingleCategory(categoryId);
  if (category) {
    res.json(category);
  } else {
    res
      .status(404)
      .json({ message: `category with ID ${categoryId} not found` });
  }
};

module.exports = { getAllCategories, getCategoryById };
