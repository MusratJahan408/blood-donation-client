import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-hot-toast";

const MyDonationRequests = () => {
  const { user, loading } = useAuth();
  const [requests, setRequests] = useState([]); // array হবে
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loadingRequests, setLoadingRequests] = useState(false);

  useEffect(() => {
    if (!loading && user?.email) {
      fetchRequests();
    }
  }, [user, loading, filter]);

  const fetchRequests = async () => {
    setLoadingRequests(true);
    try {
      let url = `http://localhost:3000/donation-requests?requesterEmail=${user.email}`;
      if (filter !== "all") {
        url += `&status=${filter}`;
      }

      const res = await axios.get(url);

      // এখানে শুধু array নিলাম
      setRequests(res.data.requests || []); 
    } catch (err) {
      console.error("Failed to fetch requests:", err);
      toast.error("Failed to fetch donation requests");
    } finally {
      setLoadingRequests(false);
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>

      {/* Filter */}
      <div className="mb-4 flex gap-2 items-center">
        <span>Filter by status:</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered w-48"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Recipient</th>
              <th>Blood Group</th>
              <th>Hospital</th>
              <th>Donation Date</th>
              <th>Donation Time</th>
              <th>Status</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {loadingRequests ? (
              <tr>
                <td colSpan="8" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : currentRequests.length > 0 ? (
              currentRequests.map((req, index) => (
                <tr key={req._id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{req.recipientName}</td>
                  <td>{req.bloodGroup}</td>
                  <td>{req.hospitalName}</td>
                  <td>{req.donationDate}</td>
                  <td>{req.donationTime}</td>
                  <td>{req.status}</td>
                  <td>{req.requestMessage}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No donation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`btn btn-sm ${
                currentPage === num ? "btn-primary" : "btn-outline"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
