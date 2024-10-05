const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    aloowNull: false,
    unique: true,
  },
});

module.exports = Category;
