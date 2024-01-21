import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { SidebarItem } from '../components/Sidebar'
import { faPlus, faUserFriends} from '@fortawesome/free-solid-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Table from '../components/Table'
import { getCategoryData } from '../apis/api'
import Searchinput from '../components/ui/Searchinput'
import Loading from '../components/ui/Loading'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import Modal from '../components/ui/Modal'

const Home = ({setLogin}) => {
    const [category, setCategory] = useState('student')
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)

    async function getDataResponse() {
        try{
            setLoading(true)
            const response = await getCategoryData(category)
            if (response != undefined) {
                setData(response)
            }else{
                setLogin(false)
            } 
            
            setLoading(false)

        }catch(error) {
            console.error(error)
        }
    }

    useEffect(()=> {
        getDataResponse()
    },[category])



    const SideBarContainer = () => {
        const [action, setAction] = useState("")
        
        useEffect(() => {
            action != "" ?
                document.getElementById(`my_modal_${action}`).showModal()
            :
            (action)
        },[action])
        return (
            <div className="sidebar z-10">      
                <Modal
                    action={action}
                    type={category}
                    getDataResponse={getDataResponse}
                    setLogin={setLogin}
                />      
                <Sidebar>
                    <SidebarItem icon={<FontAwesomeIcon icon={faUserFriends}/>} setCategory={setCategory} category={category} text="Student"/>
                    <SidebarItem icon={<FontAwesomeIcon icon={faBookOpen}/>} setCategory={setCategory} category={category} text="Book"/>
                    <SidebarItem icon={<FontAwesomeIcon icon={faPlus}/>} setAction={setAction} action={action}  text="Add"/>
                    <SidebarItem icon={<FontAwesomeIcon icon={faDoorOpen}/>} setAction={setAction} action={action}  text="Logout"/>
                </Sidebar>
            </div>
        )
    }
    
    const SearchInputContainer = () => {

        return (
            <div className="search-table w-full py-5 px-10 bg-slate-900">
                <Searchinput
                    setData={setData}
                    category={category}
                    setLoading={setLoading}
                    />
            </div>
        )
    }

    const TableContainer = () => {
        return (
            <div className="item w-full h-auto overflow-y-scroll xl:overflow-y-scroll xl:overflow-hidden flex-grow px-10 py-5 bg-slate-900 flex">
                
                <div className="table">

                    {
                      isLoading 
                      ?   
                      <Loading></Loading>
                      :
                      <Table 
                      tableData={data}
                      category={category}
                      setData={setData}/>
                    }
                </div>

            </div>
        )
    }

  return (
    <div className="flex w-screen overflow-hidden">
        {SideBarContainer()}
        <div className="flex w-full overflow-y-scroll xl:overflow-auto flex-col h-screen xl:flex-row">
            {SearchInputContainer()}
            {TableContainer()}
        </div>
    </div>
  )
}

export default Home