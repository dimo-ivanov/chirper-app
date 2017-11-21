import { Component } from 'react'
import Auth from '../users/Auth'

class LogoutPage extends Component {
  componentWillMount () {
    Auth.deauthenticateUser()
    Auth.removeUserId()
    Auth.removeUser()
    Auth.removeSubsctiptions()
    this.props.history.push('/')
  }

  render () {
    return null
  }
}

export default LogoutPage
