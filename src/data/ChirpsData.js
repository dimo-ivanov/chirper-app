import Data from './Data'
import Auth from '../components/users/Auth'
import kinvey from '../utilities/kinvey-config'

const baseUrl = `/appdata/${kinvey.id}/chirps`

class ChirpsData {
  static all (subscriptions) {
    const subsFormated = `?query={"author":{"$in": ["${subscriptions.split(',').join('","')}"]`
    return Data.get(`${baseUrl}${subsFormated}}}&sort={"_kmd.ect": 1}`, true)
  }

  static allByUsername (username) {
    const url = `?query={"author":"${username}"}`
    return Data.get(`${baseUrl}${url}`, true)
  }

  static allMine () {
    const url = `?query={"author":"${Auth.getUser()}"}&sort={"_kmd.ect": 1}`
    return Data.get(`${baseUrl}${url}`, true)
  }

  static create (chirp) {
    return Data.postKinvey(`${baseUrl}`, chirp, true)
  }

  static delete (id) {
    return Data.delete(`${baseUrl}/${id}`, true)
  }
}

export default ChirpsData
