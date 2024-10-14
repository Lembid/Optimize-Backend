require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { initializeDB, saveDatabase } = require('./config/database');
const adminRoutes = require('./routes/admin');
const fs = require('fs').promises;

const app = express();
const DATABASE_FILE = process.env.DATABASE_FILE || path.join(__dirname, 'database.json');

initializeDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/admin', adminRoutes);

// API endpoint to get data
app.get('/api/data', (req, res) => {
  const { getIndividualDB, getBusinessDB, getPlaceOrderDB } = require('./config/database');
  res.json({
    individual: getIndividualDB(),
    business: getBusinessDB(),
    placeOrder: getPlaceOrderDB()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Database file:', DATABASE_FILE);
});

// Save database when server is shutting down
process.on('SIGINT', () => {
  saveDatabase();
  process.exit();
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  saveDatabase();
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  saveDatabase();
  process.exit(1);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Kuch gadbad ho gaya hai! Hum jald hi ise theek karenge.');
});

// Initial data save (if needed)
(async () => {
  try {
    const { getIndividualDB, getBusinessDB, getPlaceOrderDB } = require('./config/database');
    const data = {
      individual: getIndividualDB(),
      business: getBusinessDB(),
      placeOrder: getPlaceOrderDB()
    };
    await fs.writeFile(DATABASE_FILE, JSON.stringify(data, null, 2));
    console.log('Initial data successfully saved');
  } catch (error) {
    console.error('Error saving initial data:', error);
  }
})();