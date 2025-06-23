import React, { useEffect, useState } from 'react';
import { useNavigate }           from 'react-router-dom';
import { auth, db }              from '../../firebaseConfig';
import {
  doc,
  getDoc,
  updateDoc,
  setDoc
} from 'firebase/firestore';
import { uploadToCloudinary }    from '../../cloudinary';
import './Dashboard.css'; // Import the same CSS file

const UserProfile = () => {
  const [user, setUser]           = useState(null);
  const [logoURL, setLogoURL]     = useState('');
  const [editMode, setEditMode]   = useState(false);
  const [fields, setFields]       = useState({});
  const [showAdd, setShowAdd]     = useState(false);
  const [newKey, setNewKey]       = useState('');
  const [newVal, setNewVal]       = useState('');
  const navigate                   = useNavigate();

  // fields we don't render as "custom"
  const reserved = ['uid','username','email','photoURL','createdAt','id'];

  useEffect(() => {
    (async () => {
      const uid = auth.currentUser?.uid;
      const docId = localStorage.getItem('userId');
      if (!uid || !docId) {
        navigate('/UserLogin');
        return;
      }

      // 1) load main profile
      const uRef = doc(db, 'Users', docId);
      const uSnap = await getDoc(uRef);
      if (uSnap.exists()) {
        const data = uSnap.data();
        setUser({ id: uSnap.id, ...data });
        setFields(data);
      }

      // 2) load profile pic from subcollection
      const picRef = doc(db, 'Users', docId, 'pics', 'profile');
      const picSnap = await getDoc(picRef);
      if (picSnap.exists()) {
        setLogoURL(picSnap.data().logoURL);
      }
    })();
  }, []);

  const handleImage = async e => {
    const file = e.target.files[0];
    if (!file || !user) return;
    try {
      const url = await uploadToCloudinary(file);
      const picDoc = doc(db, 'Users', user.id, 'pics', 'profile');
      await setDoc(picDoc, { logoURL: url }, { merge: true });
      setLogoURL(url);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  const handleFieldChange = (k,v) => {
    setFields(prev => ({ ...prev, [k]: v }));
  };

  const saveProfile = async () => {
    const uRef = doc(db, 'Users', user.id);
    await updateDoc(uRef, fields);
    setUser(prev => ({ ...prev, ...fields }));
    setEditMode(false);
  };

  const addSection = async () => {
    if (!newKey.trim() || !newVal.trim()) return;
    const uRef = doc(db, 'Users', user.id);
    await updateDoc(uRef, { [newKey.trim()]: newVal.trim() });
    setUser(prev => ({ ...prev, [newKey.trim()]: newVal.trim() }));
    setFields(prev => ({ ...prev, [newKey.trim()]: newVal.trim() }));
    setNewKey('');
    setNewVal('');
    setShowAdd(false);
  };

  const logout = () => {
    auth.signOut();
    localStorage.removeItem('userId');
    navigate('/UserLogin');
  };

  const goto=()=>{
    navigate('/LinkedInHome')
  }
  if (!user) return <div className="profile-panel"><p>Loading user profile…</p></div>;

  return (
    <div className="profile-panel">
      <div className="profile-logo-container">
        <label htmlFor="upload-pic" className="profile-logo-label">
          {logoURL
            ? <img 
                src={logoURL} 
                alt="Profile" 
                className="profile-logo-img"
              />
            : <div className="profile-logo-placeholder">
                Upload
              </div>
          }
        </label>
        <input 
          id="upload-pic" 
          type="file" 
          accept="image/*" 
          className="hidden-input" 
          onChange={handleImage} 
        />
      </div>

      <div className="profile-org-name">
        {editMode
          ? <input
              value={fields.username||''}
              onChange={e => handleFieldChange('username', e.target.value)}
              className="profile-input"
              placeholder="Username"
              style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: '700' }}
            />
          : user.username
        }
      </div>

      <div className="profile-details-container">
        <div className="profile-detail-row">
          <span className="profile-detail-label">Email</span>
          <span className="profile-detail-value">
            {editMode
              ? <input
                  value={fields.email||''}
                  onChange={e => handleFieldChange('email', e.target.value)}
                  className="profile-input"
                  style={{ width: '100%', padding: '0.3rem' }}
                />
              : user.email
            }
          </span>
        </div>

        {/* Render custom fields */}
        {Object.entries(user).map(([k,v]) =>
          !reserved.includes(k) && (
            <div key={k} className="profile-detail-row">
              <span className="profile-detail-label">{k}</span>
              <span className="profile-detail-value">
                {editMode
                  ? <input
                      value={fields[k]||''}
                      onChange={e => handleFieldChange(k, e.target.value)}
                      className="profile-input"
                      style={{ width: '100%', padding: '0.3rem' }}
                    />
                  : v
                }
              </span>
            </div>
          )
        )}
      </div>

      {/* Add Section UI */}
      {showAdd && (
        <div className="add-section-container">
          <h4>Add a Section</h4>
          <input
            placeholder="Field name"
            value={newKey}
            onChange={e => setNewKey(e.target.value)}
            className="profile-input"
          />
          <input
            placeholder="Value"
            value={newVal}
            onChange={e => setNewVal(e.target.value)}
            className="profile-input"
          />
          <button 
            className="profile-button"
            onClick={addSection}
          >
            Add Section
          </button>
        </div>
      )}

      {/* Action buttons */}
      <div>
        <button 
          className="profile-button" 
          onClick={() => editMode ? saveProfile() : setEditMode(true)}
        >
          {editMode ? 'Save Profile' : 'Edit Profile'}
        </button>
        
        {!showAdd && (
          <button 
            className="profile-button profile-button-outline"
            onClick={() => setShowAdd(true)}
          >
            Add a Section
          </button>
        )}
        
        <button 
          className="profile-button profile-button-red"
          onClick={logout}
        >
          Logout
        </button>
        <button  className="profile-button profile-button-red" onClick={goto}>GO</button>
      </div>
    </div>
  );
};

export default UserProfile;