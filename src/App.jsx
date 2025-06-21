// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Landing Page/Home';

// import Register from './components/Login/Register';
import RegisterFirebase from './components/Login/RegisterFirebase';

import Navbar from './components/Landing Page/Navbar';
import AboutUs from './components/Landing Page/AboutUs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/register" element={<RegisterFirebase />} />
        
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
