import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });
  const [activeTab, setActiveTab] = useState('profile');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setFormData({
      name: parsedUser.name || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || '',
      address: parsedUser.address || '',
      city: parsedUser.city || '',
      zipCode: parsedUser.zipCode || '',
    });
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Profile - Atim Communication</title>
      </Head>
      <div className="profile-container">
        <div className="profile-nav">
          <Link href="/" className="back-to-home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
        </div>
        
        <div className="profile-header">
          <div className="profile-avatar">
            <Image
              src={user.avatar || '/images/default-avatar.svg'}
              alt="Profile"
              width={120}
              height={120}
              className="avatar-image"
            />
            <button className="avatar-edit-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">12</span>
                <span className="stat-label">Orders</span>
              </div>
              <div className="stat">
                <span className="stat-number">₹45,230</span>
                <span className="stat-label">Total Spent</span>
              </div>
              <div className="stat">
                <span className="stat-number">Gold</span>
                <span className="stat-label">Member Status</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-tabs">
            <button
              className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile Information
            </button>
            <button
              className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Order History
            </button>
            <button
              className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'profile' && (
              <div className="profile-form-section">
                <div className="section-header">
                  <h2>Personal Information</h2>
                  <button
                    className="edit-btn"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter city"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group full-width">
                      <label>Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter full address"
                        rows="3"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter ZIP code"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="form-actions">
                      <button className="save-btn" onClick={handleSave}>
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="orders-section">
                <h2>Recent Orders</h2>
                <div className="orders-list">
                  <div className="order-item">
                    <div className="order-info">
                      <h3>Order #12345</h3>
                      <p>iPhone 15 Pro, AirPods Pro</p>
                      <span className="order-date">Dec 15, 2024</span>
                    </div>
                    <div className="order-status">
                      <span className="status delivered">Delivered</span>
                      <span className="order-total">₹1,25,000</span>
                    </div>
                  </div>
                  <div className="order-item">
                    <div className="order-info">
                      <h3>Order #12344</h3>
                      <p>Samsung Galaxy Watch, Phone Case</p>
                      <span className="order-date">Dec 10, 2024</span>
                    </div>
                    <div className="order-status">
                      <span className="status shipped">Shipped</span>
                      <span className="order-total">₹25,500</span>
                    </div>
                  </div>
                  <div className="order-item">
                    <div className="order-info">
                      <h3>Order #12343</h3>
                      <p>MacBook Air, Magic Mouse</p>
                      <span className="order-date">Dec 5, 2024</span>
                    </div>
                    <div className="order-status">
                      <span className="status processing">Processing</span>
                      <span className="order-total">₹95,000</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="settings-section">
                <h2>Account Settings</h2>
                <div className="settings-list">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Email Notifications</h3>
                      <p>Receive updates about your orders and promotions</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>SMS Notifications</h3>
                      <p>Get SMS updates for order status</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Marketing Communications</h3>
                      <p>Receive promotional offers and deals</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="danger-zone">
                  <h3>Danger Zone</h3>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                  <button className="delete-btn">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
