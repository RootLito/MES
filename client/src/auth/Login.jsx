import React from "react";
import { MdPerson, MdLock } from "react-icons/md";
import logo from "./../assets/images/bfar.png";

const Login = () => {
  return (
    <div className="flex-1 p-10">
      <div className="flex-1 h-full  grid place-items-center p-5">
        <form action="" className="flex flex-col gap-2 bg-white shadow-sm rounded-lg p-10">
          <div className="avatar flex w-full justify-center">
            <div className="w-24 rounded-full">
              <img src={logo} alt="BFAR logo" className="w-30" />
            </div>
          </div>
          <h1 className="text-center text-3xl font-black text-blue-950">BFAR XI</h1>
          <h2 className="font-bold text-gray-600">Field Monitoring and Evaluation System</h2>
          <h1 className="mt-6 font-bold text-2xl mb-2 text-blue-950">Login</h1>
          <label className="input">
            <MdPerson size={22} className="text-gray-600"/>
            <input type="text" className="grow" placeholder="Username" />
          </label>
          <label className="input">
            <MdLock size={22} className="text-gray-600"/>
            <input type="text" className="grow" placeholder="Username" />
          </label>
          <button className="btn btn-success text-white mt-2">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
