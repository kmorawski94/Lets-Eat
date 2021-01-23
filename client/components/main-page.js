import React, {Component} from 'react'
import {connect} from 'react-redux'
import MapContainer from './map'
import SearchBar from './search-bar'

/**
 * COMPONENT
 */
class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {/* <MapContainer /> */}
        <SearchBar />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({})

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Main)
