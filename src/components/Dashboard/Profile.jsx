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

const Profile = () => {
  const [ngo, setNgo] = useState(null);
  const [logoURL, setLogoURL] = useState('');
  const [descInput, setDescInput] = useState('');
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
        setDescInput(data.description || '');
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
          {logoURL ? (
            <img
              src={logoURL}
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

        {/* Render custom fields (excluding known fields) */}
        {Object.entries(ngo).map(([key, value]) =>
          !excludedFields.includes(key) && (
            <p key={key}>
              <strong>{key}:</strong>{' '}
              {editMode ? (
                <input
                  value={editedFields[key] || ''}
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                />
              ) : value}
            </p>
          )
        )}

        {/* Add Section UI */}
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

        {/* Buttons */}
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button onClick={() => editMode ? handleSaveEdits() : setEditMode(true)}>
            {editMode ? 'Save Profile' : 'Edit Profile'}
          </button>
          <button onClick={() => setShowAddSection(true)}>Add a Section</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
