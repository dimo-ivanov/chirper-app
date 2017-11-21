import dispatcher from '../dispatcher'

const ajaxActions = {
  types: {
    AJAX_BEGIN: 'AJAX_BEGIN',
    AJAX_FINISH: 'AJAX_FINISH'
  },
  beginAjax () {
    dispatcher.dispatch({
      type: this.types.AJAX_BEGIN
    })
  },
  finishAjax () {
    dispatcher.dispatch({
      type: this.types.AJAX_FINISH
    })
  }

}

export default ajaxActions
