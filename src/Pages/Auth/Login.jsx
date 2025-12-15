import React from 'react';

import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => navigate("/dashboard"))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="bg-[#fff9f9] min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center">Login Your Account</h1>

        <div className="card bg-base-100 shadow-xl p-6">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              className="input input-bordered w-full border-[#b71b1c]"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                className="input input-bordered w-full border-[#b71b1c]"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <button className="btn w-full bg-[#b71b1c] text-white mt-3">Login</button>
          </form>

          <p className="mt-4 text-center">
            New to Blood Donation?
            <Link to="/register" className="text-[#b71b1c] font-bold ml-1">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
