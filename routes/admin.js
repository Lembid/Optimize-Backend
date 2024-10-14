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
  const pageData = getIndividualDB();
  res.render('individual-form', { pageData });
});

router.post('/individual', (req, res) => {
  const pageData = req.body;
  updateIndividualDB(pageData);
  saveDatabase();
  res.json({ success: true });
});

router.get('/business', (req, res) => {
  const pageData = getBusinessDB();
  res.render('business-form', { pageData });
});

router.post('/business', (req, res) => {
  const pageData = req.body;
  updateBusinessDB(pageData);
  saveDatabase();
  res.json({ success: true });
});

router.get('/place-order', (req, res) => {
  const pageData = getPlaceOrderDB();
  res.render('place-order-form', { pageData });
});

router.post('/place-order', (req, res) => {
  const pageData = req.body;
  updatePlaceOrderDB(pageData);
  saveDatabase();
  res.json({ success: true });
});

module.exports = router;
