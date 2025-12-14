import React from 'react';

import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useLocationData from "../../hooks/useLocationData";
import axios from "axios";
import { toast } from "react-hot-toast";

const CreateDonationRequest = () => {
  const { user, loading } = useAuth();
  const { district, upazila } = useLocationData();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // Blocked users cannot create requests
  if (user?.status === "blocked") {
    return (
      <p className="text-center mt-10 text-red-500 font-bold">
        Your account is blocked. You cannot create donation requests.
      </p>
    );
  }

  const onSubmit = async (data) => {
    setSubmitting(true);

    const requestPayload = {
      requesterName: user.displayName || user.name,
      requesterEmail: user.email,
      recipientName: data.recipientName,
      recipientDistrict: data.recipientDistrict,
      recipientUpazila: data.recipientUpazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      status: "pending", // default status
    };

    try {
      await axios.post("http://localhost:3000/donation-requests", requestPayload);
      toast.success("Donation request created successfully!");
    } catch (err) {
      console.error("Donation request failed:", err);
      toast.error("Failed to create donation request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded my-10">
      <h2 className="text-2xl font-bold mb-6">Create Donation Request</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Requester Info */}
        <div>
          <label className="label">Requester Name</label>
          <input
            type="text"
            value={user.displayName || user.name}
            disabled
            className="input input-bordered w-full bg-gray-200"
          />
        </div>

        <div>
          <label className="label">Requester Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="input input-bordered w-full bg-gray-200"
          />
        </div>

        {/* Recipient Info */}
        <div>
          <label className="label">Recipient Name</label>
          <input
            type="text"
            {...register("recipientName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Recipient name"
          />
          {errors.recipientName && (
            <p className="text-red-500">Recipient name is required</p>
          )}
        </div>

        <div>
          <label className="label">Recipient District</label>
          <select
            {...register("recipientDistrict", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select district</option>
            {district.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.recipientDistrict && (
            <p className="text-red-500">Recipient district is required</p>
          )}
        </div>

        <div>
          <label className="label">Recipient Upazila</label>
          <select
            {...register("recipientUpazila", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select upazila</option>
            {upazila.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
          {errors.recipientUpazila && (
            <p className="text-red-500">Recipient upazila is required</p>
          )}
        </div>

        {/* Hospital & Address */}
        <div>
          <label className="label">Hospital Name</label>
          <input
            type="text"
            {...register("hospitalName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Hospital name"
          />
          {errors.hospitalName && (
            <p className="text-red-500">Hospital name is required</p>
          )}
        </div>

        <div>
          <label className="label">Full Address</label>
          <input
            type="text"
            {...register("fullAddress", { required: true })}
            className="input input-bordered w-full"
            placeholder="Full address"
          />
          {errors.fullAddress && (
            <p className="text-red-500">Full address is required</p>
          )}
        </div>

        {/* Blood Info */}
        <div>
          <label className="label">Blood Group</label>
          <select
            {...register("bloodGroup", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select blood group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
          {errors.bloodGroup && (
            <p className="text-red-500">Blood group is required</p>
          )}
        </div>

        {/* Donation Date & Time */}
        <div>
          <label className="label">Donation Date</label>
          <input
            type="date"
            {...register("donationDate", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.donationDate && (
            <p className="text-red-500">Donation date is required</p>
          )}
        </div>

        <div>
          <label className="label">Donation Time</label>
          <input
            type="time"
            {...register("donationTime", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.donationTime && (
            <p className="text-red-500">Donation time is required</p>
          )}
        </div>

        {/* Request Message */}
        <div>
          <label className="label">Request Message</label>
          <textarea
            {...register("requestMessage", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Explain why you need blood"
          />
          {errors.requestMessage && (
            <p className="text-red-500">Request message is required</p>
          )}
        </div>

        <button
          type="submit"
          className={`btn bg-[#b71b1c] text-white w-full mt-4 ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Request Blood"}
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
