import React from 'react';
import { Link } from 'react-router-dom';
import './LinkedInHome.css'; // Create this CSS file for styling

const LinkedInHome = () => {
  // Mock data for posts
  const posts = [
    {
      id: 1,
      author: 'John Doe',
      title: 'Software Engineer at Tech Corp',
      content: 'Just published a new article about React performance optimization techniques!',
      likes: 42,
      comments: 5,
      time: '2h ago'
    },
    {
      id: 2,
      author: 'Jane Smith',
      title: 'Product Manager at Design Inc',
      content: 'Excited to announce our new product launch next week! #productmanagement #launch',
      likes: 89,
      comments: 12,
      time: '4h ago'
    }
  ];

  // Mock connections
  const connections = [
    { name: 'Alex Johnson', title: 'UX Designer' },
    { name: 'Sarah Williams', title: 'Marketing Specialist' },
    { name: 'Michael Brown', title: 'Data Scientist' }
  ];

  return (
    <div className="linkedin-container">
      {/* Header */}
      <header className="linkedin-header">
        <div className="logo">
          <Link to="/">LinkedIn</Link>
        </div>
        <nav className="main-nav">
          <Link to="/feed">Feed</Link>
          <Link to="/network">My Network</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/messaging">Messaging</Link>
          <Link to="/notifications">Notifications</Link>
        </nav>
        <div className="user-menu">
          <img src="https://via.placeholder.com/40" alt="Profile" className="profile-pic" />
          <span>Me</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="linkedin-content">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <div className="profile-card">
            <div className="profile-bg"></div>
            <img src="https://via.placeholder.com/80" alt="Profile" className="profile-img" />
            <h3>Your Name</h3>
            <p>Your Headline</p>
          </div>
          
          <div className="connections">
            <h4>Connections</h4>
            <p>Grow your network</p>
            {connections.map((conn, index) => (
              <div key={index} className="connection">
                <img src="https://via.placeholder.com/30" alt={conn.name} />
                <div>
                  <p>{conn.name}</p>
                  <small>{conn.title}</small>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Feed */}
        <main className="main-feed">
          <div className="post-creator">
            <img src="https://via.placeholder.com/50" alt="You" />
            <input type="text" placeholder="Start a post" />
          </div>

          {posts.map(post => (
            <div key={post.id} className="post">
              <div className="post-header">
                <img src="https://via.placeholder.com/50" alt={post.author} />
                <div>
                  <h4>{post.author}</h4>
                  <p>{post.title}</p>
                  <small>{post.time}</small>
                </div>
              </div>
              <div className="post-content">
                <p>{post.content}</p>
              </div>
              <div className="post-actions">
                <button>Like ({post.likes})</button>
                <button>Comment ({post.comments})</button>
                <button>Share</button>
              </div>
            </div>
          ))}
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="news-card">
            <h4>LinkedIn News</h4>
            <ul>
              <li>Tech hiring slows down</li>
              <li>Remote work trends in 2023</li>
              <li>New AI tools for developers</li>
            </ul>
          </div>
          
          <div className="ad-card">
            <p>Advertisement</p>
            <img src="https://via.placeholder.com/250x250" alt="Ad" />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LinkedInHome;