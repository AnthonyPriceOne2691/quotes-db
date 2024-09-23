const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const QuoteCategory = require("./quoteCategory");
const Category = require("./category");

const Quote = sequelize.define("Quote", {
  quote: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Quote.belongsToMany(Category, { through: QuoteCategory });
Category.belongsToMany(Quote, { through: QuoteCategory });

module.exports = Quote;
