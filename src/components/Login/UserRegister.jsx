// this is UserRegister.jsx

import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const provider = new GoogleAuthProvider();

const UserRegister = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleEmailRegister = async e => {
    e.preventDefault();
    const { username, email, password } = form;
    if (!username || !email || !password) return alert('All fields required');
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: username });
      const docId = username.trim();
      await setDoc(doc(db, 'Users', username.trim()), {
        uid:       userCred.user.uid,
        username:  username.trim(),
        email:     email.trim(),
        createdAt: Date.now()
      });
      
      localStorage.setItem('userId', docId);

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user   = result.user;
      const docId  = user.displayName?.trim() || user.uid;
      await setDoc(doc(db, 'Users', docId), {
        uid:       user.uid,
        username:  user.displayName || '',
        email:     user.email,
        photoURL:  user.photoURL,
        createdAt: Date.now()
      }, { merge: true });

      localStorage.setItem('userId', docId);

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-overlay"></div>
      
      <form 
        className="register-form" 
        onSubmit={handleEmailRegister}
        style={{ maxWidth: '500px' }}
      >
        <h2 className="register-title">Create Your Account</h2>
        
        <div className="form-grid2" style={{ gridTemplateColumns: '1fr' }}>
          <div className="form-group">
            <label>Username</label>
            <input 
              name="username" 
              value={form.username} 
              onChange={handleChange} 
              required
              className="form-input"
            />
          </div>
          
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
          {loading ? 'Registering...' : 'Register'}
        </button>
        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <span style={{ display: 'block', marginBottom: '10px' }}>Or</span>
          <button 
            type="button" 
            onClick={handleGoogleRegister} 
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
          Already have an account? <Link to="/UserLogin">Login here</Link>
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

export default UserRegister;