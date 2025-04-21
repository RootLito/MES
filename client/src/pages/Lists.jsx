import React from "react";
import List from "./monitoring/List";

const Lists = () => {
  return (
    <div className="flex-1">
      <div className="w-full p-10 flex flex-col">
        <div className="flex-1 bg-white rounded-lg shadow-md p-5">
          <p className="text-2xl font-bold text-center my-6 text-gray-700">
            Form Lists
          </p>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Lists;
