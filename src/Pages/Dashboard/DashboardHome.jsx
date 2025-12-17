import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading";
import Swal from "sweetalert2";
import {
  FaUsers,
  FaDonate,
  FaHandHoldingHeart,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

const DashboardHome = () => {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!loading && user?.email) {
      axios
        .get(
          `http://localhost:3000/donation-requests/recent?email=${user.email}`
        )
        .then((res) => setRequests(res.data))
        .catch((err) => console.error("Dashboard fetch error:", err));

      if (user.role === "admin" || user.role === "volunteer") {
        axios
          .get("http://localhost:3000/admin-stats")
          .then((res) => setStats(res.data))
          .catch((err) => console.error("Admin stats fetch error:", err));
      }
    }
  }, [loading, user]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/donation-requests/status/${id}`,
        { status: newStatus }
      );
      if (res.data.modifiedCount > 0) {
        setRequests(
          requests.map((req) =>
            req._id === id ? { ...req, status: newStatus } : req
          )
        );
        Swal.fire("Success", `Status marked as ${newStatus}`, "success");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b71b1c",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `http://localhost:3000/donation-requests/${id}`
        );
        if (res.data.deletedCount > 0) {
          setRequests(requests.filter((req) => req._id !== id));
          Swal.fire("Deleted!", "Request has been deleted.", "success");
        }
      }
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Welcome,{" "}
        <span className="text-[#b71b1c]">
          {user?.displayName || user?.name}
        </span>
      </h2>
      {(user.role === "admin" || user.role === "volunteer") && stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="flex items-center p-6 bg-white border-l-4 border-blue-500 shadow-md rounded-lg">
            <FaUsers className="text-4xl text-blue-500 mr-4" />
            <div>
              <p className="text-gray-500 font-semibold">Total Users</p>
              <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
            </div>
          </div>
          <div className="flex items-center p-6 bg-white border-l-4 border-green-500 shadow-md rounded-lg">
            <FaDonate className="text-4xl text-green-500 mr-4" />
            <div>
              <p className="text-gray-500 font-semibold">Total Funding</p>
              <h3 className="text-2xl font-bold">${stats.totalFunding}</h3>
            </div>
          </div>
          <div className="flex items-center p-6 bg-white border-l-4 border-red-500 shadow-md rounded-lg">
            <FaHandHoldingHeart className="text-4xl text-red-500 mr-4" />
            <div>
              <p className="text-gray-500 font-semibold">Total Requests</p>
              <h3 className="text-2xl font-bold">
                {stats.totalDonationRequests}
              </h3>
            </div>
          </div>
        </div>
      )}
      {user.role === "donor" && requests.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <h3 className="p-4 font-bold text-xl border-b">
            Recent Donation Requests
          </h3>
          <table className="table w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>Recipient</th>
                <th>Location</th>
                <th>Date/Time</th>
                <th>Status</th>
                <th>Donor Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>
                    {req.recipientName} <br />
                    <span className="badge badge-ghost badge-sm">
                      {req.bloodGroup}
                    </span>
                  </td>
                  <td>
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td>
                    {req.donationDate} at {req.donationTime}
                  </td>
                  <td>
                    <span
                      className={`capitalize font-bold ${
                        req.status === "inprogress" ? "text-blue-600" : ""
                      }`}
                    >
                      {req.status}
                    </span>
                    {req.status === "inprogress" && (
                      <div className="flex gap-1 mt-1">
                        <button
                          onClick={() => handleStatusUpdate(req._id, "done")}
                          className="btn btn-xs btn-success"
                        >
                          Done
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(req._id, "canceled")
                          }
                          className="btn btn-xs btn-error"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    {req.status === "inprogress" ? (
                      <div className="text-xs">
                        <p>Name: {req.donorName}</p>
                        <p>Email: {req.donorEmail}</p>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="space-x-2">
                    <Link
                      to={`/dashboard/update-donation-request/${req._id}`}
                      className="btn btn-ghost btn-xs text-blue-600"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-ghost btn-xs text-red-600"
                    >
                      <FaTrash />
                    </button>
                    <Link
                      to={`/donation-request-details/${req._id}`}
                      className="btn btn-ghost btn-xs text-green-600"
                    >
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 text-center border-t">
            <Link
              to="/dashboard/my-donation-requests"
              className="btn bg-[#b71b1c] text-white"
            >
              View My All Requests
            </Link>
          </div>
        </div>
      )}
      {user.role === "donor" && requests.length === 0 && (
        <div className="text-center p-10 bg-gray-50 rounded-lg">
          <p>You have not made any donation requests yet.</p>
          <Link
            to="/dashboard/create-donation-request"
            className="btn btn-link"
          >
            Create your first request
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
