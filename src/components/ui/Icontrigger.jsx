import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import { useState } from 'react';
import { getDataById } from '../../apis/api';


const Icontrigger = ({data, category, setData, setBookData}) => {


  const [action, setAction] = useState("")

  const getData = async() =>  {
    try{
      const result = await getDataById(category, data.id)
    }catch(error) {
      console.error(error)
    }
  } 

  useEffect(() => {
    getData()
  },[])

  const actionList = {
     edit: "edit",
     return: "return",
     delete: "delete"
  }


  return (
    <>    
      {Object.keys(actionList).map((action, indexAction) => (
        <Modal
          setBookData={setBookData}
          key={indexAction}
          setAction={setAction}
          action={actionList[action]}
          type={category}
          data={data}
          setData={setData}/>
      ))}
      <div className="dropdown dropdown-hover dropdown-left dropdown-end z-10 ">
        <div tabIndex={0} role="button" className="btn m-1 bg-slate-800 border-none">
          <FontAwesomeIcon icon={faEllipsisVertical}/>
        </div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a onClick={() => {setAction("edit"); document.getElementById(`my_modal_${data.id}_edit`).showModal();}} className='text-blue-500 hover:text-blue-400'>Update</a></li>
          {category == "student" &&
            <li><a onClick={() => {setAction("return"); document.getElementById(`my_modal_${data.id}_return`).showModal();}} className='text-yellow-500 hover:text-yellow-400'>Return</a></li>
          }
          <li><a onClick={() => {setAction("delete"); document.getElementById(`my_modal_${data.id}_delete`).showModal();}} className='text-red-500 hover:text-red-400'>Delete</a></li>
        </ul>
      </div>
    </>
  );
}

export default Icontrigger;
