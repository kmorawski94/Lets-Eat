import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_RESTAURANTS = 'GET_RESTAURANTS'
const NEW_RESTAURANT = 'NEW_RESTAURANT'
const DELETE_RESTAURANT = 'DELETE_RESTAURANT'

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

const deleteRestaurant = restaurantId => ({
  type: DELETE_RESTAURANT,
  restaurantId
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

export const deleteCurrentRestaurant = restaurantId => {
  return async dispatch => {
    await axios.delete(`/api/restaurants/delete/${restaurantId}`)
    dispatch(deleteRestaurant(restaurantId))
    const restaurants = await axios.get('/api/restaurants')
    dispatch(getRestaurants(restaurants.data))
  }
}

//INITIAL STATE
const initialState = []

//REDUCER
const restaurants = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESTAURANTS:
      return action.restaurants
    case NEW_RESTAURANT:
      return [...state, action.restaurant]
    case DELETE_RESTAURANT:
      state.map(restaurant => {
        if (restaurant.id !== action.restaurantId) {
          return restaurant
        }
      })
    default:
      return state
  }
}

export default restaurants
