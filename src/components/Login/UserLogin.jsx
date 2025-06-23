// this is UserLogin.jsx

import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';


const provider = new GoogleAuthProvider();

const UserLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleEmailLogin = async e => {
    e.preventDefault();
    const { email, password } = form;
    if (!email || !password) return alert('Enter email & password');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

     // look up doc by uid
     const { uid } = auth.currentUser;
     const usersRef = collection(db, 'Users');
     const q = query(usersRef, where('uid','==',uid));
     const snap = await getDocs(q);
     if (!snap.empty) {
       localStorage.setItem('userId', snap.docs[0].id);
     }

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      
     const result = await signInWithPopup(auth, provider);
     const user = result.user;
     // assume doc already exists under displayName or uid
     const docId = user.displayName?.trim() || user.uid;
     localStorage.setItem('userId', docId);

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-overlay"></div>
      
      <form 
        className="register-form" 
        onSubmit={handleEmailLogin}
        style={{ maxWidth: '500px' }}
      >
        <h2 className="register-title">Login to Your Account</h2>
        
        <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="form-group">
            <label>Email</label>
            <input 
              name="email" 
              type="email" 
              value={form.email} 
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
              value={form.password} 
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
        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <span style={{ display: 'block', marginBottom: '10px' }}>Or</span>
          <button 
            type="button" 
            onClick={handleGoogleLogin} 
            disabled={loading}
            className="google-button"
          >
            <img 
              src="/google.png" 
              alt="Google logo" 
              style={{ width: '20px', marginRight: '10px', verticalAlign: 'middle' }} 
            />
            Continue with Google
          </button>
        </div>
        
        <p className="login-link">
          Don't have an account? <Link to="/UserRegister">Register here</Link>
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

export default UserLogin;