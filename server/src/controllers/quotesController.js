const {
  findQuotes,
  findSingleQuote,
  findRandomQuotes,
  createQuote,
  deleteSingleQuote,
} = require('../services/quotesService');

const getAllQuotes = async (req, res) => {
  const { limit = 5, offset = 0, author, text, category } = req.query;

  try {
    const quotes = await findQuotes({ limit, offset, author, text, category });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRandomQuotes = async (req, res) => {
  const { limit = 3 } = req.query;
  try {
    const quotes = await findRandomQuotes(limit);
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getQuoteById = async (req, res) => {
  const quoteId = req.params.id;
  try {
    const quote = await findSingleQuote(quoteId);
    if (quote) {
      res.json(quote);
    } else {
      res.status(404).json({ message: `Quote with ID ${quoteId} not found` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteQuoteById = async (req, res) => {
  const quoteId = req.params.id;
  try {
    const deletedQuoteId = await deleteSingleQuote(quoteId);
    if (deletedQuoteId) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: `Quote with ID ${quoteId} not found` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postQuote = async (req, res) => {
  const { text, author, categories } = req.body;

  try {
    const quote = await createQuote({ text, author, categories });
    res.status(200).json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllQuotes,
  getQuoteById,
  getRandomQuotes,
  postQuote,
  deleteQuoteById,
};
