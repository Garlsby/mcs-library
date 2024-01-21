import React from 'react'
import { getDataByName } from '../../apis/api'
import { getCategoryData } from '../../apis/api'

const Searchinput = ({setData ,category, setLoading}) => {

  async function inputHandle(name){
    try{
      if (name == ""){
        setLoading(true)
        const response = await getCategoryData(category)
        setData(response)
        setLoading(false)

      }else {
        setLoading(true)
        const response = await getDataByName(category, name)
        setData(response)
        setLoading(false)
      }
    }catch(error){
      console.error(error)
    }

  }
  return (  
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input onChange={(e) => inputHandle(e.target.value)} type="search" id="default-search" className="block w-full focus:outline-none focus:b p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Search..." required/>
    </div>
  )
}

export default Searchinput