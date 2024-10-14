const taffy = require('taffydb').taffy;
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

let individualDB, businessDB, placeOrderDB;
let inMemoryDB = {};

const DATABASE_FILE = process.env.DATABASE_FILE || path.join(__dirname, 'database.json');

const initializeDB = async () => {
  await loadDatabase();
  individualDB = taffy(inMemoryDB.individual);
  businessDB = taffy(inMemoryDB.business);
  placeOrderDB = taffy(inMemoryDB.placeOrder);
};

async function loadDatabase() {
  try {
    const data = await fs.readFile(DATABASE_FILE, 'utf8');
    inMemoryDB = JSON.parse(data);
  } catch (error) {
    console.log('No existing database found, initializing with default data');
    inMemoryDB = { individual: [], business: [], placeOrder: [] };
  }
}

function saveDatabase() {
  fs.writeFileSync(DATABASE_FILE, JSON.stringify(inMemoryDB, null, 2));
}

// Use setInterval to periodically save the database
setInterval(saveDatabase, 5 * 60 * 1000); // Save every 5 minutes

module.exports = {
  initializeDB,
  saveDatabase,
  getIndividualDB: () => individualDB().first(),
  getBusinessDB: () => businessDB().first(),
  getPlaceOrderDB: () => placeOrderDB().first(),
  updateIndividualDB: (data) => individualDB({ id: 1 }).update(data),
  updateBusinessDB: (data) => businessDB({ id: 1 }).update(data),
  updatePlaceOrderDB: (data) => placeOrderDB({ id: 1 }).update(data)
};
