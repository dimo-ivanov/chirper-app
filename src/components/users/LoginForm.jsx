import React from 'react'
import { Link } from 'react-router-dom'
// import Input from '../common/forms/Input'

const LoginForm = (props) => (
  <form id='formLogin' className='form'>
    {props.error && props.displayError(props.error)}
    <label>Username</label>
    <input name='email' type='text' value={props.user.email} onChange={props.onChange} />
    <label>Password</label>
    <input name='password' type='password' value={props.user.password} onChange={props.onChange} />
    <input id='btnLogin' defaultValue='Sign In' type='submit' onClick={props.onSave} />
    <Link to='/users/register'>Register</Link>
  </form>
)

export default LoginForm
