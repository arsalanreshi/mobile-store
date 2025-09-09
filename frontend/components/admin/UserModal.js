import { useState } from 'react';

export default function UserModal({ user, onClose, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onUpdate(user.id, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status
    });
    setIsEditing(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'red';
      default: return 'gray';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'purple';
      case 'customer': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="user-modal">
        <div className="modal-header">
          <h2>User Details - {user.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="user-content">
          <div className="user-profile">
            <div className="profile-avatar">
              <img src={user.avatar} alt={user.name} />
            </div>
            <div className="profile-info">
              <h3>{user.name}</h3>
              <p>User ID: {user.id}</p>
              <div className="profile-badges">
                <span className={`role-badge ${getRoleColor(user.role)}`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
                <span className={`status-badge ${getStatusColor(user.status)}`}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="user-sections">
            <div className="user-section">
              <h3>Personal Information</h3>
              {isEditing ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Role:</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status:</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="info-grid">
                  <div className="info-item">
                    <label>Name:</label>
                    <span>{user.name}</span>
                  </div>
                  <div className="info-item">
                    <label>Email:</label>
                    <span>{user.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Phone:</label>
                    <span>{user.phone}</span>
                  </div>
                  <div className="info-item">
                    <label>Join Date:</label>
                    <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="info-item">
                    <label>Last Login:</label>
                    <span>{new Date(user.lastLogin).toLocaleDateString()}</span>
                  </div>
                </div>
              )}
            </div>

            {user.role === 'customer' && (
              <div className="user-section">
                <h3>Purchase History</h3>
                <div className="purchase-stats">
                  <div className="stat-item">
                    <div className="stat-value">{user.totalOrders}</div>
                    <div className="stat-label">Total Orders</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">${user.totalSpent.toLocaleString()}</div>
                    <div className="stat-label">Total Spent</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">
                      ${user.totalOrders > 0 ? Math.round(user.totalSpent / user.totalOrders).toLocaleString() : '0'}
                    </div>
                    <div className="stat-label">Average Order</div>
                  </div>
                </div>
              </div>
            )}

            <div className="user-section">
              <h3>Account Activity</h3>
              <div className="activity-timeline">
                <div className="activity-item">
                  <div className="activity-icon">👤</div>
                  <div className="activity-content">
                    <div className="activity-title">Account Created</div>
                    <div className="activity-date">{new Date(user.joinDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">🔐</div>
                  <div className="activity-content">
                    <div className="activity-title">Last Login</div>
                    <div className="activity-date">{new Date(user.lastLogin).toLocaleDateString()}</div>
                  </div>
                </div>
                {user.totalOrders > 0 && (
                  <div className="activity-item">
                    <div className="activity-icon">🛍️</div>
                    <div className="activity-content">
                      <div className="activity-title">First Purchase</div>
                      <div className="activity-date">Completed {user.totalOrders} orders</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          {isEditing ? (
            <>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button className="cancel-btn" onClick={onClose}>
                Close
              </button>
              {user.role !== 'admin' && (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  Edit User
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
