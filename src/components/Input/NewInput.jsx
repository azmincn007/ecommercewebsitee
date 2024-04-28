// NameInput.js
import React from 'react';

const NewInput = ({value,onChange,placeholder,name,className,type}) => {
  return (
    <input
      type= {type}
      className={className}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
    />
  );
};

export default NewInput;
