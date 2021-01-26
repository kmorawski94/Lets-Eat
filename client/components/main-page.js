import React, {Component} from 'react'
import {connect} from 'react-redux'
import MapContainer from './map'
import List from './list'
import {Container, Card} from 'react-bootstrap'

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
        {/* <Card> */}
        <MapContainer />
        {/* </Card> */}
        {/* <Card> */}
        <List />
        {/* </Card> */}
      </div>
    )
  }
}

export default Main
