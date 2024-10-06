const Quote = require('../models/Quote');

const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit: 10,
    });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getQuoteById = async (req, res) => {
  const quoteId = req.params.id;
  if (isNaN(quoteId)) {
    return res
      .status(400)
      .json({ message: `Invalid quote ID ${quoteId}: must be a number` });
  }
  const quote = await Quote.findByPk(quoteId, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  if (quote) {
    res.json(quote);
  } else {
    res.status(404).json({ message: `Quote with ID ${quoteId} not found` });
  }
};

module.exports = { getAllQuotes, getQuoteById };
