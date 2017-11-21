import React, { Component } from 'react'
import chirpActions from '../../actions/ChirpActions'
import chirpStore from '../../stores/ChirpStore'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import toastr from 'toastr'
import Auth from '../users/Auth'

class UserStats extends Component {
  constructor (props) {
    super(props)

    this.state = {
      chirps: '',
      following: '',
      followers: ''
    }

    this.handleChirpsFetching = this.handleChirpsFetching.bind(this)
    this.handleUserInfo = this.handleUserInfo.bind(this)
    this.handleUserFollowers = this.handleUserFollowers.bind(this)
    this.handleChirpCreation = this.handleChirpCreation.bind(this)
    this.handleChirpDeletion = this.handleChirpDeletion.bind(this)
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
      userStore.eventTypes.GOT_USER_INFO,
      this.handleUserInfo
    )

    userStore.on(
      userStore.eventTypes.GOT_USER_FOLLOWERS,
      this.handleUserFollowers
    )

    userStore.on(
      userStore.eventTypes.SUBSCRIPTIONS_UPDATED,
      this.handleSubscriptionsUpdating
    )
  }

  componentDidMount () {
    chirpActions.allByUsername(this.props.username)
    userActions.getUserInfo(this.props.username)
    userActions.getFollowers(this.props.username)
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
      userStore.eventTypes.GOT_USER_INFO,
      this.handleUserInfo
    )

    userStore.removeListener(
      userStore.eventTypes.GOT_USER_FOLLOWERS,
      this.handleUserFollowers
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
        chirps: data.length
      })
    }
  }

  handleUserInfo (data) {
    if (data.error) {
      toastr.error(data.description)
    } else {
      this.setState({
        following: data[0].subscriptions.length
      })
    }
  }

  handleUserFollowers (data) {
    if (data.error) {
      toastr.error(data.description)
    } else {
      this.setState({
        followers: data.length
      })
    }
  }

  handleChirpCreation (data) {
    if (data.author === this.props.username) {
      let chirps = Number(this.state.chirps) + 1
      this.setState({ chirps })
    }
  }

  handleChirpDeletion (data) {
    if (!data.error && Auth.getUser() === this.props.username) {
      let chirps = Number(this.state.chirps) - 1
      this.setState({ chirps })
    }
  }

  handleSubscriptionsUpdating () {
    userActions.getFollowers(this.props.username)
  }

  render () {
    const { chirps, following, followers } = this.state

    return (
      <div id='myStats' className='user-details'>
        <span>{chirps} chirps</span> | <span>{following} following</span> | <span>{followers} followers</span>
      </div>
    )
  }
}

export default UserStats
