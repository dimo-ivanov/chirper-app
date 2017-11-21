import React, { Component } from 'react'
import Chirp from './Chirp'
import UserProfile from '../users/UserProfile'
import chirpActions from '../../actions/ChirpActions'
import chirpStore from '../../stores/ChirpStore'
import FormHelpers from '../../utilities/FormHelpers'
import Auth from '../users/Auth'
import toastr from 'toastr'

class ListChirpsPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      chirps: [],
      loading: true,
      chirp: {
        text: 'MyTestChirp',
        author: Auth.getUser()
      },
      chirpToDelete: '',
      error: ''
    }

    this.handleChirpsFetched = this.handleChirpsFetched.bind(this)
    this.handleChirpChange = this.handleChirpChange.bind(this)
    this.handleChirpForm = this.handleChirpForm.bind(this)
    this.handleChirpCreation = this.handleChirpCreation.bind(this)
    this.handleChirpDeletion = this.handleChirpDeletion.bind(this)
    this.handleChirpDeleteClicked = this.handleChirpDeleteClicked.bind(this)
    this.displayErrorToastr = this.displayErrorToastr.bind(this)
    this.displayLoadingToastr = this.displayLoadingToastr.bind(this)

    chirpStore.on(
      chirpStore.eventTypes.CHIRPS_FETCHED,
      this.handleChirpsFetched
    )

    chirpStore.on(
      chirpStore.eventTypes.CHIRP_CREATED,
      this.handleChirpCreation
    )

    chirpStore.on(
      chirpStore.eventTypes.CHIRP_DELETED,
      this.handleChirpDeletion
    )
  }

  componentDidMount () {
    chirpActions.all(Auth.getSubscriptions())
  }

  componentWillUnmount () {
    chirpStore.removeListener(
      chirpStore.eventTypes.CHIRPS_FETCHED,
      this.handleChirpsFetched
    )

    chirpStore.removeListener(
      chirpStore.eventTypes.CHIRP_CREATED,
      this.handleChirpCreation
    )

    chirpStore.removeListener(
      chirpStore.eventTypes.CHIRP_DELETED,
      this.handleChirpDeletion
    )
  }

  handleChirpsFetched (data) {
    if (data.error) {
      this.displayErrorToastr(data.description)
    } else {
      this.setState({
        chirps: data,
        loading: false
      })
      toastr.success('Done')
    }
  }

  handleChirpChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'chirp')
  }

  handleChirpForm (event) {
    event.preventDefault()
    if (!this.state.chirp.text) {
      this.displayErrorToastr('Please put some text and then chirp it!')
      return
    }

    const chirp = this.state.chirp
    chirpActions.create(chirp)
  }

  handleChirpCreation (data) {
    if (data.error) {
      this.displayErrorToastr(data.description)
      return
    }

    if (Auth.getSubscriptions().indexOf(Auth.getUser()) > -1) {
      let { chirps } = this.state
      chirps.push(data)
    }

    this.setState({
      chirp: {
        text: '',
        author: Auth.getUser()
      }})
    toastr.success('Chirped!')
  }

  handleChirpDeleteClicked (author, id) {
    if (author !== Auth.getUser()) {
      this.displayErrorToastr('You are not authorized for this request.')
      return
    }

    chirpActions.delete(id)
    this.setState({ chirpToDelete: id })
  }

  handleChirpDeletion (data) {
    if (data.error) {
      this.displayErrorToastr(data.description)
    } else {
      let { chirps } = this.state
      const chirpToDelete = chirps.find(c => c._id === this.state.chirpToDelete)
      const index = chirps.indexOf(chirpToDelete)
      if (index > -1) {
        chirps.splice(index, 1)
      }

      this.setState({ chirps })
      toastr.success(`${data.count} chirp(s) deleted.`)
    }
  }

  displayErrorToastr (error) {
    toastr.error(error)
    this.setState({ error: '' })
  }

  displayLoadingToastr () {
    toastr.info('Loading data')
  }

  render () {
    const { chirps } = this.state

    return (
      <div className='content'>
        {this.state.loading && this.displayLoadingToastr()}

        <UserProfile
          username={Auth.getUser()}
          chirp={this.state.chirp}
          onChange={this.handleChirpChange}
          onSave={this.handleChirpForm} />

        <div id='myChirps' className='chirps'>
          <h2 className='titlebar'>Chirps</h2>
          {chirps.length > 0
            ? (chirps.map(chirp => (
              <Chirp
                key={chirp._id}
                onDelete={() => this.handleChirpDeleteClicked(chirp.author, chirp._id)}
                {...chirp} />)))
            : (<div className='chirp'>
              <span className='loading'>No chirps in database</span>
            </div>)}
        </div>
      </div>

    )
  }
}

export default ListChirpsPage
