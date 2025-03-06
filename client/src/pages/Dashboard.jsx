import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex gap-10 p-10">
      <div className="flex flex-1 flex-col gap-10">
        <div className="grid grid-cols-3  gap-10 flex-1">
          <div className="card card-border bg-blue-950">
            <div className="card-body">
              <h2 className="card-title text-base-200 text-4xl mb-auto">
                Highlights
              </h2>

              <div className="cards-action text-center mb-auto">
                <h1 className="text-8xl font-black text-blue-400">86%</h1>
                <p className="text-base-200 mt-4">Eighty-six percent of all <br /> respondents are very satisfied.</p>
              </div>
            </div>
          </div>

          <div className="card card-border bg-base-100 h-80">
            <div className="card-body">
              <h2 className="card-title text-gray-500">Total</h2>
              <p className="font-black text-4xl text-blue-950">Locations</p>
              <div className="card-actions justify-end">
                <h1 className="text-8xl font-black">132</h1>
              </div>
            </div>
          </div>

          <div className="card card-border bg-base-100 h-80">
            <div className="card-body">
              <h2 className="card-title text-gray-500">Total</h2>
              <p className="font-black text-4xl text-blue-950">Respondents</p>
              <div className="card-actions justify-end">
                <h1 className="text-8xl font-black">791</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5 bg-gray-50 flex-1 rounded-md shadow-sm"></div>
      </div>

      <div className="w-[500px] flex flex-col bg-gray-50 rounded-md shadow-sm"></div>
    </div>
  );
};

export default Dashboard;
