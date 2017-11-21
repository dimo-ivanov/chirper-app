import React from 'react'

const Input = (props) => {
  const type = props.type || 'text'
  const { name, placeholder, value, onChange } = props

  return (
    <div className='form'>
      <label htmlFor={name}>{placeholder}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
    </div>
  )
}

export default Input
