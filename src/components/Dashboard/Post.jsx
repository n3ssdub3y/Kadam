// src/components/Feed/Post.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './Dashboard.css';

function Post() {
  const [logoURL, setLogoURL] = useState('');
  
  useEffect(() => {
    const fetchLogo = async () => {
      // determine current ID
      const ngoId  = localStorage.getItem('ngoId');
      const userId = localStorage.getItem('userId');
      let path;

      if (ngoId) {
        path = doc(db, 'NGOs', ngoId, 'pics', 'logo');
      } else if (userId) {
        path = doc(db, 'Users', userId, 'pics', 'profile');
      } else {
        return;
      }

      try {
        const snap = await getDoc(path);
        if (snap.exists()) {
          setLogoURL(snap.data().logoURL);
        }
      } catch (err) {
        console.error('Error fetching logo:', err);
      }
    };

    fetchLogo();
  }, []);

  return (
    <div className="post-creator">
        <div className="post-title">
      <img 
        src={logoURL || 'https://via.placeholder.com/50'} 
        alt="Profile" 
        className="post-creator-img"
      />
      <input 
        type="text" 
        placeholder="Create a post..." 
        className="post-input"
      />
      </div>
      <div className="post-options">
        <button className="post-option">
          📷 Photo
        </button>
        <button className="post-option">
          ▶️ Video
        </button>
        <button className="post-option">
          🎪 Event
        </button>
        <button className="post-option">
          📜 Article
        </button>
      </div>
    </div>
  );
}

export default Post;
