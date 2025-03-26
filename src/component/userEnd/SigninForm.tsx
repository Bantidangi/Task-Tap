import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import  { Toast } from "@chakra-ui/toast";

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signin",
        data
      );
      if (response.status === 200) {
        console.log("Success")
        Toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        Sign In to TaskTap
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold">
          Sign In
        </button>
      </form>
      <p className="text-center mt-4 text-sm">
        Don’t have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default SigninForm;
