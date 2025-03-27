import { FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useSearch } from "../context/SearchContext"; // Import search context

export default function NavBar() {
  const { searchQuery, setSearchQuery } = useSearch(); // Use global search state

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between px-6 py-3 z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="w-40 h-14 rounded-full" />
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-[600px] bg-gray-100 rounded-full px-4 py-2">
        <FaSearch className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update global state
          className="w-full bg-transparent focus:outline-none px-2 text-gray-800"
        />
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-6">
        {/* <FaBell className="w-6 h-6 text-gray-600 cursor-pointer" />
        <FaUserCircle className="w-7 h-7 text-gray-600 cursor-pointer" /> */}
      </div>
    </div>
  );
}
