import React, { useState } from "react";
import axios from "axios";
import useLocationData from "../hooks/useLocationData";

const Search = () => {
  const { district, upazila } = useLocationData();

  const [filters, setFilters] = useState({
    bloodGroup: "",
    districtId: "",
    upazila: "",
  });

  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ filter upazila based on selected districtId
  const filteredUpazila = upazila.filter(
    (u) => u.district_id === filters.districtId
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearched(true);
    setLoading(true);

    try {
      const res = await axios.get("/donors", {
        params: {
          bloodGroup: filters.bloodGroup,
          districtId: filters.districtId,
          upazila: filters.upazila,
        },
      });
      setDonors(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-10 text-red-600">
        Find Blood Donors
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-base-100 p-6 rounded-xl shadow-lg"
      >
        {/* Blood Group */}
        <select
          className="select select-bordered w-full"
          value={filters.bloodGroup}
          onChange={(e) =>
            setFilters({ ...filters, bloodGroup: e.target.value })
          }
          required
        >
          <option value="">Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        {/* District */}
        <select
          className="select select-bordered w-full"
          value={filters.districtId}
          onChange={(e) =>
            setFilters({
              ...filters,
              districtId: e.target.value,
              upazila: "",
            })
          }
          required
        >
          <option value="">District</option>
          {district.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Upazila */}
        <select
          className="select select-bordered w-full"
          value={filters.upazila}
          onChange={(e) =>
            setFilters({ ...filters, upazila: e.target.value })
          }
          disabled={!filters.districtId}
          required
        >
          <option value="">Upazila</option>
          {filteredUpazila.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Button */}
        <button className="btn btn-error w-full text-white">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Result Section */}
      <div className="mt-12">
        {!searched && (
          <p className="text-center text-gray-400">
            Please search donors using the form above
          </p>
        )}

        {searched && !loading && donors.length === 0 && (
          <p className="text-center text-gray-500">No donors found</p>
        )}

        {donors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="card bg-base-100 shadow-md hover:shadow-xl transition p-5"
              >
                <h3 className="text-xl font-semibold text-red-600 mb-2">
                  {donor.name}
                </h3>
                <p>
                  <strong>Blood Group:</strong> {donor.bloodGroup}
                </p>
                <p>
                  <strong>Location:</strong> {donor.upazila}
                </p>
                <p>
                  <strong>Phone:</strong> {donor.phone || "Available on request"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;