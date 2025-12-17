import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const AllDonationRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchRequests = () => {
    let url = `http://localhost:3000/admin/donation-requests?status=${filter}`;

    axios
      .get(url)
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  };

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:3000/donation-requests/status/${id}`,
        { status: newStatus }
      );
      fetchRequests();
      Swal.fire("Updated!", `Status is now ${newStatus}`, "success");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    if (user?.role !== "admin") return;
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/donation-requests/${id}`)
          .then(() => {
            fetchRequests();
            Swal.fire("Deleted!", "Request deleted.", "success");
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Blood Donation Requests</h2>
      <select
        onChange={(e) => setFilter(e.target.value)}
        className="select border-[#b71b1c] mb-4"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
        <option value="canceled">Canceled</option>
      </select>

      <table className="table w-full border">
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>
                {req.recipientName} ({req.bloodGroup})
              </td>
              <td>
                {req.recipientDistrict}, {req.recipientUpazila}
              </td>
              <td className="capitalize">
                {req.status}
                {req.status === "inprogress" && (
                  <div className="flex gap-1 mt-1">
                    <button
                      onClick={() => handleStatusUpdate(req._id, "done")}
                      className="btn btn-xs btn-success"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(req._id, "canceled")}
                      className="btn btn-xs btn-error"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </td>
              <td className="flex gap-2">
                <Link
                  to={`/dashboard/donation-requests/${req._id}`}
                  className="btn btn-xs"
                >
                  View
                </Link>
                {user?.role === "admin" && (
                  <>
                    <Link
                      to={`/dashboard/edit-donation-request/${req._id}`}
                      className="btn btn-xs btn-warning"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-xs bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDonationRequests;
