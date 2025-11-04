import React, { useState } from 'react';
import { Bell, Shield, CreditCard, Truck, Globe, Moon, Sun, ChevronRight, ToggleLeft as Toggle } from 'lucide-react';

const SettingsView = () => {
  const [settings, setSettings] = useState({
    notifications: {
      orderUpdates: true,
      promotions: false,
      newsletter: true,
      security: true
    },
    preferences: {
      language: 'English',
      currency: 'USD',
      darkMode: false
    },
    privacy: {
      profileVisible: true,
      activityTracking: false,
      dataSharing: false
    }
  });

  const toggleSetting = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`toggle-switch ${enabled ? 'active' : ''}`}
    >
    </button>
  );

  return (
    <div className="settings-container">
      <h2 className="section-title mb-5">Settings</h2>
      
      <div className="settings-sections">
        {/* Notifications */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-title">
              <Bell size={20} style={{color: '#1976d2'}} />
              <h3>Notifications</h3>
            </div>
          </div>
          <div className="settings-section-content">
            <div className="settings-items">
            <div className="settings-item">
              <div className="settings-item-info">
                <h4 className="font-medium text-gray-900">Order Updates</h4>
                <p className="text-sm text-gray-600">Get notified about order status changes</p>
              </div>
              <ToggleSwitch
                enabled={settings.notifications.orderUpdates}
                onChange={() => toggleSetting('notifications', 'orderUpdates')}
              />
            </div>
            
            <div className="settings-item">
              <div className="settings-item-info">
                <h4 className="font-medium text-gray-900">Promotions</h4>
                <p className="text-sm text-gray-600">Receive promotional offers and deals</p>
              </div>
              <ToggleSwitch
                enabled={settings.notifications.promotions}
                onChange={() => toggleSetting('notifications', 'promotions')}
              />
            </div>

            <div className="settings-item">
              <div className="settings-item-info">
                <h4 className="font-medium text-gray-900">Newsletter</h4>
                <p className="text-sm text-gray-600">Weekly newsletter with new products</p>
              </div>
              <ToggleSwitch
                enabled={settings.notifications.newsletter}
                onChange={() => toggleSetting('notifications', 'newsletter')}
              />
            </div>

            <div className="settings-item">
              <div className="settings-item-info">
                <h4 className="font-medium text-gray-900">Security Alerts</h4>
                <p className="text-sm text-gray-600">Important security notifications</p>
              </div>
              <ToggleSwitch
                enabled={settings.notifications.security}
                onChange={() => toggleSetting('notifications', 'security')}
              />
            </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-title">
              <Globe size={20} style={{color: '#1976d2'}} />
              <h3>Preferences</h3>
            </div>
          </div>
          <div className="settings-section-content">
            <div className="settings-items">
            <div className="settings-item">
              <div className="settings-item-info">
                <h4 className="font-medium text-gray-900">Language</h4>
                <p className="text-sm text-gray-600">Choose your preferred language</p>
              </div>
              <select 
                value={settings.preferences.language}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, language: e.target.value }
                }))}
                className="settings-select"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>

            <div className="settings-item">
              <div className="settings-item-info">
                <h4 className="font-medium text-gray-900">Currency</h4>
                <p className="text-sm text-gray-600">Display prices in your currency</p>
              </div>
              <select 
                value={settings.preferences.currency}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, currency: e.target.value }
                }))}
                className="settings-select"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>

            <div className="settings-item">
              <div className="settings-item-info">
                <h4 className="font-medium text-gray-900">Dark Mode</h4>
                <p className="text-sm text-gray-600">Toggle dark theme</p>
              </div>
              <ToggleSwitch
                enabled={settings.preferences.darkMode}
                onChange={() => toggleSetting('preferences', 'darkMode')}
              />
            </div>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-title">
              <Shield size={20} style={{color: '#1976d2'}} />
              <h3>Privacy & Security</h3>
            </div>
          </div>
          <div className="settings-section-content">
            <div className="settings-items">
            <div className="settings-item">
              <div className="settings-item-info">
                <h4 className="font-medium text-gray-900">Profile Visibility</h4>
                <p className="text-sm text-gray-600">Make your profile visible to other users</p>
              </div>
              <ToggleSwitch
                enabled={settings.privacy.profileVisible}
                onChange={() => toggleSetting('privacy', 'profileVisible')}
              />
            </div>

            <div className="settings-item">
              <div className="settings-item-info">
                <h4 className="font-medium text-gray-900">Activity Tracking</h4>
                <p className="text-sm text-gray-600">Track browsing and purchase history</p>
              </div>
              <ToggleSwitch
                enabled={settings.privacy.activityTracking}
                onChange={() => toggleSetting('privacy', 'activityTracking')}
              />
            </div>

            <div className="settings-item">
              <div className="settings-item-info">
                <h4 className="font-medium text-gray-900">Data Sharing</h4>
                <p className="text-sm text-gray-600">Share data with third-party partners</p>
              </div>
              <ToggleSwitch
                enabled={settings.privacy.dataSharing}
                onChange={() => toggleSetting('privacy', 'dataSharing')}
              />
            </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="settings-section">
          <div className="settings-section-header">
            <h3 className="settings-section-title">Quick Actions</h3>
          </div>
          <div className="settings-section-content">
            <div className="quick-actions">
            <button className="quick-action-btn">
              <div className="quick-action-content">
                <CreditCard size={20} style={{color: '#666'}} />
                <span className="quick-action-text">Payment Methods</span>
              </div>
              <ChevronRight size={20} style={{color: '#ccc'}} />
            </button>

            <button className="quick-action-btn">
              <div className="quick-action-content">
                <Truck size={20} style={{color: '#666'}} />
                <span className="quick-action-text">Delivery Preferences</span>
              </div>
              <ChevronRight size={20} style={{color: '#ccc'}} />
            </button>

            <button className="quick-action-btn danger">
              <div className="quick-action-content">
                <Shield size={20} />
                <span className="quick-action-text">Delete Account</span>
              </div>
              <ChevronRight size={20} />
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;