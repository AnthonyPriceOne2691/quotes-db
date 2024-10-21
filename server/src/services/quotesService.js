const Quote = require('../models/Quote');
const Category = require('../models/Category');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

const attributes = { exclude: ['createdAt', 'updatedAt'] };

const includeCategoryConfig = {
  model: Category,
  attributes: ['name'],
  through: { attributes: [] },
};

const findQuotes = async ({ limit, offset, author, text, category }) => {
  const whereClause = {};
  if (author) {
    whereClause.author = { [Op.iLike]: `%${author}%` };
  }
  if (text) {
    whereClause.text = { [Op.iLike]: `%${text}%` };
  }

  const quotes = await Quote.findAll({
    attributes,
    limit,
    offset,
    order: [['id', 'ASC']],
    include: {
      ...includeCategoryConfig,
      where: category ? { name: category } : {},
    },
    where: whereClause,
  });

  if (!category) {
    return quotes;
  } else {
    const quotesIds = quotes.map((quote) => quote.id);
    const quotesByIds = await Quote.findAll({
      attributes,
      order: [['id', 'ASC']],
      include: includeCategoryConfig,
      where: { id: quotesIds },
    });
    return quotesByIds;
  }
};

const findRandomQuotes = async (limit) => {
  const quotes = await Quote.findAll({
    attributes,
    limit,
    order: sequelize.random(),
    include: includeCategoryConfig,
  });
  return quotes;
};

const findSingleQuote = async (id) => {
  const quote = await Quote.findByPk(id, {
    attributes,
    include: includeCategoryConfig,
  });
  return quote;
};

module.exports = { findQuotes, findSingleQuote, findRandomQuotes };
