import React, { useContext, useState } from "react"; // Import useState
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
export default function Header() {
  return (
    <div className="w-full mt-4 flex items-center bg-white shadow-sm sticky top-[16px]">
      <div className="w-[60%]">
        <Link to="/">
          <img src={logo} className="w-60" alt="Logo" />
        </Link>
      </div>
      <div className="w-[40%] flex justify-around text-xl">
        <Link
          to="/"
          className="hover:text-blue-500 transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="hover:text-blue-500 transition-colors duration-300"
        >
          About Us
        </Link>
        <Link
          to="/login"
          className="hover:text-blue-500 transition-colors duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="hover:text-blue-500 transition-colors duration-300"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
