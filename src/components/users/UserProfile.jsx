import React from 'react'
import CreateChirpForm from '../chirps/CreateChirpForm'
import UserStats from './UserStats'
import Auth from './Auth'

const UserProfile = (props) => (
  <div className='chirper'>
    <h2 className='titlebar'>{props.username}</h2>

    {props.username === Auth.getUser() ? (
      <CreateChirpForm
        chirp={props.chirp}
        onChange={props.onChange}
        onSave={props.onSave} />
    ) : (
      <span id='btnFollow' className='chirp-author' onClick={props.onClick}>
        {props.followed ? 'Unfollow' : 'Follow'}
      </span>
    )}

    <UserStats username={props.username} />
  </div>
)

export default UserProfile
