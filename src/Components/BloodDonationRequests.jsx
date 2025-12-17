import React from 'react';
import { useNavigate } from 'react-router';

const BloodDonationRequests = () => {
  const navigate = useNavigate();
  const pendingRequests = [
    { id: 1, recipient: "Rahim Ali", location: "Dhaka Medical", bloodGroup: "A+", date: "2023-12-25", time: "10:00 AM" },
    { id: 2, recipient: "Karim Uddin", location: "Chittagong Hospital", bloodGroup: "O-", date: "2023-12-26", time: "02:30 PM" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Pending Donation Requests</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingRequests.map((request) => (
          <div key={request.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-5 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">{request.recipient}</h3>
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">
                {request.bloodGroup}
              </span>
            </div>
            
            <div className="space-y-2 text-gray-600 mb-6">
              <p>📍 <strong>Location:</strong> {request.location}</p>
              <p>📅 <strong>Date:</strong> {request.date}</p>
              <p>⏰ <strong>Time:</strong> {request.time}</p>
            </div>

            <button 
              onClick={() => navigate(`/donation-request-details/${request.id}`)}
              className="w-full bg-[#b71b1c] text-white py-2 rounded transition font-semibold"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodDonationRequests;