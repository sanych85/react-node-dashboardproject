import React from 'react';

const FormRow = ({ text, labelText, handleChange, type, name, value }) => {
  return (
    <div className="form-row">
      <label htmlFor={name}>{labelText || name}</label>
      <input
        value={value}
        type={type}
        onChange={(e)=>handleChange(e)}
        className="form-input"
        name = {name}
      />
     
    </div>
  );
};

export default FormRow;
