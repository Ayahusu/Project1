// components/layouts/MainLayout.jsx
import React from "react";
import Header from "./Header";

function MainLayout({ children }) {
  return (
    <div className="mx-[10%] h-full">
      <Header></Header>
      <main style={{ marginTop: "20px" }}>{children}</main>
    </div>
  );
}

export default MainLayout;
