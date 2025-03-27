import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NavBar from "./NavBar";

const DashboardLayout = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <NavBar />
      <div className="flex w-full h-full mt-20">
        {/* Sidebar */}
        <div className="w-[250px] fixed h-full">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-[250px] overflow-auto no-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
