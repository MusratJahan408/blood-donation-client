import { useState} from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useLocationData from "../../hooks/useLocationData";

const Register = () => {
  const { district, upazila } = useLocationData();
  const [filteredUpazila, setFilteredUpazila] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const password = useWatch({ control, name: "password" });

  // Filter upazila based on selected district
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFilteredUpazila(upazila.filter((u) => u.district_id === selectedDistrict));
  };

  const handleRegistration = async (data) => {
    try {
      // 1️⃣ Register user
      const result = await registerUser(data.email, data.password);
      const loggedUser = result.user;

      // 2️⃣ Upload avatar
      const formData = new FormData();
      formData.append("image", data.photo[0]);
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
        formData
      );
      const avatar = imgRes.data.data.url;

      // 3️⃣ Update user profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: avatar,
      });

      // 4️⃣ Save user in backend
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

      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="bg-[#fff9f9] min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">
          Register Your Account
        </h1>

        <div className="card bg-base-100 shadow-xl p-6">
          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
            {/* Name */}
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              className="input input-bordered w-full border-[#b71b1c]"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            {/* Photo */}
            <input
              type="file"
              {...register("photo", { required: "Photo is required" })}
              className="file-input file-input-bordered w-full border-[#b71b1c]"
            />
            {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}

            {/* Email */}
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              placeholder="Email"
              className="input input-bordered w-full border-[#b71b1c]"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            {/* Blood Group */}
            <select
              {...register("blood", { required: "Blood group is required" })}
              className="select select-bordered w-full border-[#b71b1c]"
            >
              <option value="">Select blood group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            {errors.blood && <p className="text-red-500">{errors.blood.message}</p>}

            {/* District */}
            <select
              {...register("district", { required: "District is required" })}
              className="select select-bordered w-full border-[#b71b1c]"
              onChange={handleDistrictChange}
            >
              <option value="">Select district</option>
              {district.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            {errors.district && <p className="text-red-500">{errors.district.message}</p>}

            {/* Upazila */}
            <select
              {...register("upazila", { required: "Upazila is required" })}
              className="select select-bordered w-full border-[#b71b1c]"
            >
              <option value="">Select upazila</option>
              {filteredUpazila.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
            {errors.upazila && <p className="text-red-500">{errors.upazila.message}</p>}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
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

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (v) => v === password || "Passwords do not match",
                })}
                placeholder="Confirm Password"
                className="input input-bordered w-full border-[#b71b1c]"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {errors.confirm_password && (
              <p className="text-red-500">{errors.confirm_password.message}</p>
            )}

            <button className="btn w-full bg-[#b71b1c] text-white mt-3">Register</button>
          </form>

          <p className="text-center mt-4">
            Already have an account?
            <Link to="/login" className="text-[#b71b1c] ml-1 font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
