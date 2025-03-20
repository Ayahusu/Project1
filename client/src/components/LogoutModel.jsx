import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function LogoutModal({ showModal, setShowModal, handleLogout }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user && user.token === localStorage.getItem("authToken")) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [user]); // Cleanup the token when the user context changes

  if (!showModal) return null; // Don't render if not visible

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 w-screen bg-white bg-opacity-20 backdrop-blur-md"></div>

      {/* Modal Box */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl mb-4">Are you sure you want to logout?</h2>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            onClick={() => setShowModal(false)} // Close the modal
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={() => {
              // Clear user context and local storage
              setUser(null); // Clear user context
              localStorage.removeItem("authToken"); // Remove auth token from localStorage
              handleLogout(); // Perform any additional logout logic
              setShowModal(false); // Close modal after logout
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
