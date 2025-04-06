import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
// Zod schema for validation
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignInform = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/auth/signin", data);
      toast.success("sucessfully signed in");
    } catch (error) {
      toast.success("failed to sign in");
    }
  };
  return (
    <div className=" flex min-h-screen  items-center justify-center">
      <div className="w-full md:w-1/2 flex justify-center items-center px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6 bg-blue-400 p-8 rounded-xl shadow-lg"
        >
          <div className="hidden md:flex items-center justify-center">
            <div className="text-3xl font-bold text-center">Sign-in</div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-lg mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-slate-100"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-lg mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-slate-100"
            />
          </div>

          <button
            type="submit"
            className="bg-rose-500  hover:bg-rose-600 text-white font-semibold py-3 rounded-lg w-full transition-all duration-200  cursor-pointer"
          >
            Sign In
          </button>
          <div className="flex justify-between items-center text-sm text-white">
            <label className="flex items-center gap-0.5">
              <input type="checkbox" className="accent-red-500" />
              <span>Remember me</span>
            </label>
            <button type="button" className="hover:underline">
              Forgot password?
            </button>
          </div>
          <Link to={"/sign-up"}>
            <button
              type="button"
              className="bg-rose-500 cursor-pointer hover:bg-rose-600 text-white font-semibold py-3 rounded-lg w-full transition-all duration-200 "
            >
              Sign Up
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignInform;
