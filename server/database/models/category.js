const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    aloowNull: false,
    unique: true,
  },
});

module.exports = Category;
