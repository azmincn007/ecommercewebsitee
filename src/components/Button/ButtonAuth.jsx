import React from 'react';

const Buttonauth = ({ type, text ,onClick}) => {
  return (
    <button type={type} className='button' onClick={onClick}>
      {text}
    </button>
  );
};

export default Buttonauth;
