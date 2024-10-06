const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      limit: 10,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  if (isNaN(categoryId)) {
    return res
      .status(400)
      .json({ message: `Invalid quote ID ${categoryId}: must be a number` });
  }
  const category = await Category.findByPk(categoryId, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  if (category) {
    res.json(category);
  } else {
    res
      .status(404)
      .json({ message: `category with ID ${categoryId} not found` });
  }
};

module.exports = { getAllCategories, getCategoryById };
