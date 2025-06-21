// src/RegisterFirebase.jsx
import React, { useState } from 'react';
import { db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const RegisterFirebase = () => {
  const [formData, setFormData] = useState({
    name: '',
    ngoName: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    state: '',
    year: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, ngoName, email, password, phone, city, state, year } = formData;
    // basic validation
    if (!name || !ngoName || !email || !password || !phone || !city || !state || !year) {
      return alert('All fields are required');
    }

    setLoading(true);
    try {
      // setDoc will create (or overwrite) a document at NGOs/{ngoName}
      await setDoc(
        doc(db, 'NGOs', ngoName.trim()),
        {
          name:        String(name).trim(),
          ngoName:     String(ngoName).trim(),
          email:       String(email).trim(),
          password:    String(password),        // consider hashing in real apps!
          phone:       String(phone).trim(),
          city:        String(city).trim(),
          state:       String(state).trim(),
          year:        Number(year)
        }
      );
      alert('✅ Registered successfully in Firestore!');
      setFormData({ name:'', ngoName:'', email:'', password:'', phone:'', city:'', state:'', year:'' });
    } catch (err) {
      console.error('Firestore write error:', err);
      alert('❌ Registration failed. See console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>NGO Registration</h2>
      {[
        { label: 'Your Name', name: 'name', type: 'text' },
        { label: 'NGO Name', name: 'ngoName', type: 'text' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Password', name: 'password', type: 'password' },
        { label: 'Phone No.', name: 'phone', type: 'tel' },
        { label: 'City', name: 'city', type: 'text' },
        { label: 'State', name: 'state', type: 'text' },
        { label: 'Year', name: 'year', type: 'number' }
      ].map(({ label, name, type }) => (
        <div key={name} style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>{label}</label>
          <input
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
          />
        </div>
      ))}
      <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
        {loading ? 'Registering…' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterFirebase;
