import Data from './Data'
import kinvey from '../utilities/kinvey-config'

const baseUrl = `/user/${kinvey.id}`

class UserData {
  static register (user) {
    user = (user) = {
      username: user.email,
      password: user.password,
      subscriptions: []
    }
    return Data.post(`${baseUrl}`, user, true)
  }

  static login (user) {
    user = (user) = {
      username: user.email,
      password: user.password
    }
    return Data.post(`${baseUrl}/login`, user, true)
  }

  static getUserInfo (username) {
    return Data.get(`${baseUrl}/?query={"username":"${username}"}`, true)
  }

  static getFollowers (username) {
    return Data.get(`${baseUrl}/?query={"subscriptions":"${username}"}`, true)
  }

  static getAllUsers () {
    return Data.get(baseUrl, true)
  }

  static updateSubscriptions (body, id) {
    const subscriptions = {
      subscriptions: body
    }
    return Data.putKinvey(`${baseUrl}/${id}`, subscriptions, true)
  }
}

// const baseUrl = '/auth'

// class UserData {
//   static register (user) {
//     return Data.post(`${baseUrl}/signup`, user)
//   }

//   static login (user) {
//     return Data.post(`${baseUrl}/login`, user)
//   }
// }

export default UserData
