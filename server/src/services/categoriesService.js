const { Op } = require('sequelize');
const Category = require('../models/Category');

const attributes = { exclude: ['createdAt', 'updatedAt'] };

const findCategories = async ({ limit, offset, name }) => {
  const whereClause = {};
  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }
  const categories = await Category.findAll({
    limit,
    offset,
    attributes,
    order: [['id', 'ASC']],
    where: whereClause,
  });
  return categories;
};

const findSingleCategory = async (id) => {
  const category = await Category.findByPk(id, {
    attributes,
  });
  return category;
};

module.exports = { findCategories, findSingleCategory };
