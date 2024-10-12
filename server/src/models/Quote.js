const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const QuoteCategory = require('./QuoteCategory');
const Category = require('./Category');

const fields = {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
  },
};

const afterFind = (results) => {
  if (results) {
    const quotes = Array.isArray(results) ? results : [results];
    quotes.forEach((quote) => {
      if (quote.Categories) {
        quote.dataValues.categories = quote.Categories.map(
          (category) => category.name
        );
        delete quote.dataValues.Categories;
      }
    });
  }
};

const Quote = sequelize.define('Quote', fields, {
  hooks: { afterFind },
});

Quote.belongsToMany(Category, { through: QuoteCategory });
Category.belongsToMany(Quote, { through: QuoteCategory });

module.exports = Quote;
