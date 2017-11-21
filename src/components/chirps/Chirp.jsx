import React from 'react'
import Auth from '../users/Auth'
import postedOn from '../../utilities/date-convertor'
import { Link } from 'react-router-dom'

const Chirp = (props) => {
  return (
    <article className='chirp'>
      <div className='titlebar'>
        <Link to={`/users/${props.author}`} className='chirp-author'>{props.author}</Link>
        <span className='chirp-time'>
          {postedOn(props._kmd.lmt)}
          {props.author === Auth.getUser() && (<span onClick={props.onDelete}> | delete</span>)}
        </span>
      </div>
      <p>{props.text}</p>
    </article>
  )
}

export default Chirp
