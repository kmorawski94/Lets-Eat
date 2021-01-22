const User = require('./user')
const Lists = require('./lists')
const Restaurants = require('./resturants')

User.hasOne(Lists)
Lists.belongsTo(User)

Lists.belongsToMany(Restaurants, {through: 'lists_restaurants'})
Restaurants.belongsToMany(Lists, {through: 'lists_restaurants'})

module.exports = {
  User,
  Lists,
  Restaurants
}
