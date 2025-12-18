import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const AllDonationRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10; 

  const fetchRequests = () => {
    let url = `http://localhost:3000/admin/donation-requests?status=${filter}&page=${currentPage}&limit=${itemsPerPage}`;

    axios
      .get(url)
      .then((res) => {
        setRequests(res.data.requests || []);
        setTotalCount(res.data.total || 0);
      })
      .catch((err) => console.error("Error fetching data:", err));
  };

  useEffect(() => {
    fetchRequests();
  }, [filter, currentPage]);

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

  // মোট পেজ সংখ্যা হিসাব করা
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Blood Donation Requests</h2>
      
      <div className="flex justify-between items-center mb-4">
        <select
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="select border-[#b71b1c]"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
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
            {requests.length > 0 ? (
              requests.map((req) => (
                <tr key={req._id}>
                  <td>
                    {req.recipientName} ({req.bloodGroup})
                  </td>
                  <td>
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td className="capitalize">
                    <span className={`badge badge-outline ${req.status === 'pending' ? 'badge-warning' : 'badge-info'}`}>
                      {req.status}
                    </span>
                    {req.status === "inprogress" && (
                      <div className="flex gap-1 mt-1">
                        <button
                          onClick={() => handleStatusUpdate(req._id, "done")}
                          className="btn btn-xs btn-success"
                        >Done</button>
                        <button
                          onClick={() => handleStatusUpdate(req._id, "canceled")}
                          className="btn btn-xs btn-error"
                        >Cancel</button>
                      </div>
                    )}
                  </td>
                  <td className="flex gap-2">
                    <Link
                      to={`/dashboard/donation-requests/${req._id}`}
                      className="btn btn-xs"
                    >View</Link>
                    {user?.role === "admin" && (
                      <>
                        <Link
                          to={`/dashboard/edit-donation-request/${req._id}`}
                          className="btn btn-xs btn-warning"
                        >Edit</Link>
                        <button
                          onClick={() => handleDelete(req._id)}
                          className="btn btn-xs bg-red-600 text-white"
                        >Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="text-center py-4">No requests found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="btn btn-sm btn-outline"
          >Prev</button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm ${currentPage === i + 1 ? "bg-[#b71b1c] text-white" : "btn-outline"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="btn btn-sm btn-outline"
          >Next</button>
        </div>
      )}
    </div>
  );
};

export default AllDonationRequests;