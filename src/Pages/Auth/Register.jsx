import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useLocationData from "../../hooks/useLocationData";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { district, upazila } = useLocationData();
  const [show, setShow] = useState(false);

  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const password = useWatch({ control, name: "password" });

 
  const handleRegistration = async (data) => {
    try {

      const result = await registerUser(data.email, data.password);
      const loggedUser = result.user;

  
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
        formData
      );

      const avatar = imgRes.data.data.url;


      await updateUserProfile({
        displayName: data.name,
        photoURL: avatar,
      });


      const newUser = {
        name: data.name,
        email: loggedUser.email, 
        avatar: avatar,
        bloodGroup: data.blood,
        district: data.district,
        upazila: data.upazila,
        role: "donor", 
        status: "active", 
      };

      await axios.post("http://localhost:3000/users", newUser);


      navigate(location.state || "/");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="bg-[#fff9f9] min-h-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold mb-8">
          Register Your Account
        </h1>

        <div className="card bg-base-100 w-full max-w-3xl shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(handleRegistration)}>
              <fieldset className="fieldset space-y-2">
                {/* Name */}
                <input
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="input input-bordered border-[#b71b1c] w-full"
                />
                {errors.name && <p className="text-red-500">Name required</p>}

                {/* Photo */}
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input file-input-bordered border-[#b71b1c] w-full"
                />
                {errors.photo && <p className="text-red-500">Photo required</p>}

                {/* Email */}
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="input input-bordered border-[#b71b1c] w-full"
                />

                {/* Blood Group */}
                <select
                  {...register("blood", { required: true })}
                  className="select select-bordered border-[#b71b1c] w-full"
                >
                  <option value="">Select blood group</option>
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
                  {...register("district", { required: true })}
                  className="select select-bordered border-[#b71b1c] w-full"
                >
                  <option value="">Select district</option>
                  {district.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>

                {/* Upazila */}
                <select
                  {...register("upazila", { required: true })}
                  className="select select-bordered border-[#b71b1c] w-full"
                >
                  <option value="">Select upazila</option>
                  {upazila.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>

                {/* Password */}
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern:
                        /^[A-Za-z0-9!@#$%^&*()_+\-={}[\]|:;"'<>,.?/\\]+$/,
                    })}
                    placeholder="Password"
                    className="input input-bordered border-[#b71b1c] w-full"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-3 cursor-pointer"
                  >
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    {...register("confirm_password", {
                      required: true,
                      validate: (v) => v === password || "Password mismatch",
                    })}
                    placeholder="Confirm Password"
                    className="input input-bordered w-full border-[#b71b1c]"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-3 cursor-pointer"
                  >
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <button className="btn bg-[#b71b1c] text-white w-full mt-3">
                  Register
                </button>
              </fieldset>
            </form>

            <p className="text-center mt-3">
              Already have an account?
              <Link to="/login" className="text-[#b71b1c] ml-1 font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
