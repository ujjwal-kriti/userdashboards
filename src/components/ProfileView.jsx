import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfileView = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div style={{textAlign: 'center', padding: '60px 20px'}}>
          <User size={64} style={{color: '#ccc', margin: '0 auto 20px'}} />
          <h3 style={{fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px'}}>Please login</h3>
          <p style={{color: '#666'}}>You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-header-content">
            <div className="profile-info">
              <div className="profile-avatar">
                <User size={40} />
              </div>
              <div className="profile-details">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p>{user.email}</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="edit-btn"
            >
              {isEditing ? <X size={20} /> : <Edit2 size={20} />}
            </button>
          </div>
        </div>

        <div className="profile-content">
          <h3 className="profile-section-title">Profile Information</h3>
          
          <div className="profile-fields">
            <div className="profile-field">
              <div className="field-icon">
                <User size={20} />
              </div>
              <div className="field-content">
                <label className="field-label">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p className="field-value">{user.name}</p>
                )}
              </div>
            </div>

            <div className="profile-field">
              <div className="field-icon">
                <Mail size={20} />
              </div>
              <div className="field-content">
                <label className="field-label">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p className="field-value">{user.email}</p>
                )}
              </div>
            </div>

            <div className="profile-field">
              <div className="field-icon">
                <Phone size={20} />
              </div>
              <div className="field-content">
                <label className="field-label">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p className="field-value">{user.phone}</p>
                )}
              </div>
            </div>

            <div className="profile-field">
              <div className="field-icon">
                <MapPin size={20} />
              </div>
              <div className="field-content">
                <label className="field-label">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={editData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="form-textarea"
                  />
                ) : (
                  <p className="field-value">{user.address}</p>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="profile-actions">
              <button
                onClick={handleSave}
                className="btn btn-primary flex align-center"
              >
                <Save size={16} />
                <span>Save Changes</span>
              </button>
              <button
                onClick={handleCancel}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;