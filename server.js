require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { initializeDB } = require('./config/database');
const adminRoutes = require('./routes/admin');

const app = express();

initializeDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/admin', adminRoutes);

// API endpoint to get data
app.get('/api/data', (req, res) => {
  const { individualDB, businessDB, placeOrderDB } = require('./config/database');
  res.json({
    individual: individualDB().first(),
    business: businessDB().first(),
    placeOrder: placeOrderDB().first()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Database file:', process.env.DATABASE_FILE);
});

// Save database when server is shutting down
process.on('SIGINT', () => {
  saveDatabase();
  process.exit();
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
