const Sequelize = require('sequelize')
const db = require('../db')

const Restaurants = db.define('restaurants', {
  category: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 25]
    }
  },
  lat: {
    type: Sequelize.DECIMAL
  },
  lng: {
    type: Sequelize.DECIMAL
  },
  name: {
    type: Sequelize.STRING
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  notes: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = Restaurants
