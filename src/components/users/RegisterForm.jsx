import React from 'react'
import { Link } from 'react-router-dom'
// import Input from '../common/forms/Input'

const RegisterForm = (props) => (
  <form className='form' id='formRegister'>
    {props.error && props.displayError(props.error)}
    <label>Username</label>
    <input name='email' type='text' value={props.user.email} onChange={props.onChange} />
    <label>Password</label>
    <input name='password' type='password' value={props.user.password} onChange={props.onChange} />
    <label>Repeat Password</label>
    <input name='confirmPassword' type='password' value={props.user.confirmPassword} onChange={props.onChange} />
    <input id='btnRegister' value='Register' type='submit' onClick={props.onSave} />
    <Link to='/users/login'>Log in</Link>
  </form>

  // <form>
  //   <div>{props.error}</div>

  //   <Input
  //     name='name'
  //     placeholder='Name'
  //     value={props.user.name}
  //     onChange={props.onChange} />

  //   <br />

  //   <Input
  //     name='email'
  //     type='email'
  //     placeholder='E-mail'
  //     value={props.user.email}
  //     onChange={props.onChange} />

  //   <br />

  //   <Input
  //     name='password'
  //     type='password'
  //     placeholder='Password'
  //     value={props.user.password}
  //     onChange={props.onChange} />

  //   <br />

  //   <Input
  //     name='confirmPassword'
  //     type='password'
  //     placeholder='Confirm Password'
  //     value={props.user.confirmPassword}
  //     onChange={props.onChange} />

  //   <br />

  //   <input type='submit' onClick={props.onSave} />
  // </form>
)

export default RegisterForm
