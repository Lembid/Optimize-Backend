const express = require('express');
const router = express.Router();
const { individualDB, businessDB, placeOrderDB, saveDatabase } = require('../config/database');

router.get('/', (req, res) => {
  res.render('admin-home');
});

router.get('/individual', (req, res) => {
  const pageData = individualDB().first();
  res.render('individual-form', { pageData });
});

router.post('/individual', (req, res) => {
  const pageData = req.body;
  
  // Ensure arrays are always arrays even if single item
  pageData.cards = Array.isArray(pageData.cards) ? pageData.cards : [pageData.cards].filter(Boolean);
  pageData.leftSection.checkboxPoints = Array.isArray(pageData.leftSection.checkboxPoints) ? pageData.leftSection.checkboxPoints : [pageData.leftSection.checkboxPoints].filter(Boolean);
  pageData.rightSection.allPlansInclude = Array.isArray(pageData.rightSection.allPlansInclude) ? pageData.rightSection.allPlansInclude : [pageData.rightSection.allPlansInclude].filter(Boolean);

  // Convert showInPage to boolean
  pageData.leftSection.checkboxPoints.forEach(point => {
    point.showInPage = point.showInPage === 'on';
  });

  console.log('Updating database with:', JSON.stringify(pageData, null, 2));

  individualDB({ id: 1 }).update(pageData);
  saveDatabase();

  console.log('Database after update:', JSON.stringify(individualDB().get(), null, 2));

  res.redirect('/admin/individual');
});

router.get('/business', (req, res) => {
  const pageData = businessDB().first();
  res.render('business-form', { pageData });
});

router.post('/business', (req, res) => {
  const pageData = req.body;
  // Process the data (similar to individual route)
  businessDB({ id: 1 }).update(pageData);
  saveDatabase();
  res.json({ success: true });
});

router.get('/place-order', (req, res) => {
  const pageData = placeOrderDB().first();
  console.log('Place Order Page Data:', pageData); // Add this line for debugging
  res.render('place-order-form', { pageData: pageData || {} });
});

router.post('/place-order', (req, res) => {
  const pageData = req.body;
  // Process the data (similar to individual route)
  placeOrderDB({ id: 1 }).update(pageData);
  saveDatabase();
  res.json({ success: true });
});

module.exports = router;
