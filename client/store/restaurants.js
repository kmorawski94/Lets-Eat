import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_RESTAURANTS = 'GET_RESTAURANTS'
const NEW_RESTAURANT = 'NEW_RESTAURANT'

/**
 * ACTION CREATORS
 */
const getRestaurants = restaurants => ({
  type: GET_RESTAURANTS,
  restaurants
})

const newRestaurant = restaurant => ({
  type: NEW_RESTAURANT,
  restaurant
})

// THUNK CREATORS
export const fetchRestaurants = () => {
  return async dispatch => {
    const restaurants = await axios.get('/api/restaurants')
    dispatch(getRestaurants(restaurants.data))
  }
}

export const getNewRestaurant = restaurant => {
  return async dispatch => {
    const restaurantData = await axios.post('/api/restaurants/new', restaurant)
    dispatch(newRestaurant(restaurantData.data))
  }
}

//INITIAL STATE
const initialState = []

//REDUCER
const restaurants = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESTAURANTS:
      console.log('STATE IN REDUCER', state)
      return action.restaurants
    case NEW_RESTAURANT:
      return [...state, action.restaurant]
    default:
      return state
  }
}

export default restaurants
