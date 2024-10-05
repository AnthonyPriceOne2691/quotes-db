const sequelize = require('../config/database');

const QuoteCategory = sequelize.define(
  'QuoteCategory',
  {
    // No need for any additional attributes in this table
  },
  {
    indexes: [
      { name: 'QuoteCategories_CategoryId', fields: ['CategoryId'] },
      { name: 'QuoteCategories_QuoteId', fields: ['QuoteId'] },
    ],
  }
);

module.exports = QuoteCategory;
