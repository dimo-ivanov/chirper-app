import dispatcher from '../dispatcher'

const chirpActions = {
  types: {
    GET_CHIRPS_FROM_SUBSCRIPTIONS: 'GET_CHIRPS_FROM_SUBSCRIPTIONS',
    GET_MY_CHIRPS: 'GET_MY_CHIRPS',
    CTREATE_CHIRP: 'CTREATE_CHIRP',
    DELETE_CHIRP: 'DELETE_CHIRP',
    GET_CHIRPS_BY_USERNAME: 'GET_CHIRPS_BY_USERNAME'
  },
  all (subscriptions) {
    dispatcher.dispatch({
      type: this.types.GET_CHIRPS_FROM_SUBSCRIPTIONS,
      subscriptions
    })
  },
  allByUsername (username) {
    dispatcher.dispatch({
      type: this.types.GET_CHIRPS_BY_USERNAME,
      username
    })
  },
  allMine () {
    dispatcher.dispatch({
      type: this.types.GET_MY_CHIRPS
    })
  },
  create (chirp) {
    dispatcher.dispatch({
      type: this.types.CTREATE_CHIRP,
      chirp
    })
  },
  delete (id) {
    dispatcher.dispatch({
      type: this.types.DELETE_CHIRP,
      id
    })
  }

}

export default chirpActions
