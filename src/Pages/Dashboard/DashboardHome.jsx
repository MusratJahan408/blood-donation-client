import React from 'react';

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import useAuth from '../../hooks/useAuth';

const DashboardHome = () => {
  const { user, loading } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!loading && user?.email) {
      axios
        .get(
          `http://localhost:3000/donation-requests/recent?email=${user.email}`
        )
        .then((res) => {
          setRequests(res.data);
        })
        .catch((err) => {
          console.error("Dashboard fetch error:", err);
        });
    }
  }, [loading, user?.email]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      {/* Welcome */}
      <h2 className="text-2xl font-bold mb-6">
        Welcome, {user?.displayName || user?.email}
      </h2>

      {/* যদি request না থাকে */}
      {requests.length === 0 && (
        <p className="text-gray-500">
          You have not created any donation request yet.
        </p>
      )}

      {/* Table */}
      {requests.length > 0 && (
        <>
          <table className="table w-full border">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Blood</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.recipientName}</td>
                  <td>
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td>{req.donationDate}</td>
                  <td>{req.donationTime}</td>
                  <td>{req.bloodGroup}</td>
                  <td className="capitalize">{req.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to="/dashboard/my-donation-requests">
            <button className="btn btn-primary mt-4">
              View My All Requests
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default DashboardHome;
