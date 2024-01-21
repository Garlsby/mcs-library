import React, { useState } from 'react'

const CheckBox = ({bookId ,value, updateValue}) => {

    const handleChange = () => {
        updateValue(!value, bookId);
    }

  return (
    <input
        checked={value}
        onChange={handleChange}
        type="checkbox" 
        className="checkbox" 
    />
  )
}

export default CheckBox