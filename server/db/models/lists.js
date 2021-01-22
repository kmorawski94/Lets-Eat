const Sequelize = require('sequelize')
const db = require('../db')

const Lists = db.define('lists', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'Restaurants'
  }
})

module.exports = Lists
