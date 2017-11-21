import React from 'react'

const CreateChirpForm = (props) => (
  <form id='formSubmitChirpMy' className='chirp-form'>
    <textarea
      name='text'
      className='chirp-input'
      value={props.chirp.text}
      onChange={props.onChange} />
    <input
      className='chirp-submit'
      id='btnSubmitChirpMy'
      defaultValue='Chirp'
      type='submit'
      onClick={props.onSave} />
  </form>
)

export default CreateChirpForm
