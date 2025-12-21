import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const FundingPage = () => {
    const [fundings, setFundings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const fetchFundings = async () => {
            try {
                const res = await axios.get('https://your-server-url.com/fundings', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                });
                setFundings(res.data);
            } catch (error) {
                console.error("Error fetching fundings:", error);
            }
        };
        fetchFundings();
    }, []);

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-red-600 pl-3">Funding Records</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="btn bg-red-600 hover:bg-red-700 text-white font-semibold px-6 rounded-full shadow-lg transition-all"
                >
                    + Give Fund
                </button>
            </div>

            {/* Funding Table */}
            <div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100">
                <table className="table w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
                        <tr>
                            <th className="py-4 px-6">#</th>
                            <th>Donor Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {fundings.map((fund, index) => (
                            <tr key={fund._id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-6">{index + 1}</td>
                                <td className="font-medium text-gray-700">{fund.name}</td>
                                <td className="text-green-600 font-bold">${fund.amount}</td>
                                <td className="text-gray-500">{new Date(fund.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Payment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
                        <button 
                            onClick={() => setIsModalOpen(false)} 
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
                        >✕</button>
                        
                        <h3 className="text-2xl font-bold text-center mb-2">Donate Funds</h3>
                        <p className="text-gray-500 text-center mb-6 text-sm">Help us reach more people in need.</p>
                        
                        <Elements stripe={stripePromise}>
                            <CheckoutForm closeModal={() => {
                                setIsModalOpen(false);
                                window.location.reload(); // ডাটা রিফ্রেশ করতে
                            }} />
                        </Elements>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FundingPage;