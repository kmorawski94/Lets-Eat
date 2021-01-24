import React, {Component} from 'react'
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript
} from '@react-google-maps/api'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox'
import SearchBar from './search-bar'

const libraries = ['places']

export default function MapContainer(props) {
  const [markers, setMarkers] = React.useState([])
  const [selected, setSelected] = React.useState(null)
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: 'AIzaSyAHbGoYk5YHoLD_jeM5TF9jYjUjkuIsE1U',
    libraries
  })

  const onMapClick = React.useCallback(e => {
    setMarkers(current => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date()
      }
    ])
  }, [])

  const mapRef = React.useRef()
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map
  }, [])

  const panTo = React.useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng})
    mapRef.current.setZoom(14)
  }, [])

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading Maps'

  return (
    <div>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{lat: marker.lat, lng: marker.lng}}
            onClick={() => {
              setSelected(marker)
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{lat: selected.lat, lng: selected.lng}}
            onCloseClick={() => {
              setSelected(null)
            }}
          >
            <div>
              <h2>Alert</h2>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  )
}

function Locate({panTo}) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(position => {
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        }, () => null)
      }}
    >
      <img
        width={250}
        height={50}
        src="https://www.inventicons.com/uploads/iconset/1522/wm/512/Search-location-34.png"
      />
    </button>
  )
}

function Search({panTo}) {
  const {
    ready,
    value,
    suggestions: {status, data},
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {lat: () => 43.6532, lng: () => -79.3832},
      radius: 100 * 1000
    }
  })

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = e => {
    setValue(e.target.value)
  }

  const handleSelect = async address => {
    setValue(address, false)
    clearSuggestions()

    try {
      const results = await getGeocode({address})
      const {lat, lng} = await getLatLng(results[0])
      panTo({lat, lng})
    } catch (error) {
      console.log('😱 Error: ', error)
    }
  }

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({id, description}) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

const mapStyles = {
  width: '100vw',
  height: '60vh'
}
const center = {
  lat: 41.8781,
  lng: -87.6298
}

const options = {
  disableDefaultUI: true,
  zoomControl: true
}
