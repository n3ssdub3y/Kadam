// src/components/Login/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

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
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register Your NGO</h2>
        <input type="text" name="name" placeholder="Your Full Name" onChange={handleChange} required />
        <input type="text" name="ngoName" placeholder="NGO Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" onChange={handleChange} required />
        <input type="number" name="year" placeholder="Year of Starting" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
