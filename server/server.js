const app = require('./src/app');
require('dotenv').config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Quotes API server is listening on the port ${port}`);
});
