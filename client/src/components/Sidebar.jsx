import React from "react";
import logo from "./../assets/images/bfar.png";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdAssessment,
  MdInsertDriveFile,
  MdFolder,
} from "react-icons/md";

const Sidebar = () => {
  return (
    <>
      <div className="flex flex-col w-[300px] h-screen bg-white border-r-1 border-gray-100 p-5 sticky top-0 left-0">
        <div className="flex flex-col justify-center items-center my-4">
          <img src={logo} alt="BFAR logo" className="w-30" />
          <h1 className="font-black text-2xl text-blue-950">BFAR XI</h1>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "btn btn-active bg-blue-950 text-white border-0 justify-start"
                : "btn hover:bg-blue-950 text-blue-950 hover:text-white border-0 justify-start"
            }
          >
            <MdDashboard className="ml-5" size={18}/>
            Dashboard
          </NavLink>
          <NavLink
            to="/monitoring"
            className={({ isActive }) =>
              isActive
                ? "btn btn-active bg-blue-950 text-white border-0 justify-start"
                : "btn hover:bg-blue-950 text-blue-950 hover:text-white border-0 justify-start"
            }
          >
            <MdInsertDriveFile className="ml-5" size={18}/> Monitoring
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive
                ? "btn btn-active bg-blue-950 text-white border-0 justify-start"
                : "btn hover:bg-blue-950 text-blue-950 hover:text-white border-0 justify-start"
            }
          >
            <MdAssessment className="ml-5" size={18}/>
            Analytics
          </NavLink>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive
                ? "btn btn-active bg-blue-950 text-white border-0 justify-start"
                : "btn hover:bg-blue-950 text-blue-950 hover:text-white border-0 justify-start"
            }
          >
            <MdFolder className="ml-5" size={18}/>
            Report
          </NavLink>
        </div>
        <button className="btn btn-error text-red-200 hover:text-white mt-auto">
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
