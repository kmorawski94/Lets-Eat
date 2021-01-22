'use strict'

const db = require('../server/db')
const {User, Restaurants, Lists} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'kathy@email.com', password: '123', name: 'Kathy'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const restaurants = await Promise.all([
    Restaurants.create({
      category: 'Sushi',
      address: '123 N Milwakee',
      name: 'Ruk Sushi',
      notes: 'Try their pad thai!',
      rating: 5
    }),
    Restaurants.create({
      category: 'Mexician',
      address: '123 N Belmont',
      name: 'Taco Burritto King',
      notes: 'Try their veggie nachos!'
    })
  ])

  const lists = await Promise.all([
    Lists.create({
      name: 'Kathys List'
    })
  ])

  await lists[0].setUser(users[0])
  await lists[0].addRestaurants(restaurants[0])
  await lists[0].addRestaurants(restaurants[1])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${restaurants.length} resturants`)
  console.log(`seeded ${lists.length} lists`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
