import React from "react";
import Survey from "./monitoring/Survey";
import List from "./monitoring/List";

const Monitoring = () => {
  return (
    <div className="flex-1 p-10 ">

      <div className="tabs tabs-lift">
        <input
          type="radio"
          name="my_tabs_3"
          className="tab font-bold w-25 text-gray-700"
          aria-label="Form"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <Survey />
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          className="tab font-bold w-25 text-gray-700"
          aria-label="List"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <List />
        </div>

        
      </div>
    </div>
  );
};

export default Monitoring;
