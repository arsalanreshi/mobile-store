export default function UserTable({ users, onView, onUpdate, onDelete }) {
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

  const handleStatusToggle = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    onUpdate(userId, { status: newStatus });
  };

  return (
    <div className="user-table">
      <div className="table-header">
        <div className="col">User</div>
        <div className="col">Contact</div>
        <div className="col">Role</div>
        <div className="col">Status</div>
        <div className="col">Orders</div>
        <div className="col">Total Spent</div>
        <div className="col">Last Login</div>
        <div className="col">Actions</div>
      </div>
      
      <div className="table-body">
        {users.map((user) => (
          <div key={user.id} className="table-row">
            <div className="col user-info">
              <div className="user-avatar">
                <img src={user.avatar} alt={user.name} />
              </div>
              <div className="user-details">
                <div className="user-name">{user.name}</div>
                <div className="user-id">ID: {user.id}</div>
              </div>
            </div>
            <div className="col contact">
              <div className="contact-info">
                <div className="email">{user.email}</div>
                <div className="phone">{user.phone}</div>
              </div>
            </div>
            <div className="col role">
              <span className={`role-badge ${getRoleColor(user.role)}`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
            <div className="col status">
              <button
                className={`status-toggle ${getStatusColor(user.status)}`}
                onClick={() => handleStatusToggle(user.id, user.status)}
                title={`Click to ${user.status === 'active' ? 'deactivate' : 'activate'}`}
              >
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </button>
            </div>
            <div className="col orders">{user.totalOrders}</div>
            <div className="col spent">${user.totalSpent.toLocaleString()}</div>
            <div className="col last-login">
              {new Date(user.lastLogin).toLocaleDateString()}
            </div>
            <div className="col actions">
              <button 
                className="action-btn view"
                onClick={() => onView(user)}
                title="View User Details"
              >
                👁️
              </button>
              {user.role !== 'admin' && (
                <button 
                  className="action-btn delete"
                  onClick={() => onDelete(user.id)}
                  title="Delete User"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {users.length === 0 && (
        <div className="empty-state">
          <p>No users found</p>
        </div>
      )}
    </div>
  );
}
