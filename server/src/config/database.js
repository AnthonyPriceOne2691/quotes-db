const { Sequelize } = require('sequelize');
const { DB } = require('./config');

const sequelize = new Sequelize(DB.NAME, DB.USER, DB.PASSWORD, {
  dialect: DB.DIALECT,
  host: DB.HOST,
  port: DB.PORT,
  logging: false,
});

module.exports = sequelize;
