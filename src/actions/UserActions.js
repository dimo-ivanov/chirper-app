import dispatcher from '../dispatcher'

const userActions = {
  types: {
    REGISTER_USER: 'REGISTER_USER',
    LOGIN_USER: 'LOGIN_USER',
    GET_USER_INFO: 'GET_USER_INFO',
    GET_FOLLOWERS: 'GET_FOLLOWERS',
    GET_ALL_USERS: 'GET_ALL_USERS',
    UPDATE_SUBSCRIPTIONS: 'UPDATE_SUBSCRIPTIONS'
  },
  register (user) {
    dispatcher.dispatch({
      type: this.types.REGISTER_USER,
      user
    })
  },
  login (user) {
    dispatcher.dispatch({
      type: this.types.LOGIN_USER,
      user
    })
  },
  getUserInfo (username) {
    dispatcher.dispatch({
      type: this.types.GET_USER_INFO,
      username
    })
  },
  getFollowers (username) {
    dispatcher.dispatch({
      type: this.types.GET_FOLLOWERS,
      username
    })
  },
  detAllUsers () {
    dispatcher.dispatch({
      type: this.types.GET_ALL_USERS
    })
  },
  updateSubscriptions (body, id) {
    dispatcher.dispatch({
      type: this.types.UPDATE_SUBSCRIPTIONS,
      body,
      id
    })
  }
}

export default userActions
