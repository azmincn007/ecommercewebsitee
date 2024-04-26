// PhoneInput.js
import React from 'react';

const PhoneInput = ({value,onChange}) => {
  return (
    <input
      type='text'
      placeholder='Phone'
      className='input-field'
      name='phone'
      value={value}
      onChange={onChange}
    />
  );
};

export default PhoneInput;
