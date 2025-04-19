import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Zod schema for validation
const schema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUpform = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", data);
      toast.success("Signup Successful!", {
        className: "bg-blue-500 text-white",
      });
      navigate("/sign-in");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col-reverse p-5 items-center gap-10 bg-slate-100 min-h-screen sm:flex sm:flex-row">
      <div className=" w-1/2 text-center px-6 flex flex-col items-center justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1999/1999625.png"
          alt="News illustration"
          className="w-36 h-36 mb-6"
        />

        <h2 className="text-4xl font-extrabold text-blue-800 mb-4">
          Create. Connect. Inform.
        </h2>

        <p className=" sm:text-lg sm:text-gray-700  text-red-400 sm:text-wrap  text-nowrap leading-relaxed">
          Step into the world of independent journalism.
          <br />
          Whether it's breaking headlines or sharing personal insights
          <br />
          <span className="text-blue-600 font-semibold">
            your voice matters.
          </span>
        </p>

        <p className="mt-4 text-sm text-gray-600 italic">
          "Empowering voices. Changing narratives."
        </p>

        <h1 className="text-sm mt-4 text-gray-800 italic">Join Us</h1>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign Up
          </h2>

          {/* Username */}
          <div className="flex flex-col">
            <label className="font-medium text-lg mb-1 text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register("userName")}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-slate-50"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="font-medium text-lg mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-slate-50"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="font-medium text-lg mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-slate-50"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-lg w-full transition-all duration-200 cursor:pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpform;
