import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ListGroup, Container, Button} from 'react-bootstrap'
import {fetchRestaurants, deleteCurrentRestaurant} from '../store/restaurants'

export class List extends Component {
  constructor() {
    super()
    this.deleteRestaurant = this.deleteRestaurant.bind(this)
  }

  componentDidMount() {
    this.props.fetchRestaurants()
  }

  deleteRestaurant(id) {
    this.props.deleteRestaurant(id)
    this.props.fetchRestaurants()
  }

  render() {
    const restaurants = this.props.restaurants
    return (
      <div className="List">
        <Container>
          <h3>Restaurants:</h3>
          <ListGroup>
            {restaurants.map(restaurant => {
              return (
                <ListGroup.Item key={restaurant.id} variant="secondary">
                  <p> Name: {restaurant.name}</p>
                  <p> Category: {restaurant.category}</p>
                  <p> Rating: {restaurant.rating}</p>
                  <p> Notes: {restaurant.notes}</p>
                  <Button
                    className="delete-button"
                    variant="info"
                    onClick={() => this.deleteRestaurant(restaurant.id)}
                  >
                    Delete
                  </Button>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </Container>
      </div>
    )
  }
}

const mapState = state => ({
  restaurants: state.restaurants
})

const mapDispatch = dispatch => {
  return {
    fetchRestaurants: () => dispatch(fetchRestaurants()),
    deleteRestaurant: id => dispatch(deleteCurrentRestaurant(id))
  }
}
export default connect(mapState, mapDispatch)(List)
