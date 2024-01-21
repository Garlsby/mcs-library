import React, { useEffect, useState } from 'react';
import Icontrigger from './ui/Icontrigger';
import smileFlower from '../assets/smileFlower.png'
import mcsLogo from '../assets/mcsLogo.png'
import Modal from './ui/Modal';
import { getCategoryData } from '../apis/api';

const Table = ({ tableData, category, setData}) => {
  const [bookData, setBookData] = useState([])
  const getBookData = async () => {
    try {
      const response = await getCategoryData("book")
      setBookData(response)
      console.log(response)
      return response
    }catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getBookData()
  },[])
  
  const categoryProperties = {
    book: {
      imageUrl: 'ImageUrl',
      title: 'Title',
      series: 'Series',
      isbN13: 'ISBN13',
      isbN10: 'ISBN10',
      student: 'Student',
    },
    student: {
      imageUrl: 'ImageUrl',
      name: 'Name',
      elementary: 'Elementary',
      books: 'Books',
    },
  };

  const handleElementary = (num) => {
    switch (num){
        case 0: 
            return "Lower"
        case 1: 
            return "Upper"
        case 2: 
            return "Middle"
        case 3: 
            return "High School"
        case 4: 
            return "Teacher"
    }
}
  const renderTableHeader = () => {
    return (
      <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-slate-800 dark:text-gray-400">
        <tr>
          {Object.keys(categoryProperties[category]).map((property, index) => (
            <th
              key={index}
              scope="row"
              className="uppercase px-6 py-4  whitespace-nowrap"
            >
              {property}
            </th>
          ))}
          <th className='px-6 py-4  whitespace-nowrap w-0'>Action</th>
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody>
        {tableData.map((rowData, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <Modal
              setData={setData}
              bookData={bookData}
              setBookData={setBookData}
              action={"borrow"}
              type={"book"}
              data={rowData}/>
              <tr key={rowIndex}  className=" bg-white border-b dark:bg-slate-900 dark:border-gray-700">
                {Object.keys(categoryProperties[category]).map((property, colIndex) => (
                  <td key={colIndex} onClick={() => document.getElementById(`my_modal_${rowData.id}_borrow`).showModal()} className="px-6 py-4">
                    {(() => {
                      switch (property) {
                        case 'imageUrl':
                          return rowData[property] ? 
                            <img 
                              className="w-[50px] aspect-square rounded-full" 
                              onError={e => {
                                e.target.src = smileFlower} 
                              }
                              src={rowData[property]} 
                              alt="" /> : '-';
                        case 'books':
                          return rowData[property] ? rowData[property].length : '-';
                        case 'elementary':
                          return handleElementary(rowData[property]) || "error"
                        case 'student':
                          return rowData[property] ? rowData[property].name : '-';
                        default:
                          return rowData[property] ? String(rowData[property]) : '-';
                      }
                    })()}
                  </td>
                ))}
                <td className="px-6 py-4 ">
                    <Icontrigger
                      setBookData={setBookData}
                      key={rowIndex}
                      setData={setData}
                      data={rowData}
                      category={category}/>
                </td>
              </tr>
          </React.Fragment>
        ))}
      </tbody>
    );
  };
  

  return (
      tableData.length == 0 
      ?
        <h1>Data not available</h1>
      :
        <div className="relative border border-slate-700 rounded  w-full ">
          <table className="w-full text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {renderTableHeader()}
            {renderTableBody()}
          </table>
        </div>  


  );
};

export default Table;
