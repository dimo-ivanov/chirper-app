class Auth {
  static saveUser (user) {
    window.localStorage.setItem('user', JSON.stringify(user))
  }

  static getUser () {
    const userJson = window.localStorage.getItem('user')
    if (userJson) {
      return JSON.parse(userJson)
    }

    return {}
  }

  static removeUser () {
    window.localStorage.removeItem('user')
  }

  static saveUserId (id) {
    window.localStorage.setItem('id', id)
  }

  static getUserId () {
    return window.localStorage.getItem('id')
  }

  static removeUserId () {
    window.localStorage.removeItem('id')
  }

  static authenticateUser (token) {
    window.localStorage.setItem('token', token)
  }

  static isUserAuthenticated () {
    return window.localStorage.getItem('token') !== null
  }

  static deauthenticateUser () {
    window.localStorage.removeItem('token')
  }

  static getToken () {
    return window.localStorage.getItem('token')
  }

  static saveSubscriptions (subscriptions) {
    window.localStorage.setItem('subscriptions', subscriptions)
  }

  static getSubscriptions () {
    return window.localStorage.getItem('subscriptions') || ''
  }

  static removeSubsctiptions () {
    window.localStorage.removeItem('subscriptions')
  }
}

export default Auth
