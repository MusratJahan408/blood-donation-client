import React from "react";
import { useNavigate } from "react-router";
import { AlertTriangle, Home, ArrowLeft, Droplets } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg text-center border border-red-100 relative overflow-hidden">

        <div className="absolute -top-10 -right-10 opacity-5">
           <Droplets size={200} className="text-red-600" />
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-red-100 p-5 rounded-full border-2 border-red-200">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-black text-slate-800 tracking-tight">
          Oops! <span className="text-red-600">Something Bled</span>
        </h1>
        
        <div className="w-16 h-1.5 bg-red-600 mx-auto my-4 rounded-full"></div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-[#b71b1c] text-white font-bold rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 hover:shadow-none transition-all duration-300 transform hover:-translate-y-1"
          >
            <Home size={18} />
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:border-red-300 hover:text-red-600 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-100">
          <code className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
            Error Status: Connection_Failure_Check_API_URL
          </code>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;