import React from 'react';

import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Loading from "../../Components/Loading";

const Profile = () => {
  const { user, setUser, loading, updateUserProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!loading && user?.email) {
      axios
        .get(`http://localhost:3000/users/${user.email}`)
        .then((res) => {
          setProfile(res.data);
          setFormData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.patch(
        `http://localhost:3000/users/${user.email}`,
        formData
      );

      if (res.data.modifiedCount > 0) {

        setProfile({ ...profile, ...formData });

        await updateUserProfile({
          displayName: formData.name,
          photoURL: formData.avatar
        });

        setUser({ ...user, displayName: formData.name, photoURL: formData.avatar });

        setEdit(false);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading || !profile) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto bg-[#fff9f9] shadow p-6 rounded mt-40">
      <div className="flex flex-col items-center mb-6">
        <img
          src={profile.avatar || "https://i.ibb.co/2kRrR7N/user.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-0 p-1 bg-[#b71b1c]"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Profile</h2>

        {!edit ? (
          <button
            onClick={() => setEdit(true)}
            className="btn bg-[#b71b1c] text-white"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="btn bg-[#b71b1c] text-white"
          >
            Save
          </button>
        )}
      </div>

      <form className="space-y-3">
        <input
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          disabled={!edit}
          className="input input-bordered border-[#b71b1c] w-full"
          placeholder="Name"
        />
        <input
          name="avatar"
          value={formData.avatar || ""}
          onChange={handleChange}
          disabled={!edit}
          className="input input-bordered border-[#b71b1c] w-full"
          placeholder="Profile Image URL"
        />
        <input
          value={profile.email}
          disabled
          className="input input-bordered border-[#b71b1c] w-full bg-gray-200"
          placeholder="Email"
        />
        <input
          name="district"
          value={formData.district || ""}
          onChange={handleChange}
          disabled={!edit}
          className="input input-bordered border-[#b71b1c] w-full"
          placeholder="District"
        />
        <input
          name="upazila"
          value={formData.upazila || ""}
          onChange={handleChange}
          disabled={!edit}
          className="input input-bordered border-[#b71b1c] w-full"
          placeholder="Upazila"
        />
        <input
          name="bloodGroup"
          value={formData.bloodGroup || ""}
          onChange={handleChange}
          disabled={!edit}
          className="input input-bordered border-[#b71b1c] w-full"
          placeholder="Blood Group"
        />
      </form>
    </div>
  );
};

export default Profile;
