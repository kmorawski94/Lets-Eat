const Sequelize = require('sequelize')
const db = require('../db')

const Restaurants = db.define('restaurants', {
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 25]
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
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
