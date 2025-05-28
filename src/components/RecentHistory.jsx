import React, { useState } from 'react'

const RecentHistory = ({recentHistory,setSearchFromHistory,setRecentHistory}) => {

  const handleSelectedDelete = (selectedItem) =>{
    const history = recentHistory.filter((item) => item !== selectedItem);
    localStorage.setItem("history", JSON.stringify(history));
    setRecentHistory(history);
  }

    const handleDeleteHistory = () => {
      localStorage.clear();
      setRecentHistory([]);
    };
    
  return (
    <div className='ml-1 mr-1'>
        <div className="flex justify-center items-center dark:text-white text-zinc-800 sm:font-bold">
          <div className="text-sm sm:text-xl sm:m-2">Recent Search</div>
          <svg
            className="cursor-pointer  dark:bg-white bg-red-200 rounded-sm" 
            onClick={handleDeleteHistory}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            // fill="#e3e3e3"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </div>
        <ul>
          {recentHistory &&
            recentHistory.map((item, index) => (
              <div key={index} className='flex justify-between items-center py-1 dark:text-white text-zinc-800 sm:font-bold  cursor-pointer dark:hover:bg-zinc-600 hover:bg-zinc-200 dark:hover:text-zinc-100 hover:text-zinc-800'>
              <li
                
                onClick={() => setSearchFromHistory(item)}
                className="text-left text-xs pl-2 truncate overflow-hidden"
              >
                {item}
              </li>
              <button className="cursor-pointer rounded-s  dark:bg-zinc-500 bg-red-200" >
              <svg
            className=" rounded-s"
            onClick={()=>handleSelectedDelete(item)}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            // fill="#e3e3e3"
          >
             <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
          </button>
          </div>
            ))}
        </ul>
        
      </div>
  )
}

export default RecentHistory
