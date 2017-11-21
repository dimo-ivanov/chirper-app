import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import userActions from '../actions/UserActions'
import UserData from '../data/UserData'

class UserStore extends EventEmitter {
  register (user) {
    UserData
      .register(user)
      .then(data => this.emit(this.eventTypes.USER_REGISTERED, data))
  }

  login (user) {
    UserData
      .login(user)
      .then(data => this.emit(this.eventTypes.USER_LOGGED_IN, data))
  }

  getUserInfo (username) {
    UserData
      .getUserInfo(username)
      .then(data => this.emit(this.eventTypes.GOT_USER_INFO, data))
  }

  getFollowers (username) {
    UserData
      .getFollowers(username)
      .then(data => this.emit(this.eventTypes.GOT_USER_FOLLOWERS, data))
  }

  getAllUsers () {
    UserData
      .getAllUsers()
      .then(data => this.emit(this.eventTypes.GOT_ALL_USERS, data))
  }

  updateSubscriptions (body, id) {
    UserData
      .updateSubscriptions(body, id)
      .then(data => this.emit(this.eventTypes.SUBSCRIPTIONS_UPDATED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case userActions.types.REGISTER_USER: {
        this.register(action.user)
        break
      }
      case userActions.types.LOGIN_USER: {
        this.login(action.user)
        break
      }
      case userActions.types.GET_USER_INFO: {
        this.getUserInfo(action.username)
        break
      }
      case userActions.types.GET_FOLLOWERS: {
        this.getFollowers(action.username)
        break
      }
      case userActions.types.GET_ALL_USERS: {
        this.getAllUsers()
        break
      }
      case userActions.types.UPDATE_SUBSCRIPTIONS: {
        this.updateSubscriptions(action.body, action.id)
        break
      }
      default: break
    }
  }
}

let userStore = new UserStore()

userStore.eventTypes = {
  USER_REGISTERED: 'user_registered',
  USER_LOGGED_IN: 'user_logged_in',
  GOT_USER_INFO: 'got_user_info',
  GOT_USER_FOLLOWERS: 'got_user_followers',
  GOT_ALL_USERS: 'got_all_users',
  SUBSCRIPTIONS_UPDATED: 'subscriptions_updated'
}

dispatcher.register(userStore.handleAction.bind(userStore))

export default userStore
