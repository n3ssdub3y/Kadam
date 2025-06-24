import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  setDoc
} from 'firebase/firestore';
import { uploadToCloudinary } from '../../cloudinary';
import './Dashboard.css';

const Profile = () => {
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

  if (!ngo) return <div className="profile-panel"><p>Loading NGO data...</p></div>;

  return (
    <div className="profile-panel">
      <div className="profile-logo-container">

        <button 
          className="edit-button-mini" 
          onClick={() => editMode ? saveProfile() : setEditMode(true)}
        >
          {editMode ? '💾' : '✏️'}
        </button>

        <label htmlFor="upload-logo" className="profile-logo-label">
          {logoURL ? (
            <img
              src={logoURL}
              alt="NGO Logo"
              className="profile-logo-img"
            />
          ) : (
            <div className="profile-logo-placeholder">
              Upload Logo
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
      </div>

      <div className="profile-org-name">
        {editMode ? (
          <input
            value={editedFields.ngoName || ''}
            onChange={(e) => handleFieldChange('ngoName', e.target.value)}
            className="profile-input"
            placeholder="Organization Name"
            style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: '700' }}
          />
        ) : ngo.ngoName}
      </div>

      {ngo.description && (
        <div className="profile-description">
          {editMode ? (
            <textarea
              value={editedFields.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Tell us about your NGO"
              className="profile-textarea"
            />
          ) : (
            ngo.description
          )}
        </div>
      )}

      <div className="profile-details-container">
        {['city', 'state', 'phone'].map(field => (
          <div key={field} className="profile-detail-row">
            <span className="profile-detail-label">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </span>
            <span className="profile-detail-value">
              {editMode ? (
                <input
                  value={editedFields[field] || ''}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                  className="profile-input"
                  style={{ width: '100%', padding: '0.3rem' }}
                />
              ) : (
                ngo[field]
              )}
            </span>
          </div>
        ))}

        {/* Render custom fields */}
        {Object.entries(ngo).map(([key, value]) =>
          !excludedFields.includes(key) && (
            <div key={key} className="profile-detail-row">
              <span className="profile-detail-label">{key}</span>
              <span className="profile-detail-value">
                {editMode ? (
                  <input
                    value={editedFields[key] || ''}
                    onChange={(e) => handleFieldChange(key, e.target.value)}
                    className="profile-input"
                    style={{ width: '100%', padding: '0.3rem' }}
                  />
                ) : value}
              </span>
            </div>
          )
        )}
      </div>

      {/* Add Section UI */}
      {showAddSection && (
        <div className="add-section-container">
          <h4>Add a Section</h4>
          <input
            placeholder="Section Title"
            value={newField}
            onChange={(e) => setNewField(e.target.value)}
            className="profile-input"
          />
          <textarea
            placeholder="Enter content"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="profile-textarea"
            style={{ minHeight: '60px' }}
          />
          <button 
            className="profile-button"
            onClick={handleAddSection}
          >
            Add Section
          </button>
        </div>
      )}

      {/* Buttons */}
      <div>
        {!showAddSection && (
          <button 
            className="profile-button profile-button-outline"
            onClick={() => setShowAddSection(true)}
          >
            Add a Section
          </button>
        )}
        
        <button 
          className="profile-button profile-button-red"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;