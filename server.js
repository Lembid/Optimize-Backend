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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Save database when server is shutting down
process.on('SIGINT', () => {
  saveDatabase();
  process.exit();
});
