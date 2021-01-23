import React, {Component} from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from 'react-places-autocomplete'
import MapContainer from './map'

export default function SearchBar(props) {
  const [address, setAddress] = React.useState('')
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  })

  const handleSelect = async value => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    setAddress(value)
    setCoordinates(latLng)
  }

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
          <div>
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p>
            <input
              {...getInputProps({placeholder: 'Type in restaurant name'})}
            />
            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion, index) => {
                const style = {
                  backgroundColor: suggestion.active ? '#41b6e6' : '#fff'
                }
                // console.log("SUGGESTIONS", suggestion)
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, {style})}
                  >
                    {suggestion.description}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <MapContainer />
    </div>
  )
}
