
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import {NGOPage} from './components/NGOPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ngos" element={<NGOPage />} />
      </Routes>
    </Router>
  );
}

export default App;