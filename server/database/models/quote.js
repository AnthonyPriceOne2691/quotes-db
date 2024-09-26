const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const QuoteCategory = require('./quoteCategory');
const Category = require('./category');

const Quote = sequelize.define('Quote', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
  },
});

Quote.belongsToMany(Category, { through: QuoteCategory });
Category.belongsToMany(Quote, { through: QuoteCategory });

module.exports = Quote;
