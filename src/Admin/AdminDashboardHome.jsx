import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { FaUsers, FaMoneyBillWave, FaHandHoldingMedical } from "react-icons/fa";

const AdminDashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunding: 0,
    totalDonationRequests: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:3000/admin-stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.displayName || user.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 shadow rounded bg-white flex items-center gap-4">
          <FaUsers size={40} className="text-[#b71b1c]" />
          <div>
            <p>Total Users</p>
            <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
          </div>
        </div>
        <div className="p-4 shadow rounded bg-white flex items-center gap-4">
          <FaMoneyBillWave size={40} className="text-[#b71b1c]" />
          <div>
            <p>Total Funding</p>
            <h2 className="text-2xl font-bold">{stats.totalFunding} ৳</h2>
          </div>
        </div>
        <div className="p-4 shadow rounded bg-white flex items-center gap-4">
          <FaHandHoldingMedical size={40} className="text-[#b71b1c]" />
          <div>
            <p>Total Donation Requests</p>
            <h2 className="text-2xl font-bold">{stats.totalDonationRequests}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
