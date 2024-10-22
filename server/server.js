const app = require('./src/app');
require('dotenv').config();
const databaseInit = require('./src/config/databaseinit');

const startServer = async () => {
  try {
    await databaseInit();

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Quotes API server is listening on the port ${port}`);
    });
  } catch (error) {
    console.error('Unable to sync database', error);
    process.exit(1);
  }
};

startServer();
