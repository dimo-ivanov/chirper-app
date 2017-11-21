import React, { Component } from 'react'
import Chirp from './Chirp'
import UserProfile from '../users/UserProfile'
import chirpActions from '../../actions/ChirpActions'
import chirpStore from '../../stores/ChirpStore'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import FormHelpers from '../../utilities/FormHelpers'
import Auth from '../users/Auth'
import toastr from 'toastr'

class ProfileChirpsPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      chirps: [],
      chirp: {
        text: '',
        author: Auth.getUser()
      },
      chirpToDelete: '',
      followed: Auth.getSubscriptions().indexOf(this.props.match.params.username) > -1,
      loading: true,
      error: ''
    }

    this.handleChirpsFetching = this.handleChirpsFetching.bind(this)
    this.handleChirpChange = this.handleChirpChange.bind(this)
    this.handleChirpForm = this.handleChirpForm.bind(this)
    this.handleChirpCreation = this.handleChirpCreation.bind(this)
    this.handleChirpDeleteClicked = this.handleChirpDeleteClicked.bind(this)
    this.handleChirpDeletion = this.handleChirpDeletion.bind(this)
    this.handleClickFollow = this.handleClickFollow.bind(this)
    this.handleSubscriptionsUpdating = this.handleSubscriptionsUpdating.bind(this)

    chirpStore.on(
      chirpStore.eventTypes.ALL_BY_USERNAME_CHIRPS_FETCHED,
      this.handleChirpsFetching
    )

    chirpStore.on(
      chirpStore.eventTypes.CHIRP_CREATED,
      this.handleChirpCreation
    )

    chirpStore.on(
      chirpStore.eventTypes.CHIRP_DELETED,
      this.handleChirpDeletion
    )

    userStore.on(
      userStore.eventTypes.SUBSCRIPTIONS_UPDATED,
      this.handleSubscriptionsUpdating
    )
  }

  componentDidMount () {
    chirpActions.allByUsername(this.props.match.params.username)
    toastr.info('Loading data')
  }

  async componentWillReceiveProps () {
    await this.setState({ chirps: [], loading: true })
    chirpActions.allByUsername(this.props.match.params.username)
    toastr.info('Loading data')
  }

  componentWillUnmount () {
    chirpStore.removeListener(
      chirpStore.eventTypes.ALL_BY_USERNAME_CHIRPS_FETCHED,
      this.handleChirpsFetching
    )

    chirpStore.removeListener(
      chirpStore.eventTypes.CHIRP_CREATED,
      this.handleChirpCreation
    )

    chirpStore.removeListener(
      chirpStore.eventTypes.CHIRP_DELETED,
      this.handleChirpDeletion
    )

    userStore.removeListener(
      userStore.eventTypes.SUBSCRIPTIONS_UPDATED,
      this.handleSubscriptionsUpdating
    )
  }

  handleChirpsFetching (data) {
    if (data.error) {
      toastr.error(data.description)
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
      toastr.error('Please put some text and then chirp it!')
      return
    }

    const chirp = this.state.chirp
    chirpActions.create(chirp)
  }

  handleChirpCreation (data) {
    if (data.error) {
      toastr.error(data.description)
    } else {
      let { chirps } = this.state
      chirps.push(data)
      toastr.success('Chirped!')
      this.setState({
        chirp: {
          text: '',
          author: Auth.getUser()
        }})
    }
  }

  handleChirpDeleteClicked (author, id) {
    if (author !== Auth.getUser()) {
      toastr.error('You are not authorized for this request.')
      return
    }

    chirpActions.delete(id)
    this.setState({ chirpToDelete: id })
  }

  handleChirpDeletion (data) {
    if (data.error) {
      toastr.error(data.description)
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

  handleClickFollow () {
    let follow = () => {
      let arr = Auth.getSubscriptions().split(',')
      arr.push(this.props.match.params.username)
      userActions.updateSubscriptions(arr, Auth.getUserId())
    }

    let unfollow = () => {
      let arr = Auth.getSubscriptions().split(',')
      const index = arr.indexOf(this.props.match.params.username)
      arr.splice(index, 1)
      userActions.updateSubscriptions(arr, Auth.getUserId())
    }

    return Auth.getSubscriptions().indexOf(this.props.match.params.username) < 0 ? follow() : unfollow()
  }

  handleSubscriptionsUpdating (data) {
    if (data.error) {
      toastr.error(data.description)
    } else {
      Auth.saveSubscriptions(data.subscriptions)
      const followed = Auth.getSubscriptions().indexOf(this.props.match.params.username) > -1
      this.setState({ followed })
    }
  }

  render () {
    const { chirps, loading } = this.state

    return (
      <div className='content'>

        <UserProfile
          username={this.props.match.params.username}
          chirp={this.state.chirp}
          onChange={this.handleChirpChange}
          onSave={this.handleChirpForm}
          onClick={this.handleClickFollow}
          followed={this.state.followed} />

        <div id='myChirps' className='chirps'>
          <h2 className='titlebar'>Chirps</h2>
          {chirps.length > 0
          ? (chirps.map(chirp => (
            <Chirp
              key={chirp._id}
              onDelete={() => this.handleChirpDeleteClicked(chirp.author, chirp._id)}
              {...chirp} />)))
          : (<div className='chirp'>
            <span className='loading'>{loading ? '' : 'No chirps in database'}</span>
          </div>)}
        </div>
      </div>

    )
  }
}

export default ProfileChirpsPage
