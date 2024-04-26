// NameInput.js
import React from 'react';

const Input = ({value,onChange,placeholder,name}) => {
  return (
    <input
      type='text'
      className='input-field'
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
    />
  );
};

export default Input;
