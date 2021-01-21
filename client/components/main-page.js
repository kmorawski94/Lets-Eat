import React, {Component} from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>Home page!</div>
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
