import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const inputStyle = "input w-full border-[#b71b1c] focus:border-[#b71b1c]";
  const buttonStyle =
    "btn mt-4 bg-[#b71b1c] hover:bg-[#8f1418] text-white w-full";

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="bg-[#fff9f9] py-10 md:py-0 min-h-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold mb-10">Login Your Account</h1>

      <div className="card bg-base-100 w-full max-w-7xl shadow-2xl">
        <div className="card-body">

          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">

              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className={inputStyle}
                placeholder="Email"
              />

              {errors.email && (
                <p className="text-red-500">Email is required</p>
              )}

              {/* Password */}
              <div className="relative mt-4">
                <label className="label mt-3">Password</label>
              <input
                type={show ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                className={inputStyle}
                placeholder="Password"
              />
              <p onClick={() => setShow(!show)}className="absolute top-11 left-54 md:left-96 cursor-pointer">
                                  {show ? <FaEye /> : <FaEyeSlash />}
                                </p>
              </div>

              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}

              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be at least 6 characters
                </p>
              )}

              {/* Forgot Password */}
              <div className="mt-2">
                <Link className="link link-hover text-sm">
                  Forgot password?
                </Link>
              </div>

              {/* Login button */}
              <button className={buttonStyle}>
                Login
              </button>
            </fieldset>
          </form>

          {/* Register link */}
          <p className="mt-3 text-center">
            New to Blood Donation?
            <Link
              state={location.state}
              className="text-[#b71b1c] underline font-bold ml-1"
              to="/register"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
