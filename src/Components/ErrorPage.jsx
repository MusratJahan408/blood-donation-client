import React from "react";
import { useNavigate } from "react-router";


const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg text-center">

        {/* Blood Icon */}
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 2.25C12 2.25 6 8.25 6 13.5a6 6 0 0012 0c0-5.25-6-11.25-6-11.25z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-red-600">Error Occurred</h1>

        <p className="text-slate-600 mt-2 leading-relaxed">
          Something went wrong while loading this page. <br />  
          Please make sure your server is working properly in production and is
          not throwing <strong>CORS</strong>, <strong>404</strong>, or <strong>504</strong> errors.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-100"
          >
            Go Back
          </button>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Tip: Check your production server logs & API URL.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
