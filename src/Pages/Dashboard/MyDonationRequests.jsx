import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

const MyDonationRequests = () => {
  const { user, loading } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAllData = async () => {
      if (!user?.email) return;
      try {
        let url = `http://localhost:3000/donation-requests?requesterEmail=${user.email}`;
        if (filter !== "all") {
          url += `&status=${filter}`;
        }
        const res = await axios.get(url);
        setRequests(res.data.requests || res.data || []);
      } catch (err) {
        toast.error("Failed to load requests");
      }
    };

    if (!loading) {
      fetchAllData();
    }
  }, [user?.email, loading, filter]);


  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axios.patch(`http://localhost:3000/donation-requests/status/${id}`, { status: newStatus });
      if (res.data.modifiedCount > 0) {
        setRequests(prev => prev.map(req => req._id === id ? { ...req, status: newStatus } : req));
        toast.success(`Marked as ${newStatus}`);
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b71b1c",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`http://localhost:3000/donation-requests/${id}`);
          if (res.data.deletedCount > 0) {
            setRequests(prev => prev.filter(req => req._id !== id));
            Swal.fire("Deleted!", "Request removed.", "success");
          }
        } catch (err) {
          toast.error("Delete failed");
        }
      }
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg border-t-4 border-[#b71b1c]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 uppercase">My Donation Requests</h2>
        
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600">Filter by:</span>
          <select 
            value={filter} 
            onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }} 
            className="select select-bordered select-sm border-[#b71b1c]"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date/Time</th>
              <th>Status</th>
              <th>Donor</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.length > 0 ? (
              currentRequests.map((req) => (
                <tr key={req._id}>
                  <td>
                    <div className="font-bold">{req.recipientName}</div>
                    <span className="badge badge-error badge-sm text-white">{req.bloodGroup}</span>
                  </td>
                  <td className="text-sm">{req.recipientDistrict}, {req.recipientUpazila}</td>
                  <td className="text-sm">{req.donationDate} <br/> {req.donationTime}</td>
                  <td>
                    <span className={`badge badge-outline font-bold ${req.status === 'pending' ? 'text-yellow-600' : 'text-blue-600'}`}>
                      {req.status}
                    </span>
                    {req.status === "inprogress" && (
                      <div className="flex gap-1 mt-2">
                        <button onClick={() => handleStatusUpdate(req._id, "done")} className="btn btn-xs bg-green-600 text-white border-none">Done</button>
                        <button onClick={() => handleStatusUpdate(req._id, "canceled")} className="btn btn-xs bg-red-600 text-white border-none">Cancel</button>
                      </div>
                    )}
                  </td>
                  <td className="text-xs italic">
                    {req.status === "inprogress" ? `${req.donorName} (${req.donorEmail})` : "Not Assigned"}
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center gap-3">
                      <Link to={`/dashboard/update-donation-request/${req._id}`} className="text-blue-500"><FaEdit size={18} /></Link>
                      <button onClick={() => handleDelete(req._id)} className="text-red-500"><FaTrash size={16} /></button>
                      <Link to={`/donation-request-details/${req._id}`} className="text-green-500"><FaEye size={18} /></Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center py-10">No requests found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`btn btn-sm ${currentPage === i + 1 ? "bg-[#b71b1c] text-white" : "btn-outline"}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;