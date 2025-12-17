import React from 'react';

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";
import useLocationData from "../../hooks/useLocationData";
import { toast } from "react-hot-toast";
import Loading from '../../Components/Loading';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router';

const EditDonationRequest = () => {
  const {user} = useAuth()
  const { id } = useParams();
  const navigate = useNavigate();
  const { district, upazila } = useLocationData();
  const [loading, setLoading] = useState(true);
  const [filteredUpazila, setFilteredUpazila] = useState([]);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const selectedDistrict = watch("recipientDistrict");


  useEffect(() => {
    axios.get(`http://localhost:3000/donation-requests/${id}`)
      .then((res) => {
        const data = res.data;
        Object.keys(data).forEach(key => setValue(key, data[key]));
        setLoading(false);
      });
  }, [id, setValue]);


  useEffect(() => {
    if (selectedDistrict) {
      const districtObj = district.find((d) => d.name === selectedDistrict);
      const filtered = upazila.filter((u) => u.district_id === districtObj?.id);
      setFilteredUpazila(filtered);
    }
  }, [selectedDistrict, district, upazila]);

  const onSubmit = async (data) => {
    try {
      await axios.patch(`http://localhost:3000/donation-requests/${id}`, data);
      toast.success("Request updated successfully!");
      navigate("/dashboard/my-donation-requests");
    } catch (err) {
      toast.error("Failed to update");
    }
  };
  if (user?.role === "volunteer") {
    return <Navigate to="/dashboard" replace />;
}

  if (loading) {
    return <Loading></Loading>
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border border-[#b71b1c] bg-[#fff9f9] shadow mt-10 rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Donation Request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Recipient Name */}
        <div className="form-control">
          <label className="label">Recipient Name</label>
          <input {...register("recipientName", { required: true })} className="input input-bordered border-[#b71b1c]" />
        </div>

        {/* Blood Group */}
        <div className="form-control">
          <label className="label">Blood Group</label>
          <select {...register("bloodGroup", { required: true })} className="select select-bordered border-[#b71b1c]">
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        {/* District */}
        <div className="form-control">
          <label className="label">Recipient District</label>
          <select {...register("recipientDistrict", { required: true })} className="select select-bordered border-[#b71b1c]">
            {district.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </div>

        {/* Upazila */}
        <div className="form-control">
          <label className="label">Recipient Upazila</label>
          <select {...register("recipientUpazila", { required: true })} className="select select-bordered border-[#b71b1c]">
            {filteredUpazila.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
          </select>
        </div>

        {/* Hospital */}
        <div className="form-control">
          <label className="label">Hospital Name</label>
          <input {...register("hospitalName", { required: true })} className="input input-bordered border-[#b71b1c]" />
        </div>

        {/* Address */}
        <div className="form-control">
          <label className="label">Full Address</label>
          <input {...register("fullAddress", { required: true })} className="input input-bordered border-[#b71b1c]" />
        </div>

        {/* Date */}
        <div className="form-control">
          <label className="label">Donation Date</label>
          <input type="date" {...register("donationDate", { required: true })} className="input input-bordered border-[#b71b1c]" />
        </div>

        {/* Time */}
        <div className="form-control">
          <label className="label">Donation Time</label>
          <input type="time" {...register("donationTime", { required: true })} className="input input-bordered border-[#b71b1c]" />
        </div>

        {/* Message */}
        <div className="form-control md:col-span-2">
          <label className="label">Request Message</label>
          <textarea {...register("requestMessage", { required: true })} className="textarea textarea-bordered border-[#b71b1c]" />
        </div>

        <button className="btn bg-[#b71b1c] text-white w-full md:col-span-2">Update Donation Request</button>
      </form>
    </div>
  );
};

export default EditDonationRequest;