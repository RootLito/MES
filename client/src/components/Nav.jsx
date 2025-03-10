import React, { useState } from "react";
import logo from "./../assets/images/bfar.png"
import { MdOutlineNotificationsNone, MdOutlineSettings } from "react-icons/md";
import { useLocation } from 'react-router-dom';


const Nav = () => {
  const location = useLocation();
  const path = location.pathname;
  const nav = path.split('/').pop().toUpperCase();

  return (
    <div className="navbar bg-base-100 sticky top-0 z-1 border-b-1 border-base-300 px-10 justify-between">
      <h2 className="font-black text-gray-600">BFAR XI</h2>

      <div className="">
        <div className="dropdown dropdown-end mr-2">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator text-gray-600">
              <MdOutlineNotificationsNone size={24} />
              <span className="badge badge-error badge-sm text-white indicator-item">
                8
              </span>
            </div>
          </div>

          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator text-gray-600">
              <MdOutlineSettings size={24} />
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={logo}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-42 p-2 shadow"
          >
            <li>
              <a>
                Profile
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a className="bg-error text-white">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
