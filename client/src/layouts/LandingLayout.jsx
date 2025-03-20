// components/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function MainLayout() {
  return (
    <div className="px-[10%] h-full">
      <div>
        <Header />
      </div>
      <main style={{ marginTop: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
