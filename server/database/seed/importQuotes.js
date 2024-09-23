const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Quote = require('../models/quote');
const Category = require('../models/category');
const sequelize = require('../models');

const CSV_FILENAME = path.resolve(__dirname, '../data/test-quotes.csv');

async function importQuotes() {
  try {
    // Synchronize models with the database
    await sequelize.sync({ force: true }); // Set force: true to drop existing tables and re-create them

    const categoriesSet = new Set(); // Set to store unique categories

    // First iteration: Collect unique categories
    const categoriesPromise = new Promise((resolve, reject) => {
      fs.createReadStream(CSV_FILENAME)
        .pipe(csv())
        .on('data', (row) => {
          const categories = row.category
            .split(',')
            .map((category) => category.trim());
          categories.forEach((category) => categoriesSet.add(category));
        })
        .on('end', () => {
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    await categoriesPromise;

    // Insert categories into the database
    const categoriesData = Array.from(categoriesSet).map((name) => ({ name }));
    await Category.bulkCreate(categoriesData);
    console.log('Categories imported successfully.');

    // Second iteration: Create quotes
    await new Promise((resolve, reject) => {
      fs.createReadStream(CSV_FILENAME)
        .pipe(csv())
        .on('data', async (row) => {
          // Insert the quote into the database
          const quote = await Quote.create({
            quote: row.quote,
            author: row.author,
          });

          // Associate the quote with its categories
          const categories = row.category
            .split(',')
            .map((category) => category.trim());
          const categoryInstances = await Category.findAll({
            where: { name: categories },
          });
          await quote.addCategories(categoryInstances);
        })
        .on('end', () => {
          console.log('Quotes imported successfully.');
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  } catch (error) {
    console.error('Error importing quotes:', error);
  }
}

importQuotes();
