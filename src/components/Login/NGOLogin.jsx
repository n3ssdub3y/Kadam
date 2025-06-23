import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './Register.css'; // Import the same CSS file

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      return alert('Please enter both email and password');
    }

    setLoading(true);
    try {
      // 1. Query the NGOs collection for a document whose 'email' field matches
      const ngosRef = collection(db, 'NGOs');
      const q = query(ngosRef, where('email', '==', email.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert('No account found with that email');
      } else {
        // Since email is unique, there should be exactly one match
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();

        // 2. Check password (plaintext comparison; secure hashing recommended in production)
        if (data.password === password) {
          // 3. Successful login → remember which NGO, then redirect
          const id = docSnap.id;
          localStorage.setItem('ngoId', id);
          navigate('/dashboard');
        }
        else {
          alert('Incorrect password');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed—check console for details.');
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
        style={{ maxWidth: '500px' }} // Slightly narrower form for login
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
        
        <button 
          type="submit" 
          className="register-button"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <p className="login-link">
          Don't have an account? <Link to="/NGOregister">Register here</Link>
        </p>

        <button 
          type="submit" 
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