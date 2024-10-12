const Quote = require('../models/Quote');
const Category = require('../models/Category');

const attributes = { exclude: ['createdAt', 'updatedAt'] };

const includeCategoryConfig = {
  model: Category,
  attributes: ['name'],
  through: { attributes: [] },
};

const getAllQuotes = async (req, res) => {
  const limit = req.query.limit || 5;
  const offset = req.query.offset || 0;

  try {
    const quotes = await Quote.findAll({
      attributes,
      limit,
      offset,
      order: [['id', 'ASC']],
      include: includeCategoryConfig,
    });
    res.json(quotes);
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
