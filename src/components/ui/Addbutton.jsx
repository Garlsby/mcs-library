import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Addbutton = () => {
  return (
    <div className='w-full items-center flex justify-center bg-violet-700 p-5  rounded cursor-pointer'>
        <FontAwesomeIcon icon={faPlus}/>
    </div>
  )
}

export default Addbutton