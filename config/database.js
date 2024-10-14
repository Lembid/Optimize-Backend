const taffy = require('taffydb').taffy;
const fs = require('fs');
const path = require('path');

let individualDB, businessDB, placeOrderDB;

const DATABASE_FILE = path.join(__dirname, 'database.json');

const initializeDB = () => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(DATABASE_FILE, 'utf8'));
  } catch (error) {
    console.log('No existing database found, initializing with default data');
    data = {
      individual: [{
        id: 1,
        mainTitlePart1: 'Tax Planning',
        mainTitlePart2: 'ke liye Swagat Hai',
        subHeading: 'Apne taxes ko efficiently plan karein',
        cards: [],
        leftSection: {
          heading: 'Left Section ka Heading',
          checkboxPoints: []
        },
        rightSection: {
          title: 'Right Section ka Title',
          basePrice: 5000,
          allPlansInclude: []
        }
      }],
      business: [{
        id: 1,
        mainTitlePart1: 'Business Tax Planning',
        mainTitlePart2: 'ke liye Swagat Hai',
        subHeading: 'Apne business taxes ko efficiently plan karein',
        cards: [],
        leftSection: {
          heading: 'Business Left Section ka Heading',
          checkboxPoints: []
        },
        rightSection: {
          title: 'Business Right Section ka Title',
          basePrice: 20000,
          allPlansInclude: []
        }
      }],
      placeOrder: [{
        id: 1,
        mainTitlePart1: 'Place Your Order',
        mainTitlePart2: 'for Tax Planning',
        subHeading: 'Choose your tax planning package',
        cards: [],
        leftSection: {
          heading: 'Order Left Section Heading',
          checkboxPoints: []
        },
        rightSection: {
          title: 'Order Right Section Title',
          basePrice: 10000,
          allPlansInclude: []
        }
      }]
    };
  }

  individualDB = taffy(data.individual);
  businessDB = taffy(data.business);
  placeOrderDB = taffy(data.placeOrder);
};

const saveDatabase = () => {
  const data = {
    individual: individualDB().get(),
    business: businessDB().get(),
    placeOrder: placeOrderDB().get()
  };
  fs.writeFileSync(DATABASE_FILE, JSON.stringify(data, null, 2));
};

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
