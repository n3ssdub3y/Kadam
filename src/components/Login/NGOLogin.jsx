import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './Register.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      return alert('Please enter both email and password');
    }

    setLoading(true);
    const auth = getAuth();

    try {
      // Firebase Auth sign-in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // After successful login, fetch the corresponding NGO document
      const ngosRef = collection(db, 'NGOs');
      const q = query(ngosRef, where('email', '==', email.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert('No NGO record found for this account.');
      } else {
        const docSnap = querySnapshot.docs[0];
        const ngoId = docSnap.id;

        // Store the NGO ID and navigate
        localStorage.setItem('ngoId', ngoId);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err.message);
      alert('Login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-overlay"></div>

      <form
        className="register-form"
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px' }}
      >
        <h2 className="register-title">Login to Your Account</h2>

        <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <button type="submit" className="register-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="login-link">
          Don't have an account? <Link to="/NGOregister">Register here</Link>
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

export default Login;
