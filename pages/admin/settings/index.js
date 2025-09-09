import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/AdminLayout';

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Atim Communication',
      siteDescription: 'Your trusted mobile and electronics store',
      contactEmail: 'info@atimcommunication.com',
      contactPhone: '+1-555-0100',
      address: '123 Tech Street, Digital City, DC 12345'
    },
    business: {
      currency: 'USD',
      taxRate: 8.5,
      shippingFee: 10,
      freeShippingThreshold: 100,
      businessHours: '9:00 AM - 6:00 PM',
      timezone: 'America/New_York'
    },
    notifications: {
      emailNotifications: true,
      orderAlerts: true,
      lowStockAlerts: true,
      customerSignups: false,
      dailyReports: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5
    }
  });

  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Check admin authentication
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
      return;
    }

    // Load settings
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [router]);

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
    setHasChanges(false);
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default values
      setHasChanges(false);
      alert('Settings reset to default values!');
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'business', label: 'Business', icon: '🏢' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' }
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="loading-spinner"></div>
          <p>Loading settings...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="settings-page">
        <div className="page-header">
          <div className="header-left">
            <h1>Settings</h1>
            <p>Configure your store settings and preferences</p>
          </div>
          {hasChanges && (
            <div className="settings-actions">
              <button className="reset-btn" onClick={handleReset}>
                Reset
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="settings-container">
          <div className="settings-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="settings-content">
            {activeTab === 'general' && (
              <div className="settings-section">
                <h2>General Settings</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Site Name</label>
                    <input
                      type="text"
                      value={settings.general.siteName}
                      onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Email</label>
                    <input
                      type="email"
                      value={settings.general.contactEmail}
                      onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Phone</label>
                    <input
                      type="tel"
                      value={settings.general.contactPhone}
                      onChange={(e) => handleInputChange('general', 'contactPhone', e.target.value)}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Site Description</label>
                    <textarea
                      value={settings.general.siteDescription}
                      onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
                      rows="3"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Business Address</label>
                    <textarea
                      value={settings.general.address}
                      onChange={(e) => handleInputChange('general', 'address', e.target.value)}
                      rows="2"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'business' && (
              <div className="settings-section">
                <h2>Business Settings</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Currency</label>
                    <select
                      value={settings.business.currency}
                      onChange={(e) => handleInputChange('business', 'currency', e.target.value)}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tax Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={settings.business.taxRate}
                      onChange={(e) => handleInputChange('business', 'taxRate', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Shipping Fee ($)</label>
                    <input
                      type="number"
                      value={settings.business.shippingFee}
                      onChange={(e) => handleInputChange('business', 'shippingFee', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Free Shipping Threshold ($)</label>
                    <input
                      type="number"
                      value={settings.business.freeShippingThreshold}
                      onChange={(e) => handleInputChange('business', 'freeShippingThreshold', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Business Hours</label>
                    <input
                      type="text"
                      value={settings.business.businessHours}
                      onChange={(e) => handleInputChange('business', 'businessHours', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Timezone</label>
                    <select
                      value={settings.business.timezone}
                      onChange={(e) => handleInputChange('business', 'timezone', e.target.value)}
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="settings-section">
                <h2>Notification Settings</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                      />
                      <span>Email Notifications</span>
                    </label>
                    <p className="field-description">Receive general email notifications</p>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={settings.notifications.orderAlerts}
                        onChange={(e) => handleInputChange('notifications', 'orderAlerts', e.target.checked)}
                      />
                      <span>Order Alerts</span>
                    </label>
                    <p className="field-description">Get notified about new orders</p>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={settings.notifications.lowStockAlerts}
                        onChange={(e) => handleInputChange('notifications', 'lowStockAlerts', e.target.checked)}
                      />
                      <span>Low Stock Alerts</span>
                    </label>
                    <p className="field-description">Alert when products are running low</p>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={settings.notifications.customerSignups}
                        onChange={(e) => handleInputChange('notifications', 'customerSignups', e.target.checked)}
                      />
                      <span>Customer Signups</span>
                    </label>
                    <p className="field-description">Notify about new customer registrations</p>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={settings.notifications.dailyReports}
                        onChange={(e) => handleInputChange('notifications', 'dailyReports', e.target.checked)}
                      />
                      <span>Daily Reports</span>
                    </label>
                    <p className="field-description">Receive daily sales and activity reports</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="settings-section">
                <h2>Security Settings</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                      />
                      <span>Two-Factor Authentication</span>
                    </label>
                    <p className="field-description">Enable 2FA for enhanced security</p>
                  </div>
                  <div className="form-group">
                    <label>Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password Expiry (days)</label>
                    <input
                      type="number"
                      value={settings.security.passwordExpiry}
                      onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Login Attempts</label>
                    <input
                      type="number"
                      value={settings.security.loginAttempts}
                      onChange={(e) => handleInputChange('security', 'loginAttempts', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
