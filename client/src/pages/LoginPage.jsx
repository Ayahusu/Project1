import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successfull");
      } else {
        alert("Login Unsuccessfull");
      }
    } catch (error) {
      setError("Somrthing went wrong " + error.message);
    }
  };

  return (
    <MainLayout>
      <div className="w-full h-[600px] mt-[5%] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow p-10 w-5/12 rounded-2xl"
        >
          <h1 className="text-3xl text-blue-500 mb-4">Login</h1>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
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
            id="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
    </MainLayout>
  );
}
