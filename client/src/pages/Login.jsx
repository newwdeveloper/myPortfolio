import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // <-- changed here
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { validateLogin } from "../utils/validators";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // <-- changed here

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in successfully!");
      navigate("/admin"); // <-- changed here
    } catch (error) {
      toast.error(error.response?.data?.msg || "Invalid credentials");
    }
  };

  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
