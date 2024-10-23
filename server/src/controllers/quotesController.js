const {
  findQuotes,
  findSingleQuote,
  findRandomQuotes,
  createQuote,
  deleteSingleQuote,
} = require('../services/quotesService');
const handleServerErrors = require('../utils/handleServerErrors');

const getAllQuotes = handleServerErrors(async (req, res) => {
  const { limit = 5, offset = 0, author, text, category } = req.query;
  const quotes = await findQuotes({ limit, offset, author, text, category });
  res.json(quotes);
});

const getRandomQuotes = handleServerErrors(async (req, res) => {
  const { limit = 3 } = req.query;
  const quotes = await findRandomQuotes(limit);
  res.json(quotes);
});

const getQuoteById = handleServerErrors(async (req, res) => {
  const quoteId = req.params.id;
  const quote = await findSingleQuote(quoteId);
  if (quote) {
    res.json(quote);
  } else {
    res.status(404).json({ message: `Quote with ID ${quoteId} not found` });
  }
});

const deleteQuoteById = handleServerErrors(async (req, res) => {
  const quoteId = req.params.id;
  const deletedQuoteId = await deleteSingleQuote(quoteId);
  if (deletedQuoteId) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: `Quote with ID ${quoteId} not found` });
  }
});

const postQuote = handleServerErrors(async (req, res) => {
  const { text, author, categories } = req.body;
  const quote = await createQuote({ text, author, categories });
  res.status(200).json(quote);
});

module.exports = {
  getAllQuotes,
  getQuoteById,
  getRandomQuotes,
  postQuote,
  deleteQuoteById,
};
