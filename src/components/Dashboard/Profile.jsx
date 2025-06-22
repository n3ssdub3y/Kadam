// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import {
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { uploadToCloudinary } from '../../cloudinary';

const Profile = () => {
  const [ngo, setNgo] = useState(null);
  const [descInput, setDescInput] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [showAddSection, setShowAddSection] = useState(false);
  const [newField, setNewField] = useState('');
  const [newValue, setNewValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNGO = async () => {
      const id = localStorage.getItem('ngoId');
      if (!id) return;
      const refDoc = doc(db, 'NGOs', id);
      const snap = await getDoc(refDoc);
      if (snap.exists()) {
        const data = snap.data();
        setNgo({ id: snap.id, ...data });
        setDescInput(data.description || '');
        setEditedFields(data);
      }
    };
    fetchNGO();
  }, []);

  const handleDescriptionUpdate = async () => {
    const ngoRef = doc(db, 'NGOs', ngo.id);
    await updateDoc(ngoRef, { description: descInput.trim() });
    setNgo(prev => ({ ...prev, description: descInput.trim() }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !ngo) return;
    try {
      const url = await uploadToCloudinary(file);
      const ngoRef = doc(db, 'NGOs', ngo.id);
      await updateDoc(ngoRef, { logoURL: url });
      setNgo(prev => ({ ...prev, logoURL: url }));
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

  if (!ngo) return <p>Loading NGO data...</p>;

  return (
    <div style={{
      width: '340px',
      minHeight: 'auto',
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '16px',
      boxSizing: 'border-box',
      background: '#f9f9f9',
    }}>
      <div style={{ textAlign: 'center' }}>
        <label htmlFor="upload-logo" style={{ cursor: 'pointer' }}>
          {ngo.logoURL ? (
            <img
              src={ngo.logoURL}
              alt="NGO Logo"
              style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
            />
          ) : (
            <div style={{
              width: '200px',
              height: '200px',
              backgroundColor: '#ddd',
              display: 'inline-block',
              borderRadius: '10px',
              lineHeight: '200px',
            }}>
              Upload Logo
            </div>
          )}
        </label>
        <input
          id="upload-logo"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />

        <h2 style={{ marginTop: '12px' }}>
          {editMode ? (
            <input
              value={editedFields.ngoName || ''}
              onChange={(e) => handleFieldChange('ngoName', e.target.value)}
              style={{ fontSize: '1.2em', fontWeight: 'bold', textAlign: 'center' }}
            />
          ) : ngo.ngoName}
        </h2>

        {editMode ? (
          <textarea
            value={editedFields.description || ''}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            placeholder="Tell us about your NGO"
            style={{ width: '100%', height: '60px', resize: 'none' }}
          />
        ) : (
          <p style={{ fontStyle: 'italic' }}>{ngo.description || 'No description provided yet.'}</p>
        )}

        <hr style={{ margin: '16px 0' }} />
        {['city', 'state', 'phone'].map(field => (
          <p key={field}>
            <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>{' '}
            {editMode ? (
              <input
                value={editedFields[field] || ''}
                onChange={(e) => handleFieldChange(field, e.target.value)}
              />
            ) : (
              ngo[field]
            )}
          </p>
        ))}

        {/* Render custom fields */}
        {Object.entries(ngo).map(([key, value]) =>
          !['id', 'logoURL', 'name', 'ngoName', 'email', 'password', 'city', 'state', 'year', 'description', 'phone'].includes(key) && (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          )
        )}

        {/* Action Buttons */}
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button onClick={() => editMode ? handleSaveEdits() : setEditMode(true)}>
            {editMode ? 'Save Profile' : 'Edit Profile'}
          </button>
          <button onClick={() => setShowAddSection(true)}>
            Add a Section
          </button>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Add Section Form (hidden until toggled) */}
        {showAddSection && (
          <div style={{ marginTop: '20px', textAlign: 'left' }}>
            <h4>Add a Section</h4>
            <input
              placeholder="Section Title (e.g. Mission)"
              value={newField}
              onChange={(e) => setNewField(e.target.value)}
              style={{ width: '100%', marginBottom: 4 }}
            />
            <textarea
              placeholder="Enter content"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              style={{ width: '100%', height: '60px', resize: 'none', marginBottom: 8 }}
            />
            <button onClick={handleAddSection} style={{ width: '100%' }}>
              Add Section
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
