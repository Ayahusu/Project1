import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { io } from "socket.io-client";

import LandingLayout from "./layouts/LandingLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import LandingPage from "./pages/common/LandingPage";
import AboutPage from "./pages/common/AboutPage";
import LoginPage from "./pages/common/LoginPage";
import SignupPage from "./pages/common/SignupPage";
import PostPage from "./pages/protected/PostPage";
import ProfilePage from "./pages/protected/ProfilePage";
import AskPage from "./pages/protected/AskPage";
import NotificationPage from "./pages/protected/NotificationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MessagesPage from "./pages/protected/MessagePage";
import Friends from "./pages/protected/Friends";
import ProfileModel from "./components/Modal/ProfileModal";

function App() {
  const isLoggedIn = window.localStorage.getItem("authToken");

  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthorize Route */}
        {!isLoggedIn && (
          <>
            <Route path="/" element={<LandingLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
            </Route>
          </>
        )}

        {/* Routes for logged-in users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard/post" />} />
          <Route path="/about" element={<Navigate to="/dashboard/post" />} />
          <Route path="/login" element={<Navigate to="/dashboard/post" />} />
          <Route path="/signup" element={<Navigate to="/dashboard/post" />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="post" element={<PostPage />} />
            <Route path="message" element={<MessagesPage />} />
            <Route path="notification" element={<NotificationPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="ask" element={<AskPage />} />
            <Route path="friends" element={<Friends />} />
            <Route path="user/:userId" element={<ProfileModel />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
