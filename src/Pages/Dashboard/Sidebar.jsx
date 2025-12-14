import React from 'react';
import { Link, Outlet } from 'react-router';

const Sidebar = () => {
    return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-2">
          <li><Link to="/dashboard" className="hover:text-yellow-300">Home</Link></li>
          <li><Link to="/dashboard/profile" className="hover:text-yellow-300">Profile</Link></li>
          <li><Link to="/dashboard/create-donation-request" className="hover:text-yellow-300">Create Request</Link></li>
          <li><Link to="/dashboard/my-donation-requests" className="hover:text-yellow-300">My Requests</Link></li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;