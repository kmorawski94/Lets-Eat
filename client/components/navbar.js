import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Nav, Navbar} from 'react-bootstrap'

const NavbarMain = ({handleClick, isLoggedIn}) => (
  <Navbar bg="dark">
    <Navbar.Brand href="/">Lets Eat!</Navbar.Brand>

    <Nav.Link href="/main">Home</Nav.Link>
  </Navbar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavbarMain)

/**
 * PROP TYPES
 */
NavbarMain.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
