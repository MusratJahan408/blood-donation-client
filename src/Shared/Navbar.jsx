import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleSignOut = () => {
    logOut().catch((error) => .log(error));
  };

  const links = (
    <>
    <li><NavLink to="/donation-requests">Donation Requests</NavLink></li>
    {user && <li><NavLink to="/funding">Funding</NavLink></li>}
  </>
  );

  return (
    <div className="navbar shadow-sm p-5 container mx-auto">

      <div className="navbar-start">

        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 text-white font-bold rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-xl">
          <img className="w-40" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white font-bold">{links}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="User Avatar"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-[#b71b1c] text-white rounded-box w-40"
            >
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleSignOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn bg-[#b71b1c] border-0 text-white">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
