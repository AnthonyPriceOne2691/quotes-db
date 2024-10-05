const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db', 'admin', 'admin_password', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  logging: false,
});

module.exports = sequelize;
