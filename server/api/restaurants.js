const router = require('express').Router()
const {Restaurants} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const restaurant = await Restaurants.findAll()
    res.json(restaurant)
  } catch (err) {
    next(err)
  }
})

router.post('/new', async (req, res, next) => {
  try {
    const newRestaurant = await Restaurants.create(req.body)
    res.json(newRestaurant)
  } catch (err) {
    next(err)
  }
})
