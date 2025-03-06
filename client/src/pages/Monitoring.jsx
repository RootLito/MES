import React from "react";
import Survey from "./monitoring/Survey";
import List from "./monitoring/List";

const Monitoring = () => {
  return (
    <div className="flex-1 p-10 ">
      <div className="w-full h-full p-10 bg-base-200 rounded-md shadow-sm flex flex-col">
        <h2 className="font-bold text-2xl mb-10">
          Field Monitoring and Evaluation
        </h2>

        <div className="tabs tabs-box">
          <input
            type="radio"
            name="my_tabs_6"
            className="tab mt-2 w-40"
            aria-label="Evaluation Form"
            defaultChecked
          />
          <div className="tab-content bg-base-100 border-base-300 p-6 mt-2">
            <Survey />
          </div>

          <input
            type="radio"
            name="my_tabs_6"
            className="tab mt-2 w-40"
            aria-label="List of Forms "
          />
          <div className="tab-content bg-base-100 border-base-300 p-6 mt-2">
            <List />
          </div>

          <input
            type="radio"
            name="my_tabs_6"
            className="tab mt-2 w-40"
            aria-label="Tab 3"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6 mt-2">
            Tab content 3
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
