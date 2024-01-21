import React from 'react';

const Select = ({value, onChange, currentValue }) => {
  return (
    <select
      className={`${currentValue != value  ? "select-primary" : ""} transition-all select select-bordered w-full max-w`}
      value={value}
      onChange={onChange}
    >
      <option value={0}>Lower</option>
      <option value={1}>Upper</option>
      <option value={2}>Middle</option>
      <option value={3}>High School</option>
      <option value={4}>Teacher</option>
    </select>
  );
};

export default Select;
