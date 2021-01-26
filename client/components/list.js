import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ListGroup, Container} from 'react-bootstrap'
import {fetchRestaurants} from '../store/restaurants'

export class List extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.fetchRestaurants()
  }

  render() {
    const restaurants = this.props.restaurants
    console.log('REST', this.props.restaurants)
    return (
      <div className="List">
        <Container>
          <h3>Restaurants:</h3>
          <ListGroup>
            {this.props.restaurants.map(restaurant => {
              return (
                <ListGroup.Item key={restaurant.id} variant="secondary">
                  <p> Name: {restaurant.name}</p>
                  <p> Category: {restaurant.category}</p>
                  <p>Rating: {restaurant.rating}</p>
                  <p> Notes: {restaurant.notes}</p>
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
    fetchRestaurants: () => dispatch(fetchRestaurants())
  }
}
export default connect(mapState, mapDispatch)(List)
