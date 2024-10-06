const express = require('express');
const app = express();
const quotesRouter = require('./routes/quotesRoutes');
const categoriesRouter = require('./routes/categoriesRoutes');

app.use('/quotes', quotesRouter);
app.use('/categories', categoriesRouter);

module.exports = app;
