const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const QuoteCategory = require('./QuoteCategory');
const Category = require('./Category');

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
