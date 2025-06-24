// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Landing Page/Home";

// import Register from './components/Login/Register';
import NGORegister from "./components/Login/NGORegister";
import NGOLogin from "./components/Login/NGOLogin";
import UserRegister from "./components/Login/UserRegister";
import UserLogin from "./components/Login/UserLogin";

import Navbar from "./components/Landing Page/Navbar";
import AboutUs from "./components/Landing Page/AboutUs";
import Dashboard from "./components/Dashboard/Dashboard";
// import LinkedInHome from "./components/link/LinkedInHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/NGOregister" element={<NGORegister />} />
        <Route path="/NGOLogin" element={<NGOLogin />} />
        <Route path="/Userregister" element={<UserRegister />} />
        <Route path="/UserLogin" element={<UserLogin />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/LinkedInHome" element={<LinkedInHome />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
