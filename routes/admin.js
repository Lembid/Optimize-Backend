const express = require('express');
const router = express.Router();
const { 
  getIndividualDB, 
  getBusinessDB, 
  getPlaceOrderDB, 
  updateIndividualDB,
  updateBusinessDB,
  updatePlaceOrderDB,
  saveDatabase 
} = require('../config/database');

router.get('/', (req, res) => {
  res.render('admin-home');
});

router.get('/individual', (req, res) => {
  try {
    const pageData = getIndividualDB();
    if (!pageData) {
      throw new Error('Individual page data not found');
    }
    res.render('individual-form', { pageData });
  } catch (error) {
    console.error('Error rendering individual form:', error);
    res.status(500).send('Kuch gadbad ho gaya hai! Hum jald hi ise theek karenge.');
  }
});

router.post('/individual', (req, res) => {
  const pageData = req.body;
  updateIndividualDB(pageData);
  saveDatabase();
  res.json({ success: true });
});

router.get('/business', (req, res) => {
  try {
    const pageData = getBusinessDB();
    if (!pageData) {
      throw new Error('Business page data not found');
    }
    res.render('business-form', { pageData });
  } catch (error) {
    console.error('Error rendering business form:', error);
    res.status(500).send('Kuch gadbad ho gaya hai! Hum jald hi ise theek karenge.');
  }
});

router.post('/business', (req, res) => {
  const pageData = req.body;
  updateBusinessDB(pageData);
  saveDatabase();
  res.json({ success: true });
});

router.get('/place-order', (req, res) => {
  try {
    const pageData = getPlaceOrderDB();
    if (!pageData) {
      throw new Error('Place order page data not found');
    }
    res.render('place-order-form', { pageData });
  } catch (error) {
    console.error('Error rendering place order form:', error);
    res.status(500).send('Kuch gadbad ho gaya hai! Hum jald hi ise theek karenge.');
  }
});

router.post('/place-order', (req, res) => {
  const pageData = req.body;
  updatePlaceOrderDB(pageData);
  saveDatabase();
  res.json({ success: true });
});

module.exports = router;
