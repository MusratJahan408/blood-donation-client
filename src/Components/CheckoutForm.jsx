import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState} from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const CheckoutForm = ({ closeModal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!stripe || !elements || amount <= 0) return;

        setLoading(true);
        setError('');

        const card = elements.getElement(CardElement);
        if (card == null) {
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post('http://localhost:3000/create-payment-intent', 
                { price: amount },
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                }
            );
            
            const clientSecret = data.clientSecret;

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'Anonymous',
                        email: user?.email || 'unknown',
                    },
                }
            });

            if (confirmError) {
                setError(confirmError.message);
                setLoading(false);
            } else if (paymentIntent.status === "succeeded") {
                const payment = {
                    name: user?.displayName,
                    email: user?.email,
                    amount: parseFloat(amount),
                    transactionId: paymentIntent.id,
                    date: new Date(),
                };
                
                const res = await axios.post('http://localhost:3000/fundings', payment, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                });

                if (res.data.insertedId) {
                    toast.success("Thank you for your donation!");
                    closeModal();
                    window.location.reload(); 
                }
            }
        } catch (err) {
            setError("Payment failed. Please try again.");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="label font-semibold">Amount ($)</label>
                <input 
                    type="number" 
                    required
                    placeholder="Enter amount" 
                    className="input input-bordered w-full focus:border-red-500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            
            <div className="border p-4 rounded-lg bg-gray-50">
                <CardElement options={{
                    style: { 
                        base: { 
                            fontSize: '16px', 
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        } 
                    },
                }} />
            </div>

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            
            <button 
                type="submit" 
                disabled={!stripe || !amount || loading}
                className={`btn btn-block text-white border-none ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
            >
                {loading ? "Processing..." : `Confirm Payment $${amount || ''}`}
            </button>
        </form>
    );
};

export default CheckoutForm;