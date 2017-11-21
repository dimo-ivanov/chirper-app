import React, { Component } from 'react'
import FormHelpers from '../../utilities/FormHelpers'
import RegisterForm from './RegisterForm'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import toastr from 'toastr'

class RegisterPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        name: 'Test',
        email: 'test@test.com',
        password: '123456',
        confirmPassword: '123456'
      },
      error: ''
    }

    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleUserForm = this.handleUserForm.bind(this)
    this.handleUserRegistration = this.handleUserRegistration.bind(this)
    this.displayErrorToastr = this.displayErrorToastr.bind(this)

    userStore.on(
      userStore.eventTypes.USER_REGISTERED,
      this.handleUserRegistration
    )
  }

  componentWillUnmount () {
    userStore.removeListener(
      userStore.eventTypes.USER_REGISTERED,
      this.handleUserRegistration
    )
  }

  handleUserForm (event) {
    event.preventDefault()
    if (!this.validateUser()) {
      return
    }
    userActions.register(this.state.user)
  }

  handleUserRegistration (data) {
    if (data.error) {
      let firstError = data.description
      if (data.errors) {
        firstError = Object.keys(data.errors).map(k => data.errors[k])[0]
      }

      this.setState({
        error: firstError
      })
    } else {
      toastr.success(`Username ${data.username} has been registered successfully.`)
      this.props.history.push('/users/login')
    }
  }

  validateUser () {
    const user = this.state.user
    let formIsValid = true
    let error = ''

    if (user.password !== user.confirmPassword) {
      error = 'Password and confirmation password do not match. '
      formIsValid = false
    }

    if (user.email === '' || user.confirmPassword === '') {
      error = 'Please provide an e-mail and password. '
      formIsValid = false
    }

    if (error) {
      this.setState({ error })
    }

    return formIsValid
  }

  handleUserChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'user')
  }

  displayErrorToastr (error) {
    toastr.error(error)
    this.setState({ error: '' })
  }

  render () {
    return (
      <RegisterForm
        user={this.state.user}
        error={this.state.error}
        displayError={this.displayErrorToastr}
        onChange={this.handleUserChange}
        onSave={this.handleUserForm} />
    )
  }
}

export default RegisterPage
