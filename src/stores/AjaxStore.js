import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import ajaxActions from '../actions/AjaxActions'
// import ChirpsData from '../data/ChirpsData'

class AjaxStore extends EventEmitter {
  constructor () {
    super()

    this.state = 0
  }

  changeAjaxState (digit) {
    this.state = this.state + Number(digit)
    this.emit(this.eventTypes.AJAX_STATE_UPDATED, this.state)
  }

  getState () { return this.state }

  handleAction (action) {
    switch (action.type) {
      case ajaxActions.types.AJAX_BEGIN: {
        this.changeAjaxState(1)
        break
      }
      case ajaxActions.types.AJAX_FINISH: {
        this.changeAjaxState(-1)
        break
      }
      default: break
    }
  }
}

let ajaxStore = new AjaxStore()

ajaxStore.eventTypes = {
  AJAX_STATE_UPDATED: 'ajax_state_updated'
}

dispatcher.register(ajaxStore.handleAction.bind(ajaxStore))

export default ajaxStore
