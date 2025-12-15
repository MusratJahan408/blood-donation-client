import React from 'react';

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/donation-requests/${id}`)
      .then((res) => setFormData(res.data));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(`http://localhost:3000/donation-requests/${id}`, formData)
      .then(() => {
        navigate("/dashboard");
      });
  };

  if (!formData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 border border-[#b71b1c] bg-[#fff9f9]  shadow mt-5 md:mt-60 rounded">
      <h2 className="text-xl font-bold mb-4">Edit Donation Request</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          className="input input-bordered border-[#b71b1c] w-full"
          placeholder="Recipient Name"
        />

        <input
          name="donationDate"
          type="date"
          value={formData.donationDate}
          onChange={handleChange}
          className="input input-bordered border-[#b71b1c] w-full"
        />

        <input
          name="donationTime"
          type="time"
          value={formData.donationTime}
          onChange={handleChange}
          className="input input-bordered border-[#b71b1c] w-full"
        />

        <button className="btn bg-[#b71b1c] text-white w-full">
          Update Donation Request
        </button>
      </form>
    </div>
  );
};

export default EditDonationRequest;
