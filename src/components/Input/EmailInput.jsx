// EmailInput.js
import React from 'react';

const EmailInput = ({value,onChange}) => {
  return (
    <input
      type='email'
      placeholder='Email'
      className='input-field'
      name='email'
      value={value}
      onChange={onChange}
    />
  );
};

export default EmailInput;
