import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../cloudinary';
import './Dashboard.css';

const LinkedInProfileDashboard = () => {
  // Mock data for posts
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

  const [connections] = useState([
    { name: 'Financial Inclusion Group', title: '501 members' },
    { name: 'Women Entrepreneurs', title: '2.3k members' },
    { name: 'Digital Literacy Advocates', title: '890 members' }
  ]);

  // Profile state
  const [ngo, setNgo] = useState(null);
  const [logoURL, setLogoURL] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [showAddSection, setShowAddSection] = useState(false);
  const [newField, setNewField] = useState('');
  const [newValue, setNewValue] = useState('');
  const navigate = useNavigate();

  const excludedFields = ['id', 'name', 'ngoName', 'email', 'password', 'city', 'state', 'year', 'description', 'phone'];

  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem('ngoId');
      if (!id) return;

      const ngoRef = doc(db, 'NGOs', id);
      const ngoSnap = await getDoc(ngoRef);
      if (ngoSnap.exists()) {
        const data = ngoSnap.data();
        setNgo({ id: ngoSnap.id, ...data });
        setEditedFields(data);
      }

      const logoRef = doc(db, 'NGOs', id, 'pics', 'logo');
      const logoSnap = await getDoc(logoRef);
      if (logoSnap.exists()) {
        setLogoURL(logoSnap.data().logoURL || '');
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !ngo) return;
    try {
      const url = await uploadToCloudinary(file);
      const logoDocRef = doc(db, 'NGOs', ngo.id, 'pics', 'logo');
      await setDoc(logoDocRef, { logoURL: url }, { merge: true });
      setLogoURL(url);
    } catch (err) {
      console.error(err);
      alert('Logo upload failed');
    }
  };

  const handleFieldChange = (field, value) => {
    setEditedFields(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdits = async () => {
    const ngoRef = doc(db, 'NGOs', ngo.id);
    await updateDoc(ngoRef, editedFields);
    setNgo(prev => ({ ...prev, ...editedFields }));
    setEditMode(false);
  };

  const handleAddSection = async () => {
    if (!newField.trim() || !newValue.trim()) return;
    const ngoRef = doc(db, 'NGOs', ngo.id);
    await updateDoc(ngoRef, { [newField.trim()]: newValue.trim() });
    setNgo(prev => ({ ...prev, [newField.trim()]: newValue.trim() }));
    setNewField('');
    setNewValue('');
    setShowAddSection(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('ngoId');
    navigate('/NGOlogin');
  };

  if (!ngo) return <div className="loading-container">Loading NGO data...</div>;

  return (
    <div className="linkedin-container">
      {/* Header */}
      <header className="linkedin-header">
        <div className="header-content">
          <div className="logo">
            <Link to="/">Kadam 👣</Link>
          </div>
          <nav className="main-nav">
            <Link to="/dashboard" className="nav-item">
              <i className="icon feed-icon"></i>
              <span>Feed</span>
            </Link>
            <Link to="/network" className="nav-item">
              <i className="icon network-icon"></i>
              <span>My Network</span>
            </Link>
            <Link to="/opportunities" className="nav-item">
              <i className="icon jobs-icon"></i>
              <span>Opportunities</span>
            </Link>
            <Link to="/messaging" className="nav-item">
              <i className="icon messaging-icon"></i>
              <span>Messaging</span>
            </Link>
            <Link to="/notifications" className="nav-item">
              <i className="icon notifications-icon"></i>
              <span>Notifications</span>
            </Link>
          </nav>
          <div className="user-menu" onClick={() => navigate('/profile')}>
            {logoURL ? (
              <img src={logoURL} alt="Profile" className="profile-pic-small" />
            ) : (
              <div className="profile-pic-placeholder-small">
                {ngo.ngoName.charAt(0)}
              </div>
            )}
            <span>Me <i className="dropdown-icon"></i></span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="linkedin-content">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <div className="profile-card">
            <div className="profile-bg"></div>
            <label htmlFor="upload-logo" className="profile-logo-label">
              {logoURL ? (
                <img src={logoURL} alt="NGO Logo" className="profile-img-medium" />
              ) : (
                <div className="profile-img-placeholder-medium">
                  {ngo.ngoName.charAt(0)}
                </div>
              )}
            </label>
            <input
              id="upload-logo"
              type="file"
              accept="image/*"
              className="hidden-input"
              onChange={handleImageUpload}
            />
            
            <h3>
              {editMode ? (
                <input
                  value={editedFields.ngoName || ''}
                  onChange={(e) => handleFieldChange('ngoName', e.target.value)}
                  className="profile-input"
                  style={{ textAlign: 'center', width: '100%' }}
                />
              ) : (
                ngo.ngoName
              )}
            </h3>
            <p>
              {editMode ? (
                <input
                  value={editedFields.city || ''}
                  onChange={(e) => handleFieldChange('city', e.target.value)}
                  className="profile-input"
                  style={{ textAlign: 'center', width: '100%' }}
                  placeholder="Location"
                />
              ) : (
                `${ngo.city}, ${ngo.state}`
              )}
            </p>
          </div>
          
          {/* About Section */}
          <div className="profile-section">
            <h4>About</h4>
            {editMode ? (
              <textarea
                value={editedFields.description || ''}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                className="profile-textarea"
                placeholder="Tell us about your organization"
              />
            ) : (
              <p>{ngo.description}</p>
            )}
          </div>

          {/* Contact Info */}
          <div className="profile-section">
            <h4>Contact Information</h4>
            <div className="profile-detail-row">
              <span>Email</span>
              <span>{ngo.email}</span>
            </div>
            <div className="profile-detail-row">
              <span>Phone</span>
              <span>
                {editMode ? (
                  <input
                    value={editedFields.phone || ''}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    className="profile-input"
                  />
                ) : (
                  ngo.phone
                )}
              </span>
            </div>
          </div>

          {/* Custom Fields */}
          {Object.entries(ngo).map(([key, value]) =>
            !excludedFields.includes(key) && (
              <div key={key} className="profile-section">
                <h4>{key}</h4>
                {editMode ? (
                  <input
                    value={editedFields[key] || ''}
                    onChange={(e) => handleFieldChange(key, e.target.value)}
                    className="profile-input"
                  />
                ) : (
                  <p>{value}</p>
                )}
              </div>
            )
          )}

          {/* Add Section */}
          {showAddSection && (
            <div className="add-section-container">
              <input
                placeholder="Section Title"
                value={newField}
                onChange={(e) => setNewField(e.target.value)}
                className="profile-input"
              />
              <textarea
                placeholder="Content"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="profile-textarea"
              />
              <div className="button-group">
                <button className="profile-button" onClick={handleAddSection}>
                  Add
                </button>
                <button 
                  className="profile-button profile-button-outline" 
                  onClick={() => setShowAddSection(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="profile-actions">
            <button 
              className="profile-button" 
              onClick={() => editMode ? handleSaveEdits() : setEditMode(true)}
            >
              {editMode ? 'Save Profile' : 'Edit Profile'}
            </button>
            {!editMode && !showAddSection && (
              <button 
                className="profile-button profile-button-outline"
                onClick={() => setShowAddSection(true)}
              >
                Add Section
              </button>
            )}
            <button 
              className="profile-button profile-button-red"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main Feed */}
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

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="connections-card">
            <div className="card-header">
              <h4>Your Network</h4>
              <button className="card-menu">
                <i className="icon more-icon"></i>
              </button>
            </div>
            {connections.map((conn, index) => (
              <div key={index} className="connection">
                <img src="https://via.placeholder.com/40" alt={conn.name} className="connection-img" />
                <div className="connection-info">
                  <p className="connection-name">{conn.name}</p>
                  <small className="connection-title">{conn.title}</small>
                </div>
                <button className="connection-action">
                  <i className="icon connect-icon"></i>
                </button>
              </div>
            ))}
            <button className="view-all-btn">View all</button>
          </div>
          
          <div className="resources-card">
            <div className="card-header">
              <h4>Resources</h4>
            </div>
            <ul className="resources-list">
              <li>
                <a href="#" className="resource-link">
                  <i className="icon funding-icon"></i>
                  <span>Funding Opportunities</span>
                </a>
              </li>
              <li>
                <a href="#" className="resource-link">
                  <i className="icon capacity-icon"></i>
                  <span>Capacity Building</span>
                </a>
              </li>
              <li>
                <a href="#" className="resource-link">
                  <i className="icon volunteer-icon"></i>
                  <span>Volunteer Management</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="ad-card">
            <p className="ad-label">Advertisement</p>
            <div className="ad-content">
              <p>Empower your organization with our premium tools</p>
              <button className="ad-button">Learn More</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LinkedInProfileDashboard;