import React from 'react'

const Dashboard = () => {
  return (
    <div className="w-full h-full flex gap-5 p-5">
        <div className="flex flex-1 flex-col gap-10 p-5">
            <div className="grid grid-cols-3  gap-10 flex-1"> 
                <div className="flex bg-blue-950 rounded-md">

                </div>
                <div className="flex h-70 bg-gray-300 rounded-md">

                </div>
                <div className="flex h-70 bg-gray-300 rounded-md">

                </div>
            </div>

            <div className="flex gap-5 bg-gray-50 flex-1 rounded-md shadow-sm"> 

            </div>
        </div>

        <div className="w-[500px] flex flex-col bg-gray-50 rounded-md shadow-sm">

        </div>
    </div>
  )
}

export default Dashboard