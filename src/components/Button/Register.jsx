import React from 'react';

const ButtonReg = ({ type, text }) => {
  return (
    <button type={type} className='button-reg'>
      {text}
    </button>
  );
};

export default ButtonReg;
