import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../cloudinary';
import './Dashboard.css';

function Feed() {
      const [logoURL, setLogoURL] = useState('');
      const [posts] = useState([
        {
          id: 1,
          author: 'Women Empowerment Network',
          title: 'Nonprofit Organization',
          content: 'Join our webinar this Friday about financial literacy for women entrepreneurs! #Empowerment #Finance',
          likes: 24,
          comments: 7,
          time: '3h ago'
        },
        {
          id: 2,
          author: 'Digital Skills Initiative',
          title: 'Education Nonprofit',
          content: 'We just launched our new mobile app to teach digital skills to women in rural areas! Check it out at digitalskills.org/app',
          likes: 56,
          comments: 12,
          time: '1d ago'
        }
      ]);
    return(
        <>
                <main className="main-feed">
          <div className="post-creator">
            <img 
              src={logoURL || 'https://via.placeholder.com/50'} 
              alt="Organization" 
              className="post-creator-img"
            />
            <input 
              type="text" 
              placeholder="Share an update about your organization..." 
              className="post-input"
            />
            <div className="post-options">
              <button className="post-option">
                <i className="icon photo-icon"></i> Photo
              </button>
              <button className="post-option">
                <i className="icon video-icon"></i> Video
              </button>
              <button className="post-option">
                <i className="icon event-icon"></i> Event
              </button>
              <button className="post-option">
                <i className="icon article-icon"></i> Article
              </button>
            </div>
          </div>

          {posts.map(post => (
            <div key={post.id} className="post">
              <div className="post-header">
                <img src={logoURL || 'https://via.placeholder.com/50'} alt={post.author} className="post-author-img" />
                <div className="post-author-info">
                  <h4>{post.author}</h4>
                  <p>{post.title}</p>
                  <small>{post.time}</small>
                </div>
                <button className="post-menu">
                  <i className="icon more-icon"></i>
                </button>
              </div>
              <div className="post-content">
                <p>{post.content}</p>
              </div>
              <div className="post-stats">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
              </div>
              <div className="post-actions">
                <button className="post-action">
                  <i className="icon like-icon"></i> Like
                </button>
                <button className="post-action">
                  <i className="icon comment-icon"></i> Comment
                </button>
                <button className="post-action">
                  <i className="icon share-icon"></i> Share
                </button>
                <button className="post-action">
                  <i className="icon send-icon"></i> Send
                </button>
              </div>
            </div>
          ))}
        </main>
        </>
    );
}
export default Feed;