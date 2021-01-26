import React, {Component} from 'react'
import MapContainer from './map'
import List from './list'

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
        <MapContainer />
        <List />
      </div>
    )
  }
}

export default Main
