import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    ngoName: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    state: '',
    year: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/register', formData);
      alert('✅ Registered successfully!');
    } catch (err) {
      alert('❌ Registration failed');
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-overlay"></div>
      
      {/* Floating orbs */}
      <div className="register-orb orb-1"></div>
      <div className="register-orb orb-2"></div>
      <div className="register-orb orb-3"></div>
      
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register Your NGO</h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Your Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>NGO Name</label>
            <input 
              type="text" 
              name="ngoName" 
              value={formData.ngoName}
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>City</label>
            <input 
              type="text" 
              name="city" 
              value={formData.city}
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>State</label>
            <input 
              type="text" 
              name="state" 
              value={formData.state}
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Year of Starting</label>
            <input 
              type="number" 
              name="year" 
              value={formData.year}
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
        </div>
        
        <button type="submit" className="register-button">Register</button>
        
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;