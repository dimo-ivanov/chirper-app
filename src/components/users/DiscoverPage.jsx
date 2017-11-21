import React, { Component } from 'react'
import DiscoverPageUser from './DiscoverPageUser'
import Auth from './Auth'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import toastr from 'toastr'

class DiscoverPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: [],
      usersToList: []
    }

    this.handleUsers = this.handleUsers.bind(this)

    userStore.on(
      userStore.eventTypes.GOT_ALL_USERS,
      this.handleUsers
    )
  }

  componentDidMount () {
    userActions.detAllUsers()

    toastr.info('Loading data')
  }

  componentWillUnmount () {
    userStore.removeListener(
      userStore.eventTypes.GOT_ALL_USERS,
      this.handleUsers
    )
  }

  handleUsers (data) {
    if (data.error) {
      toastr.error(data.description)
    } else {
      const currentUserObj = data.find(user => user.username === Auth.getUser())
      const users = data.slice()
      const usersToList = data.filter(user => user !== currentUserObj)
      this.setState({ users, usersToList })
      toastr.success('Done')
    }
  }

  render () {
    return (
      <section id='viewDiscover'>
        <div className='content'>
          <div className='chirps'>
            <h2 className='titlebar'>Discover</h2>
            <div id='userlist'>

              {this.state.usersToList.map(user => (
                <DiscoverPageUser
                  key={user._id}
                  allUsers={this.state.users}
                  {...user} />))}

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default DiscoverPage
