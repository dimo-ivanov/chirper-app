import React from 'react'
import { Link } from 'react-router-dom'

const DiscoverPageUser = (props) => {
  const followers = props.allUsers.filter(user => user.subscriptions.indexOf(props.username) > -1).length
  return (
    <div className='userbox'>
      <div><Link to={`/users/${props.username}`} className='chirp-author'>{props.username}</Link></div>
      <div className='user-details'>
        <span>{followers} followers</span>
      </div>
    </div>
  )
}

export default DiscoverPageUser
