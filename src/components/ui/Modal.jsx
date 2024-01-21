import React from 'react'
import { deleteDataById, getCategoryData } from '../../apis/api';
import Select from './Select';
import { useState, useEffect } from 'react';
import { update } from '../../interface/updateObj';
import { editData } from '../../apis/api';
import { faBook, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postData } from '../../apis/api';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { returnBookFromUser } from '../../apis/api';
import CheckBox from './CheckBox';
import Searchinput from './Searchinput';
import Loading from './Loading';
import { borrowBook } from '../../apis/api';


const Modal = ({action, type, data, setData, setLogin,setAction, getDataResponse, setBookData, bookData}) => {

    const deleteData = async () => {
        try{
            const response = await deleteDataById(data.id, type)
            const result = await getCategoryData(type)
            setData(result)
        }catch(error) {
            console.error(error)
        }
    }

    const logout = async () => {
        localStorage.removeItem("token")
        setLogin(false)
    }

    const category = {
        student: {
            name: "Name",
            imageUrl: "ImageUrl",
            elementary: "Elementary"
        },
        book: {
            title: "Title",
            imageUrl: "ImageUrl",
            series: "Series",
            isbN13: "ISBN13",
            isbN10: "ISBN10"
        }
    }

    const addModal = () => {
        const [toggle, setToggle] = useState(false)

        
        const [student, setStudent] = useState({
            name: "",
            imageUrl: "",
            elementary: 0
        })
        const [book, setBook] = useState({
            title: "",
            imageUrl: "",
            series: "",
            isbN13: "",
            isbN10: ""
        })

        const dataEntry = {
            true: book,
            false: student
        }

        const dataType = {
            true: "Book",
            false: "Student"
        }

        const dataInput = {
            true: setBook,
            false: setStudent
        }

        const [validate, setValidation] = useState("")

        useEffect(() => {
            console.log(validate)
        },[validate])
        const addData = async() => {
            
            switch(toggle) {
                case true:
                    if(dataEntry[toggle].title == "") {
                        setValidation("Title")
                        console.log("required")
                        return 
                    }
                case false:
                    if(dataEntry[toggle].name == "") {
                        setValidation("Name")
                        console.log("required")
                        return 
                    }
                default :      
                    try {
                        console.log(dataEntry[toggle])
                        console.log("Request Payload:", dataEntry[toggle]);
                        const response = await postData(dataType[toggle].toLowerCase() , dataEntry[toggle])
                        getDataResponse()
                        document.getElementById(`my_modal_${data.id}`).close();
                        console.log(response)
                    }catch (error) {
                        console.error(error)
                    }
                    break
            }

        }

        const handleDataInput = (key, value) => {
            dataInput[toggle](prev => ({
                ...prev,
                [key]: key == 'elementary' ? parseInt(value) :value
            }))
        }

        const emptyDataInput = () => {
            Object.keys(dataEntry[toggle]).map((key) => {
                dataInput[toggle](prev => ({
                    ...prev,
                    [key]: ""
                }))
            })

        }

        const closeBtn = () => {
            return (
                <form method="dialog">
                <button className="btn">Close</button>
            </form>
            )
        }

        useEffect(() => {
            setValidation("")
        },[toggle])
        return (
            <>            
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-2xl">{`Add ${dataType[toggle]}`}</h3>
                <button className='btn bg-red-600' onClick={emptyDataInput}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
            <div className="flex items-center gap-5 w-full justify-center">
                <FontAwesomeIcon icon={faUser}/>
                <input type="checkbox" className="toggle" onChange={() => setToggle(!toggle)}/>
                <FontAwesomeIcon icon={faBook}/>
            </div>
            <div  className='gap-5 flex flex-col'>
                {
                    Object.keys(dataEntry[toggle]).map((property, indexProperty) => (
                        property === 'elementary' ? (
                            <Select
                                key={property}
                                value={dataEntry[toggle][property]}
                                onChange={(e) => handleDataInput(property, e.target.value)}
                            />
                        ) : (
                            <input
                                key={indexProperty}
                                placeholder={property[0].toUpperCase() + property.slice(1)}
                                onChange={(e) => handleDataInput(property, e.target.value)}
                                required={
                                    (() => {
                                        switch (property) {
                                            case "name":
                                                return true;
                                            case "title":
                                                return true;
                                            case "elementary":
                                                return true;
                                            default:
                                                return false;
                                        }
                                    })()
                                }
                                value={dataEntry[toggle][property]}
                                className={`${dataEntry[toggle][property] !== "" ? 'input-primary' : ""} transition-all input input-bordered input-md w-full`}
                            />
                        )
                    ))
                    
                }
                <h3 className='text-red-500'>{validate + " required"}</h3>
                <div className="modal-action flex">
                    <form method="dialog">
                        <button 
                            onClick={() => setValidation("")}
                            className="btn">Close</button>
                    </form>
                    <button
                        onClick={addData}
                        className="btn bg-violet-500 font-bold text-white hover:text-white">
                            {`Add ${dataType[toggle]}`}
                    </button>
                </div>
            </div>
        </>
        )
    }

    const editModal = () => {
        const [selectedValue, setSelectedValue] = useState(data.elementary);
        
        const [student, setStudent] = useState({
            name: "",
            imageUrl: "",
            elementary: data.elementary
        })
        const [book, setBook] = useState({
            title: "",
            imageUrl: "",
            series: "",
            isbN13: "",
            isbN10: ""
        })

        const setHandle = {
            student: setStudent,
            book: setBook
        }

        const cateHandle = {
            student: student,
            book: book
        }
                
        const submitEdit = async() => {
            try{
                const response = await editData(data.id,type, cateHandle[type])
                const result = await getCategoryData(type)
                setData(result)
                setAction("")
                document.getElementById(`my_modal_${data.id}_${action}`).close();

            }catch(error) {
                setValidation("Invalid input")
            }
        }
        
        const handleSelectChange = (event) => {
            const newValue = event.target.value
            setSelectedValue(event.target.value);
            console.log(newValue)
            update({ key: "elementary", newValue: newValue, setObject: setHandle[type] })
        };

        const emptyDataInput = () => {
            Object.keys(cateHandle[type]).map((key) => {
                setHandle[type](prev => ({
                    ...prev,
                    [key]: ""
                }))
            })

        }

        return (
            <>  
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">Edit</h3>
                    <button className='btn bg-red-600' onClick={emptyDataInput}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
                
                {
                    Object.keys(category[type]).map((property, indexProperty) => (
                        <div key={indexProperty}>
                            <h3 
                                className='text-sm'>{category[type][property]}</h3>
                            {(() => {
                                switch (property) {
                                    case 'elementary':
                                        return (
                                            <Select 
                                                key={indexProperty}
                                                value={selectedValue} 
                                                currentValue={data.elementary}
                                                onChange={handleSelectChange}
                                            />
                                        );
                                    default:
                                        return (
                                            <input
                                                type="text"
                                                value={cateHandle[type][property]}
                                                placeholder={data[property]}
                                                key={indexProperty}
                                                onChange={e => update({ key: Object.keys(category[type])[indexProperty], newValue: e.target.value, setObject: setHandle[type] })}
                                                className={`${cateHandle[type][property] !== "" ? "input-primary" : ""} transition-all input input-bordered input-md w-full`}
                                            />
                                        );
                                }
                            })()}
                        </div>
                    ))
                }

                <div className="modal-action flex">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                    <button 
                        onClick={submitEdit}
                        className="btn bg-violet-400 text-black hover:text-white">Edit Changes</button>
                </div>
            </>
        );
    };
        
    const deleteModal = () => {
        return (
            <>            
                <h3 className="font-bold text-lg">Delete</h3>
                <h5>{`Are you sure want to delete? "${data.name || data.title}"`}</h5>
                <div className="modal-action flex">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                        <button
                            onClick={deleteData}
                            className="btn bg-red-500 text-white hover:text-white">
                                Delete
                        </button>
                </div>
            </>
        )
    }

    const logoutModal = () => {
        return (

            <>            
                <h3 className="font-bold text-lg">Logout</h3>
                <h5>{`Are you sure want to logout?`}</h5>
                <div className="modal-action flex">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                        <button
                            onClick={logout}
                            className="btn bg-red-500 text-white hover:text-white">
                                Logout
                        </button>
                </div>
            </>
        )
    }

    const returnModal = () => {
        const [selected, setSelected] = useState([])

        const returnBook = async() => {
            try{
                selected.forEach(async (itemId) => {
                    const result = await returnBookFromUser(itemId)
                    const response = await getCategoryData(type)
                    const getBook = await getCategoryData("book")
                    setBookData(getBook)
                    setData(response)
                })
                setAction("")
                document.getElementById(`my_modal_${data.id}_${action}`).close();
            }catch(error){
                console.error(error)
            }
        }

        const returnTable = (books) => {
            const listItems = books ? books.map((book) => (book.id)) : []

            function handleSelect(value, bookId) {
                if (value) {
                  setSelected([...selected, bookId]);
                } else {
                  setSelected(selected.filter((item) => item !== bookId));
                }
              };

              function selectAll(value) {
                if(value) {
                    setSelected(listItems);
                } else {
                    setSelected([])
                }
              };

            return (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>
                                <label>
                                    <CheckBox
                                        value={selected.length === listItems.length}
                                        updateValue={selectAll}
                                    />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>ISBN-13 / ISBN-10</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                books.map((book, indexBook) => (
                                    <tr key={indexBook}>
                                        <th>
                                            <label>
                                                <CheckBox
                                                    bookId={book.id}
                                                    value={selected.includes(book.id)}
                                                    updateValue={handleSelect}
                                                />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={book.imageUrl} alt="Book Avatar" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{book.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {book.isbN13 || book.isbN10}
                                        </td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs">details</button>
                                        </th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )
        }        


        return(
            <>            
            <h3 className="font-bold text-lg">Return</h3>
            {
                data.books && type == 'student' 
                ?   
                    returnTable(data ? data.books : null)
                : ""
            }        
            <div className="modal-action flex">

                <form method="dialog">
                    <button className="btn">Close</button>
                </form>
                    <button
                        onClick={returnBook}
                        className="btn bg-yellow-600 bold text-white hover:text-white">
                            Return
                    </button>
            </div>
        </>
        )
    }

    const borrowModal = () => {
        const [loading, setLoading] = useState(false)
        const books = bookData.filter(item => item.studentId == null ).map((book) => book.id)
        const [bookItem, setBookItem] = useState([])
        
        const handleSelect = (value, bookId) => {
            if(value) {
                setBookItem([...bookItem, bookId])
            }else{
                setBookItem(bookItem.filter((item) => item !== bookId))
            }
        }

        const selectAll = (value) => {
            if(value) {
                setBookItem(books)
            }else {
                setBookItem([])
            }
        }

        const handleBorrowBook = () => {
            try{
                bookItem.forEach(async(book) => {
                    const response = await borrowBook(book, data.id) 
                    const getStudentResult = await getCategoryData("student")
                    const getBookResult = await getCategoryData(type)
                    setBookData(getBookResult)
                    setData(getStudentResult)
                    document.getElementById(`my_modal_${data.id}_${action}`).close
                })
            }catch(error){
                console.log(error)
            }
        }

        return(
            <>
                <h3 className="font-bold text-lg">{data.id}</h3>
                <Searchinput
                    setLoading={setLoading}
                    category={"book"}
                    setData={setBookData}
                    />
                    <div className="overflow-x-auto">
                    {loading 
                        ? 
                        <Loading/> 
                        :
                            books.length === 0 ?
                            <h1 className='text-lg'>NotFound</h1>
                            :
                            <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>
                                <label>
                                    <CheckBox
                                        value={bookItem.length === books.length}
                                        updateValue={selectAll}
                                    />
                                </label>
                                </th>
                                <th>Name</th>
                                <th>ISBN-13 / ISBN-10</th>

                            </tr>
                            </thead>
                            <tbody>
                            {/* row */}
                            {   
                                bookData.filter(book => book.studentId == null).map((book,bookIndex) => (
                                    <tr key={bookIndex}>
                                        <th>
                                            <label>
                                                <CheckBox
                                                    bookId={book.id}
                                                    value={bookItem.includes(book.id)}
                                                    updateValue={handleSelect}
                                                    />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={book.imageUrl} alt="Avatar" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{book.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {book.isbN13 || book.isbN10}
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    }
                    </div>
                    
                <div className="modal-action flex">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                    <button
                        onClick={handleBorrowBook}
                        className="btn bg-green-600 bold text-white hover:text-white">
                            Borrow
                    </button>
                </div>   
            </>
        )
    }

    const actionType = {
        edit: editModal,
        delete: deleteModal,
        logout: logoutModal,
        add: addModal,
        return: returnModal,
        borrow: borrowModal
    }

  return (
    <>
        <dialog id={`my_modal_${data ? data.id + "_" : ""}${action}`} className="modal">
            <div className="modal-box flex flex-col gap-5">
                {action ? actionType[action]() : ""}
            </div>
        </dialog>
    </>
  )
}

export default Modal