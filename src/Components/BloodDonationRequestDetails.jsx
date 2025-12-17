import React, { useState } from 'react';

const BloodDonationRequestDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock Data (In a real app, fetch this based on the ID from URL)
  const requestDetails = {
    recipient: "Rahim Ali",
    location: "Dhaka Medical",
    bloodGroup: "A+",
    date: "2023-12-25",
    time: "10:00 AM",
    hospital: "DMCH, Wing B",
    fullAddress: "100 Ramna, Dhaka",
    reason: "Surgery",
    status: "pending"
  };

  // Mock User (In a real app, get from Auth Context)
  const loggedInUser = { name: "John Doe", email: "john@example.com" };

  const handleConfirmDonation = () => {
    // Logic to change status from 'pending' to 'inprogress' via API
    console.log("Status updated to In Progress");
    setIsModalOpen(false);
    alert("Thank you for choosing to donate!");
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10 border">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Request Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-8">
        <div className="space-y-4">
          <p><strong>Recipient:</strong> {requestDetails.recipient}</p>
          <p><strong>Blood Group:</strong> <span className="text-red-600 font-bold">{requestDetails.bloodGroup}</span></p>
          <p><strong>Hospital:</strong> {requestDetails.hospital}</p>
          <p><strong>Address:</strong> {requestDetails.fullAddress}</p>
        </div>
        <div className="space-y-4">
          <p><strong>Date:</strong> {requestDetails.date}</p>
          <p><strong>Time:</strong> {requestDetails.time}</p>
          <p><strong>Reason:</strong> {requestDetails.reason}</p>
          <p><strong>Current Status:</strong> <span className="capitalize text-blue-600">{requestDetails.status}</span></p>
        </div>
      </div>

      <button 
        onClick={() => setIsModalOpen(true)}
        className="mt-8 bg-[#b71b1c] text-white px-8 py-3 rounded-lg font-bold  w-full md:w-auto"
      >
        Donate
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4">Confirm Donation</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Donor Name</label>
                <input 
                  type="text" 
                  value={loggedInUser.name} 
                  readOnly 
                  className="mt-1 w-full p-2 bg-gray-100 border rounded cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Donor Email</label>
                <input 
                  type="email" 
                  value={loggedInUser.email} 
                  readOnly 
                  className="mt-1 w-full p-2 bg-gray-100 border rounded cursor-not-allowed"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button 
                  type="button"
                  onClick={handleConfirmDonation}
                  className="flex-1 bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700"
                >
                  Confirm
                </button>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded font-bold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodDonationRequestDetails;