import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function LogoutModal({ showModal, setShowModal, handleLogout }) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Transparent Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={() => setShowModal(false)} // Click outside to close modal
      ></div>

      {/* Modal Box */}
      <div className="relative bg-white p-6 rounded-lg shadow-xl w-96 text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Are you sure you want to logout?
        </h2>

        {/* Buttons */}
        <div className="flex justify-center mt-5 gap-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            onClick={() => {
              setUser(null); // Clear user session
              localStorage.removeItem("authToken"); // Remove token
              handleLogout(); // Additional cleanup logic
              setShowModal(false); // Close modal
              navigate("/"); // Redirect to login
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
