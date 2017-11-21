import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import chirpActions from '../actions/ChirpActions'
import ChirpsData from '../data/ChirpsData'

class ChirpStore extends EventEmitter {
  all (subscriptions) {
    ChirpsData
      .all(subscriptions)
      .then(data => this.emit(this.eventTypes.CHIRPS_FETCHED, data))
  }

  allByUsername (username) {
    ChirpsData
      .allByUsername(username)
      .then(data => this.emit(this.eventTypes.ALL_BY_USERNAME_CHIRPS_FETCHED, data))
  }

  allMine () {
    ChirpsData
      .allMine()
      .then(data => this.emit(this.eventTypes.MY_CHIRPS_FETCHED, data))
  }

  create (chirp) {
    ChirpsData
      .create(chirp)
      .then(data => this.emit(this.eventTypes.CHIRP_CREATED, data))
  }

  delete (id) {
    ChirpsData
      .delete(id)
      .then(data => this.emit(this.eventTypes.CHIRP_DELETED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case chirpActions.types.GET_CHIRPS_FROM_SUBSCRIPTIONS: {
        this.all(action.subscriptions)
        break
      }
      case chirpActions.types.GET_CHIRPS_BY_USERNAME: {
        this.allByUsername(action.username)
        break
      }
      case chirpActions.types.GET_MY_CHIRPS: {
        this.allMine()
        break
      }
      case chirpActions.types.CTREATE_CHIRP: {
        this.create(action.chirp)
        break
      }
      case chirpActions.types.DELETE_CHIRP: {
        this.delete(action.id)
        break
      }
      default: break
    }
  }
}

let chirpStore = new ChirpStore()

chirpStore.eventTypes = {
  CHIRPS_FETCHED: 'chirps_fetched',
  MY_CHIRPS_FETCHED: 'my_chirps_fetched',
  CHIRP_CREATED: 'chirp_created',
  CHIRP_DELETED: 'chirp_deleted',
  ALL_BY_USERNAME_CHIRPS_FETCHED: 'all_by_username_chirps_fetched'
}

dispatcher.register(chirpStore.handleAction.bind(chirpStore))

export default chirpStore
