import React from 'react';
import { Link, NavLink } from "react-router";
import logoImg from "../../assets/Logo.png";
import useAuth from '../../hooks/useAuth';


const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role; 

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 fixed h-full">
        <Link to="/" className="flex justify-center">
          <img className="w-32 my-6" src={logoImg} alt="Logo" />
        </Link>

        <h2 className="text-2xl font-bold mb-6 text-center border-b border-gray-700 pb-2">
          {role?.toUpperCase()} Dashboard
        </h2>

        <ul className="space-y-2">

          <li>
            <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "text-red-500 font-bold" : "hover:text-red-400"}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "text-red-500 font-bold" : "hover:text-red-400"}>
              Profile
            </NavLink>
          </li>
          {role === "donor" && (
            <>
              <li>
                <NavLink to="/dashboard/create-donation-request">
                  Create Donation Request
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-donation-requests">
                  My Donation Requests
                </NavLink>
              </li>
            </>
          )}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/all-users">
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-blood-donation-request">
                  All Blood Donation Requests
                </NavLink>
              </li>
            </>
          )}

          {role === "volunteer" && (
            <li>
              <NavLink to="/dashboard/all-blood-donation-request">
                All Blood Donation Requests
              </NavLink>
            </li>
          )}
        </ul>
        <div className="absolute bottom-5 left-4">
           <Link to="/" className="btn btn-sm btn-outline btn-error">Back to Home</Link>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;