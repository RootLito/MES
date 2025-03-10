import React from 'react'
import { useState } from 'react'
import { format } from 'date-fns';

const Reports = () => {
  const currentDate = new Date();
  const date = format(currentDate, 'MM/dd/yyyy');

  const [totalRes, setTotalRes] = useState(21)




  return (
    <div className="p-10">
      <div className="card bg-base-100 shadow-sm w-full">
        <div className="card-body flex flex-row p-5 items-center">
          <h2 className='font-bold text-md text-gray-700'>Total No. of Respondents as of {date}: </h2>
          <div className="badge badge-xl badge-soft badge-info font-bold">{totalRes} </div>
        </div>
      </div>
    </div>
  )
}

export default Reports