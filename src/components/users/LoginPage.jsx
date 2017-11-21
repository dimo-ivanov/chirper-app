import React, { Component } from 'react'
import Auth from './Auth'
import FormHelpers from '../../utilities/FormHelpers'
import LoginForm from './LoginForm'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import toastr from 'toastr'

class LoginPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        email: 'testuser',
        password: 'testuserpass890'
      },
      error: ''
    }

    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleUserForm = this.handleUserForm.bind(this)
    this.handleUserLogin = this.handleUserLogin.bind(this)
    this.displayErrorToastr = this.displayErrorToastr.bind(this)

    userStore.on(
      userStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLogin
    )
  }

  componentWillUnmount () {
    userStore.removeListener(
      userStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLogin
    )
  }

  handleUserChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'user')
  }

  handleUserForm (event) {
    event.preventDefault()
    if (!this.validateUser()) {
      return
    }
    userActions.login(this.state.user)
  }

  handleUserLogin (data) {
    if (!data.success) {
      this.setState({
        error: data.description
      })
    } else {
      Auth.authenticateUser(data._kmd.authtoken)
      Auth.saveUser(data.username)
      Auth.saveUserId(data._id)
      Auth.saveSubscriptions(data.subscriptions)
      toastr.success(`You've been logged in successfully with ${data.username}.`)
      this.props.history.push('/')
    }
  }

  validateUser () {
    const user = this.state.user
    let formIsValid = true
    let error = ''

    if (user.password.length < 4) {
      error = 'Invalid credentials. '
      formIsValid = false
    }

    if (error) {
      this.setState({ error })
    }

    return formIsValid
  }

  displayErrorToastr (error) {
    toastr.error(error)
    this.setState({ error: '' })
  }

  render () {
    return (
      <LoginForm
        user={this.state.user}
        error={this.state.error}
        displayError={this.displayErrorToastr}
        onChange={this.handleUserChange}
        onSave={this.handleUserForm} />
    )
  }
}

export default LoginPage
