const express = require('express');
const app = express();
const quotesRouter = require('./routes/quotesRoutes');
const categoriesRouter = require('./routes/categoriesRoutes');
const jsonMiddleware = require('./middlewares/jsonMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(jsonMiddleware);

app.use('/quotes', quotesRouter);
app.use('/categories', categoriesRouter);

app.use(errorMiddleware);

module.exports = app;
