import React, { useState } from "react";
import axios from "axios";
import useLocationData from "../hooks/useLocationData";

const Search = () => {
  const { district, upazila } = useLocationData();

  const [filters, setFilters] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectedDistrict = district.find(d => d.name === filters.district);
  const filteredUpazila = upazila.filter(u => u.district_id === selectedDistrict?.id);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearched(true);
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:3000/search-donors", {
        params: {
          bloodGroup: filters.bloodGroup,
          district: filters.district,
          upazila: filters.upazila,
        },
      });
      setDonors(res.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#b71b1c]">
        Search Blood Donors
      </h1>
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-[#b71b1c]"
      >
        {/* Blood Group */}
        <div className="form-control w-full">
          <label className="label font-bold">Blood Group</label>
          <select
            className="select select-bordered w-full"
            value={filters.bloodGroup}
            onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}
            required
          >
            <option value="">Select Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        {/* District */}
        <div className="form-control w-full">
          <label className="label font-bold">District</label>
          <select
            className="select select-bordered w-full"
            value={filters.district}
            onChange={(e) => setFilters({ ...filters, district: e.target.value, upazila: "" })}
            required
          >
            <option value="">Select District</option>
            {district.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div className="form-control w-full">
          <label className="label font-bold">Upazila</label>
          <select
            className="select select-bordered w-full"
            value={filters.upazila}
            onChange={(e) => setFilters({ ...filters, upazila: e.target.value })}
            disabled={!filters.district}
            required
          >
            <option value="">Select Upazila</option>
            {filteredUpazila.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>
        <div className="form-control w-full mt-auto">
          <button className="btn bg-[#b71b1c] hover:bg-black text-white w-full border-none">
            {loading ? "Searching..." : "Search Donor"}
          </button>
        </div>
      </form>
      <div className="mt-16">
        {!searched && (
          <div className="text-center p-10 bg-gray-50 rounded-lg border-2 border-dashed">
            <p className="text-xl text-gray-500">Fill the form and click search to see available donors.</p>
          </div>
        )}

        {loading && <div className="text-center text-red-600 font-bold">Loading Donors...</div>}

        {searched && !loading && donors.length === 0 && (
          <div className="alert alert-error shadow-lg max-w-md mx-auto">
            <span>No donors found with these criteria.</span>
          </div>
        )}

        {donors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {donors.map((donor) => (
              <div key={donor._id} className="card bg-white shadow-xl border-l-4 border-[#b71b1c] p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{donor.name}</h3>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">
                    {donor.bloodGroup}
                  </span>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p><strong>District:</strong> {donor.district}</p>
                  <p><strong>Upazila:</strong> {donor.upazila}</p>
                  <p><strong>Email:</strong> {donor.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;