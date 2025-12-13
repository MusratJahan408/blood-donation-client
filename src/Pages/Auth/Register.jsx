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

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
    ,
  } = useForm();

  const password = useWatch({control, name:"password"});

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    // 1. Firebase auth create
    registerUser(data.email, data.password)
      .then((result) => {
        // 2. Upload image to imgbb
        const formData = new FormData();
        formData.append("image", profileImg);

        const imageUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;

        axios.post(imageUrl, formData).then((res) => {
          const imgLink = res.data.data.url;

          // 3. Update Firebase Profile
          updateUserProfile({
            displayName: data.name,
            photoURL: imgLink,
          }).then(() => {
            // 4. Full user object for Database
            const newUser = {
              email: data.email,
              name: data.name,
              avatar: imgLink,
              bloodGroup: data.blood,
              district: data.district,
              upazila: data.upazila,
              role: "donor",
              status: "active",
            };

            // 5. Save user in backend
            axios
              .post("http://localhost:5000/users", newUser)
              .then(() => {
                navigate(location.state || "/");
              })
              .catch((err) => console.log(err));
          });
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-[#fff9f9] py-10 md:py-0 min-h-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold mb-10">Register Your Account</h1>
        <div className="card bg-base-100 w-full max-w-7xl shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(handleRegistration)}>
              <fieldset className="fieldset">

                {/* Name */}
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input w-full border-[#b71b1c] "
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-500">Name is required</p>
                )}

                {/* Photo */}
                <label className="label">Photo</label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input w-full border-[#b71b1c] "
                />
                {errors.photo && (
                  <p className="text-red-500">Photo is required</p>
                )}

                {/* Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input w-full border-[#b71b1c] "
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500">Email is required</p>
                )}

                {/* Blood group */}
                <label className="label">Blood Group</label>
                <select
                  className="select select-bordered w-full border-[#b71b1c] "
                  {...register("blood", { required: true })}
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
                {errors.blood && (
                  <p className="text-red-500">Blood group is required</p>
                )}

                {/* District */}
                <label className="label">District</label>
                <select
                  className="select select-bordered w-full border-[#b71b1c] "
                  {...register("district", { required: true })}
                >
                  <option value="">Select district</option>
                  {district.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-500">District is required</p>
                )}

                {/* Upazila */}
                <label className="label">Upazila</label>
                <select
                  className="select select-bordered w-full border-[#b71b1c] "
                  {...register("upazila", { required: true })}
                >
                  <option value="">Select upazila</option>
                  {upazila.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
                {errors.upazila && (
                  <p className="text-red-500">Upazila is required</p>
                )}

                {/* Password */}
               <div className="relative mt-4">
                 <label className="label">Password</label>
                <input
                 type={show ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^[A-Za-z0-9!@#$%^&*()_+\-={}[\]|:;"'<>,.?/\\]+$/,
                  })}
                  className="input w-full border-[#b71b1c] "
                  placeholder="Password"
                />
                 <p onClick={() => setShow(!show)}className="absolute top-8 left-68 md:left-[430px] cursor-pointer">
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </p>
               </div>
                
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">
                    Password must be 6 character or longer
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500">
                    Password can contain letters, numbers and special characters.
                  </p>
                )}

                {/* Confirm Password */}
                <div className="relative mt-4">
                  <label className="label">Confirm Password</label>
                <input
                 type={show ? "text" : "password"}
                  {...register("confirm_password", {
                    required: true,
                    validate: (value) =>
                      value === password || "Password did not match",
                  })}
                  className="input w-full border-[#b71b1c] "
                  placeholder="Confirm password"
                />
                <p onClick={() => setShow(!show)}className="absolute top-8 left-68 md:left-[430px] cursor-pointer">
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </p>
                </div>
                {errors.confirm_password && (
                  <p className="text-red-500">
                    {errors.confirm_password.message}
                  </p>
                )}

                <button className="btn bg-[#b71b1c] text-white mt-5">Register</button>
              </fieldset>
            </form>

            <p className="mt-2 text-center">
              Already have an account?
              <Link
                className="text-[#b71b1c] underline font-bold ml-1"
                to="/login"
              >
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
