import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <MainLayout>
      <div className="w-full h-[600px] mt-[5%] flex justify-center items-center">
        <form className="bg-white shadow p-10 w-5/12 rounded-2xl">
          <h1 className="text-3xl text-blue-500 mb-4">Signup</h1>
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-gray-400 rounded w-full mt-3 mb-3 p-2 outline-none"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-400 rounded w-full mt-3 mb-3 p-2 outline-none"
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
            required
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-400 rounded w-full mt-3 mb-3 p-2 outline-none"
          />
          <br />
          <div>
            <span className="text-gray-400">Already have an account?</span>
            <Link to="/Login" className="text-blue-500">
              {" "}
              Login
            </Link>
          </div>
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 lg:w-28 sm:w-16 rounded text-white"
          >
            Signup
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
