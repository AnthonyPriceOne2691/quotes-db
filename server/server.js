const app = require('./src/app');
const { APP_PORT } = require('./src/config/config');
const databaseInit = require('./src/config/databaseinit');

const startServer = async () => {
  try {
    await databaseInit();

    app.listen(APP_PORT, () => {
      console.log(`Quotes API server is listening on the port ${APP_PORT}`);
    });
  } catch (error) {
    console.error('Unable to sync database', error);
    process.exit(1);
  }
};

startServer();
