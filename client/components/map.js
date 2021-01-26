import React, {Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import SearchBar from './search-bar'
import {fetchRestaurants} from '../store/restaurants'
import {Container} from 'react-bootstrap'

export class MapContainer extends Component {
  constructor() {
    super()
    this.state = {
      selectedPlace: {},
      activeMarker: {},
      showingInfoWindow: false
    }
    this.setCurrentMarker = this.setCurrentMarker.bind(this)
  }

  componentDidMount() {
    this.props.fetchRestaurants()
  }

  // getUserLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(this.showUserPosition)
  //   }
  // }

  // showUserPosition = position => {
  //   this.setState = {
  //     lat: position.coords.latitude,
  //     lng: position.coords.longitude
  //   }
  // }

  setCurrentMarker = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  render() {
    const restaurants = this.props.restaurants
    const selectedRestaurantName = this.state.selectedPlace.name
    return (
      <div>
        <Container>
          <SearchBar />
        </Container>
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          mapTypeControl={false}
          streetViewControl={false}
          initialCenter={{lat: 41.8781, lng: -87.6298}}
        >
          {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              id={index}
              name={restaurant.name}
              position={{lat: restaurant.lat, lng: restaurant.lng}}
              onClick={this.setCurrentMarker}
            />
          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h6>{selectedRestaurantName}</h6>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

const mapStyles = {
  width: '100%',
  height: '50%'
}

const mapState = state => ({
  restaurants: state.restaurants
})

const mapDispatch = dispatch => {
  return {
    fetchRestaurants: () => dispatch(fetchRestaurants())
  }
}

const enhance = compose(
  connect(mapState, mapDispatch),
  GoogleApiWrapper({
    apiKey: 'AIzaSyAHbGoYk5YHoLD_jeM5TF9jYjUjkuIsE1U'
  })
)

export default enhance(MapContainer)
