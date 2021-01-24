import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import SearchBar from './search-bar'

export class MapContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{lat: 47.444, lng: -122.176}}
        >
          {/* <Marker onClick={this.onMarkerClick}
          name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow> */}
        </Map>
      </div>
    )
  }
}

const mapStyles = {
  // position: 'relative',
  width: '90%',
  height: '50%'
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAHbGoYk5YHoLD_jeM5TF9jYjUjkuIsE1U'
})(MapContainer)
