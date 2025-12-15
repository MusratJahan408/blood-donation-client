import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading";

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

  const updateStatus = (id, status) => {
    axios
      .patch(`http://localhost:3000/donation-requests/${id}`, { status })
      .then(() => {
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status } : r))
        );
      });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Welcome, {user?.displayName || user?.email}
      </h2>
      {requests.length === 0 && (
        <p className="text-gray-500">
          You have not created any donation request yet.
        </p>
      )}
      {requests.length > 0 && (
        <>
          <table className="table w-full border border-[#b71b1c]">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Blood</th>
                <th>Status</th>
                <th>Donor Info</th>
                <th>Actions</th>
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

                  {/* Donor Info */}
                  <td>
                    {req.status === "inprogress" ? (
                      <>
                        <p>{req.donorName}</p>
                        <p className="text-xs">{req.donorEmail}</p>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>

                  {/* Actions */}
                  <td className="space-x-1">
                    {/* VIEW */}
                    <Link
                      to={`/dashboard/donation-requests/${req._id}`}
                      className="btn btn-xs"
                    >
                      View
                    </Link>

                    {/* EDIT */}
                    <Link
                      to={`/dashboard/edit-donation-request/${req._id}`}
                      className="btn btn-xs btn-warning"
                    >
                      Edit
                    </Link>

                    {/* DELETE */}
                    <button className="btn btn-xs btn-error">Delete</button>

                    {req.status === "inprogress" && (
                      <>
                        <button
                          onClick={() => updateStatus(req._id, "done")}
                          className="btn btn-xs btn-success"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => updateStatus(req._id, "canceled")}
                          className="btn btn-xs btn-secondary"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to="/dashboard/my-donation-requests">
            <button className="btn bg-[#b71b1c] text-white mt-4">
              View My All Requests
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default DashboardHome;
