const taffy = require('taffydb').taffy;
const fs = require('fs');
const path = require('path');

let individualDB = taffy();
let businessDB = taffy();
let placeOrderDB = taffy();

const initializeDB = () => {
  if (individualDB().get().length === 0) {
    individualDB.insert({
      id: 1,
      mainTitlePart1: 'Tax Planning',
      mainTitlePart2: 'ke liye Swagat Hai',
      subHeading: 'Apne taxes ko efficiently plan karein',
      cards: [
        {
          title: 'Card 1 ka Title',
          description: 'Card 1 ka Description'
        },
        {
          title: 'Card 2 ka Title',
          description: 'Card 2 ka Description'
        },
        {
          title: 'Card 3 ka Title',
          description: 'Card 3 ka Description'
        }
      ],
      leftSection: {
        heading: 'Left Section ka Heading',
        checkboxPoints: [
          {
            icon: 'icon1.png',
            title: 'Checkbox Point 1',
            price: 1000,
            showInPage: true
          },
          {
            icon: 'icon2.png',
            title: 'Checkbox Point 2',
            price: 2000,
            showInPage: false
          }
        ]
      },
      rightSection: {
        title: 'Right Section ka Title',
        basePrice: 5000,
        allPlansInclude: [
          'Feature 1',
          'Feature 2',
          'Feature 3'
        ]
      }
    });
  }

  if (businessDB().get().length === 0) {
    businessDB.insert({
      id: 1,
      mainTitlePart1: 'Business Tax Planning',
      mainTitlePart2: 'ke liye Swagat Hai',
      subHeading: 'Apne business taxes ko efficiently plan karein',
      cards: [
        {
          title: 'Business Card 1 ka Title',
          description: 'Business Card 1 ka Description'
        },
        {
          title: 'Business Card 2 ka Title',
          description: 'Business Card 2 ka Description'
        },
        {
          title: 'Business Card 3 ka Title',
          description: 'Business Card 3 ka Description'
        }
      ],
      leftSection: {
        heading: 'Business Left Section ka Heading',
        checkboxPoints: [
          {
            icon: 'business_icon1.png',
            title: 'Business Checkbox Point 1',
            price: 5000,
            showInPage: true
          },
          {
            icon: 'business_icon2.png',
            title: 'Business Checkbox Point 2',
            price: 10000,
            showInPage: false
          }
        ]
      },
      rightSection: {
        title: 'Business Right Section ka Title',
        basePrice: 20000,
        allPlansInclude: [
          'Business Feature 1',
          'Business Feature 2',
          'Business Feature 3'
        ]
      }
    });
  }

  if (placeOrderDB().get().length === 0) {
    placeOrderDB.insert({
      id: 1,
      mainTitlePart1: 'Place Your Order',
      mainTitlePart2: 'for Tax Planning',
      subHeading: 'Choose your tax planning package',
      cards: [], // Make sure this is initialized as an empty array
      leftSection: {
        heading: 'Order Left Section Heading',
        checkboxPoints: []
      },
      rightSection: {
        title: 'Order Right Section Title',
        basePrice: 10000,
        allPlansInclude: []
      }
    });
  }
};

const saveDatabase = () => {
  const data = {
    individual: individualDB().get(),
    business: businessDB().get(),
    placeOrder: placeOrderDB().get()
  };
  fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data, null, 2));
};

const loadDatabase = () => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'database.json'), 'utf8'));
    individualDB.insert(data.individual);
    businessDB.insert(data.business);
    placeOrderDB.insert(data.placeOrder);
  } catch (error) {
    console.log('No existing database found, initializing with default data');
    initializeDB();
  }
};

module.exports = {
  individualDB,
  businessDB,
  placeOrderDB,
  initializeDB,
  saveDatabase,
  loadDatabase
};
