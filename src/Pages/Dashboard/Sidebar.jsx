import React from 'react';
import { Link, Outlet } from 'react-router';
import logoImg from '../../assets/Logo.png'

const Sidebar = () => {
    return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
         <Link to="/" className="btn btn-ghost text-xl">
                  <img className="w-40 my-20" src={logoImg} alt="Logo" />
                </Link>
        <h2 className="text-2xl font-bold my-6">Dashboard</h2>
        <ul className="space-y-2">
          <li><Link to="/dashboard" className="hover:text-red-500">Home</Link></li>
          <li><Link to="/dashboard/profile" className="hover:text-red-500">Profile</Link></li>
          <li><Link to="/dashboard/create-donation-request" className="hover:text-red-500">Create Request</Link></li>
          <li><Link to="/dashboard/my-donation-requests" className="hover:text-red-500">My Requests</Link></li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;