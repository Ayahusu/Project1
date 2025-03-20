import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Example sidebar

const DashboardLayout = () => {
  return (
    <div className="flex gap-6 px-[10%] w-full h-[950px] mt-2 shadow-2xl">
      <div className="w-[200px] h-full flex items-center">
        <div className="w-[200px] h-fit shadow-2xl rounded-2xl">
          <Sidebar />
        </div>
      </div>

      <div className="w-full shadow-2xl overflow-auto no-scrollbar">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
