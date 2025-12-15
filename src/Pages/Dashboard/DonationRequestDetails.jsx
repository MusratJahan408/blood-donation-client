import React from 'react';

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/donation-requests/${id}`)
      .then((res) => setRequest(res.data));
  }, [id]);

  if (!request) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 border border-[#b71b1c] bg-[#fff9f9] mt-5 md:mt-60 rounded">
      <h2 className="text-2xl font-bold mb-4">Donation Request Details</h2>

      <p><strong>Recipient:</strong> {request.recipientName}</p>
      <p>
        <strong>Location:</strong> {request.recipientDistrict},{" "}
        {request.recipientUpazila}
      </p>
      <p><strong>Date:</strong> {request.donationDate}</p>
      <p><strong>Time:</strong> {request.donationTime}</p>
      <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
      <p className="capitalize">
        <strong>Status:</strong> {request.status}
      </p>

      {request.status === "inprogress" && (
        <>
          <hr className="my-3" />
          <p><strong>Donor Name:</strong> {request.donorName}</p>
          <p><strong>Donor Email:</strong> {request.donorEmail}</p>
        </>
      )}
    </div>
  );
};

export default DonationRequestDetails;
