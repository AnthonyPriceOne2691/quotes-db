require('dotenv').config();

module.exports = {
  APP_PORT: process.env.APP_PORT || 3000,
  CSV_IMPORT_BATCH_SIZE: process.env.CSV_IMPORT_BATCH_SIZE || 2000,
  CSV_IMPORT_BATCH_TIMEOUT: process.env.CSV_IMPORT_BATCH_TIMEOUT || 50000,

  DB: {
    NAME: process.env.DB_NAME || 'db',
    USER: process.env.DB_USER || 'admin',
    PASSWORD: process.env.DB_PASSWORD || 'admin_password',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.DB_PORT || 5432,
    DIALECT: process.env.DB_DIALECT || 'postgres',
  },
};
