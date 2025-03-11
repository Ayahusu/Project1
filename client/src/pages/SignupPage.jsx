import React, { useState, useContext } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { setuser } = useContext(UserContext);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = "Enter a valid email";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setuser(e.target.value);

    setLoading(true);
    setMessage(null);
    try {
      const response = await axios.post("/api/signup", formData);
      setMessage({
        type: "success",
        text: "Signup successful! You can log in now.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Signup failed. Try again.",
      });
    }
    setLoading(false);

    <Navigate to="/" element="<Home/>" />;
  };

  return (
    <MainLayout>
      <div className="w-full h-[600px] mt-[5%] flex justify-center items-center">
        <form
          onSubmit={handleSignup}
          className="bg-white shadow p-10 w-5/12 rounded-2xl"
        >
          <h1 className="text-3xl text-blue-500 mb-4">Signup</h1>

          {message && (
            <p
              className={`text-sm ${
                message.type === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {message.text}
            </p>
          )}

          <div className="mt-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="border-2 border-gray-400 rounded w-full mt-1 p-2 outline-none"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div className="mt-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border-2 border-gray-400 rounded w-full mt-1 p-2 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mt-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border-2 border-gray-400 rounded w-full mt-1 p-2 outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="mt-3">
            <span className="text-gray-400">Already have an account?</span>
            <Link to="/login" className="text-blue-500 ml-1">
              Login
            </Link>
          </div>

          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 w-full rounded text-white"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
