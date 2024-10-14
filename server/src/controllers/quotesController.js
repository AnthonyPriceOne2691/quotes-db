const Quote = require('../models/Quote');
const Category = require('../models/Category');
const { Op } = require('sequelize');

const attributes = { exclude: ['createdAt', 'updatedAt'] };

const includeCategoryConfig = {
  model: Category,
  attributes: ['name'],
  through: { attributes: [] },
};

const getAllQuotes = async (req, res) => {
  const { limit = 5, offset = 0, author, text, category } = req.query;
  const whereClause = {};

  if (author) {
    whereClause.author = {
      [Op.iLike]: `%${author}%`,
    };
  }
  if (text) {
    whereClause.text = {
      [Op.iLike]: `%${text}%`,
    };
  }

  try {
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
      res.json(quotes);
    } else {
      const quotesIds = quotes.map((quote) => quote.id);
      const quotesByIds = await Quote.findAll({
        attributes,
        order: [['id', 'ASC']],
        include: includeCategoryConfig,
        where: { id: quotesIds },
      });
      res.json(quotesByIds);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getQuoteById = async (req, res) => {
  const quoteId = req.params.id;

  try {
    const quote = await Quote.findByPk(quoteId, {
      attributes,
      include: includeCategoryConfig,
    });
    if (quote) {
      res.json(quote);
    } else {
      res.status(404).json({ message: `Quote with ID ${quoteId} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllQuotes, getQuoteById };
