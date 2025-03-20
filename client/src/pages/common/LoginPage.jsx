import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/user/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        window.localStorage.setItem("authToken", response.data.token);
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate("/dashboard/post");
      } else {
        alert("Login Unsuccessful");
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data?.message || error.message
      );
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <>
      <div className="w-full h-[600px] mt-[5%] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow p-10 w-5/12 rounded-2xl"
        >
          <h1 className="text-3xl text-blue-500 mb-4">Login</h1>
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Display error message */}
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full mt-3 mb-3 p-2 outline-none"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded w-full mt-3 mb-3 p-2 outline-none"
          />
          <br />
          <div>
            <span className="text-gray-400">Don't have an account?</span>
            <Link to="/signup" className="text-blue-500">
              {" "}
              SignUp
            </Link>
          </div>
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 lg:w-28 sm:w-16 rounded text-white"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
