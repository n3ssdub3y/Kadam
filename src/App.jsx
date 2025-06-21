// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Landing Page/Home';

// import Register from './components/Login/Register';
import NGORegister from './components/Login/NGORegister';
import NGOLogin from './components/Login/NGOLogin';

import Navbar from './components/Landing Page/Navbar';
import AboutUs from './components/Landing Page/AboutUs';
import Dashboard from './components/Dashboard/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/NGOregister" element={<NGORegister />} />
        <Route path="/NGOLogin" element={<NGOLogin />} />
        
        <Route path="/about" element={<AboutUs />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
