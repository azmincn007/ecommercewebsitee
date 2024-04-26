// PasswordInput.js
import React from 'react';

const PasswordInput = ({value,onChange}) => {
  return (
    <input
      type='password'
      placeholder='Password'
      className='input-field'
      name='password'
      value={value}
      onChange={onChange}
    />
  );
};

export default PasswordInput;
