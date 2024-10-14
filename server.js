const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeDB, loadDatabase, saveDatabase } = require('./config/database');
const adminRoutes = require('./routes/admin');

const app = express();

console.log('Initializing database...');
initializeDB();
loadDatabase();
console.log('Database initialized.');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

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
app.listen(PORT, () => console.log(`Admin server running on port ${PORT}`));

// Save database when server is shutting down
process.on('SIGINT', () => {
  saveDatabase();
  process.exit();
});
