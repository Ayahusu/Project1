import React from "react";
import MainLayout from "../../layouts/LandingLayout";
import styles from "./LandinPage.module.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div
        className={`mt-10 flex flex-col justify-center items-start text-white pl-8 text-3xl ${styles.background_img}`}
      >
        <h1 className="text-7xl">Have a Question?</h1>
        <span className="text-sm">
          A fast and reliable app that provides instant answers to all your
          questions, anytime, anywhere!
        </span>
        <Link to="/signup">
          <button className="w-[300px] bg-blue-500 my-4 p-2 rounded text-xl">
            Get Started
          </button>
        </Link>
      </div>
    </>
  );
}

export default HomePage;
