import React from "react";
import Survey from "./monitoring/Survey";
import List from "./monitoring/List";

const Monitoring = () => {
  return (
    <div className="flex-1 p-10 ">
      <div className="w-full p-10 bg-base-200 rounded-md shadow-sm flex flex-col">
        <h2 className="font-bold text-2xl mb-5 text-blue-950">
          Field Monitoring and Evaluation
        </h2>

        <div className="tabs tabs-border">
          <input type="radio" name="form_tabs" className="tab w-20" aria-label="Evaluation Form" defaultChecked />
          <div className="tab-content border-base-300 bg-base-100 p-10">
            <Survey />
          </div>

          <input type="radio" name="form_tabs" className="tab w-20" aria-label="Form Lists" />
          <div className="tab-content border-base-300 bg-base-100 p-10">
            <List />
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Monitoring;
