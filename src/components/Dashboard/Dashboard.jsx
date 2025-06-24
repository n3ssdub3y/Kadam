import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, collection, setDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../cloudinary';
import './Dashboard.css'; // We'll update this CSS

const LinkedInProfileDashboard = () => {
  // LinkedIn components state
  const [posts, setPosts] = useState([
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
  ]);

  const [connections, setConnections] = useState([
    { name: 'Alex Johnson', title: 'UX Designer' },
    { name: 'Sarah Williams', title: 'Marketing Specialist' },
    { name: 'Michael Brown', title: 'Data Scientist' }
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

  if (!ngo) return <div className="linkedin-container"><p>Loading NGO data...</p></div>;

  return (
    <div className="linkedin-container">
      {/* Header - LinkedIn Style */}
      <header className="linkedin-header">
        <div className="logo">
          <Link to="/">Kadam</Link>
        </div>
        <nav className="main-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/network">My Network</Link>
          <Link to="/opportunities">Opportunities</Link>
          <Link to="/messaging">Messaging</Link>
          <Link to="/notifications">Notifications</Link>
        </nav>
        <div className="user-menu" onClick={() => navigate('/profile')}>
          {logoURL ? (
            <img src={logoURL} 
            alt="Profile"
             className="profile-pic-small" />
          ) : (
            <div className="profile-pic-placeholder-small">
              {ngo.ngoName.charAt(0)}
            </div>
          )}
          <span>{ngo.ngoName}</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="linkedin-content">
        {/* Left Sidebar - Profile Section */}
        <aside className="left-sidebar">
          <div className="profile-card">
            <div className="profile-bg"></div>
            <label htmlFor="upload-logo" className="profile-logo-label">
              {logoURL ? (
                <img src={logoURL} 
                alt="NGO Logo" 
                className="profile-img-medium" />
              ) : (
                <div className="profile-img-placeholder-medium">Upload Logo</div>
              )}
            </label>
            {/* <input
              id="upload-logo"
              type="file"
              accept="image/*"
              className="hidden-input"
              onChange={handleImageUpload}
            /> */}
            
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

        {/* Main Feed - Organization Updates */}
        <main className="main-feed">
          <div className="post-creator">
            
            <input 
              type="text" 
              placeholder="Share an update about your organization..." 
            />
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

        {/* Right Sidebar - Connections/Resources */}
        <aside className="right-sidebar">
          <div className="connections-card">
            <h4>Your Network</h4>
            {connections.map((conn, index) => (
              <div key={index} className="connection">
                <img src="https://via.placeholder.com/40" alt={conn.name} />
                <div>
                  <p>{conn.name}</p>
                  <small>{conn.title}</small>
                </div>
              </div>
            ))}
            <button className="view-all-btn">View all</button>
          </div>
          
          <div className="resources-card">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Funding Opportunities</a></li>
              <li><a href="#">Capacity Building</a></li>
              <li><a href="#">Volunteer Management</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LinkedInProfileDashboard;