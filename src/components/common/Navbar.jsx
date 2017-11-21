import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../users/Auth'
import userStore from '../../stores/UserStore'

class Navbar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: Auth.getUser()
    }

    this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this)

    userStore.on(
      userStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLoggedIn
    )
  }

  handleUserLoggedIn (data) {
    if (data._id) {
      data.success = true
      data.user = { name: data.username }
    }

    if (data.success) {
      this.setState({
        username: data.user.name
      })
    }
  }

  render () {
    return (
      <div className='menu'>
        <Link to='/'>Home</Link>
        {Auth.isUserAuthenticated() ? (
          <div className='menu'>
            <Link to='/discover'>Discover</Link>
            <Link to={`/users/${Auth.getUser()}`}>Me</Link>
            <Link to='/users/logout'>Logout</Link>
          </div>
        ) : (
          <div className='menu'>
            <Link to='/users/register'>Register</Link>
            <Link to='/users/login'>Login</Link>
          </div>
          )}
      </div>
    )
  }
}

export default Navbar
