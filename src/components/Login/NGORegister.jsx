import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import './Register.css';
import { Link } from 'react-router-dom';

const NGORegister = () => {
  const navigate = useNavigate();
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, ngoName, email, password, phone, city, state, year } = formData;

    if (!name || !ngoName || !email || !password || !phone || !city || !state || !year) {
      return alert('All fields are required');
    }

    setLoading(true);
    const auth = getAuth();

    try {
      // 1. Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save NGO details to Firestore (linked by email or uid)
      const ngoDocId = ngoName.trim(); // or use user.uid for better uniqueness
      await setDoc(doc(db, 'NGOs', ngoDocId), {
        id: ngoDocId,
        uid: user.uid,
        name: name.trim(),
        ngoName: ngoDocId,
        email: email.trim(),
        phone: phone.trim(),
        city: city.trim(),
        state: state.trim(),
        year: Number(year)
        // ❌ Do NOT store password here
      });

      // 3. Save NGO ID locally and redirect
      localStorage.setItem('ngoId', ngoDocId);
      alert('✅ NGO Registered successfully!');
      navigate('/dashboard');

      setFormData({
        name: '',
        ngoName: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        state: '',
        year: ''
      });
    } catch (err) {
      console.error('Registration error:', err);
      alert('❌ Registration failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-overlay"></div>

      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register Your NGO</h2>

        <div className="form-grid">
          {[
            { label: 'Your Full Name', name: 'name', type: 'text' },
            { label: 'NGO Name', name: 'ngoName', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'Phone Number', name: 'phone', type: 'tel' },
            { label: 'City', name: 'city', type: 'text' },
            { label: 'State', name: 'state', type: 'text' },
            { label: 'Year of Starting', name: 'year', type: 'number' }
          ].map(({ label, name, type }) => (
            <div className="form-group" key={name}>
              <label>{label}</label>
              <input
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          ))}
        </div>

        <button type="submit" className="register-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="login-link">
          Already have an account? <Link to="/NGOlogin">Login here</Link>
        </p>

        <button
          type="button"
          className="back-home"
          disabled={loading}
          onClick={() => navigate('/')}
        >
          🔙Home
        </button>
      </form>
    </div>
  );
};

export default NGORegister;
