import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/AdminLayout';
import UserTable from '../../../components/admin/UserTable';
import UserModal from '../../../components/admin/UserModal';

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1-555-0123',
      role: 'customer',
      status: 'active',
      joinDate: '2024-01-10',
      lastLogin: '2024-01-15',
      totalOrders: 5,
      totalSpent: 2599,
      avatar: '/images/avatars/john.jpg'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1-555-0124',
      role: 'customer',
      status: 'active',
      joinDate: '2024-01-08',
      lastLogin: '2024-01-14',
      totalOrders: 3,
      totalSpent: 1299,
      avatar: '/images/avatars/sarah.jpg'
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike@example.com',
      phone: '+1-555-0125',
      role: 'customer',
      status: 'inactive',
      joinDate: '2024-01-05',
      lastLogin: '2024-01-10',
      totalOrders: 1,
      totalSpent: 399,
      avatar: '/images/avatars/mike.jpg'
    },
    {
      id: 4,
      name: 'Emily Wilson',
      email: 'emily@example.com',
      phone: '+1-555-0126',
      role: 'customer',
      status: 'active',
      joinDate: '2024-01-03',
      lastLogin: '2024-01-13',
      totalOrders: 2,
      totalSpent: 1599,
      avatar: '/images/avatars/emily.jpg'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david@example.com',
      phone: '+1-555-0127',
      role: 'customer',
      status: 'active',
      joinDate: '2024-01-01',
      lastLogin: '2024-01-12',
      totalOrders: 4,
      totalSpent: 1998,
      avatar: '/images/avatars/david.jpg'
    },
    {
      id: 6,
      name: 'Admin User',
      email: 'admin@atimcommunication.com',
      phone: '+1-555-0100',
      role: 'admin',
      status: 'active',
      joinDate: '2023-12-01',
      lastLogin: '2024-01-15',
      totalOrders: 0,
      totalSpent: 0,
      avatar: '/images/avatars/admin.jpg'
    }
  ];

  useEffect(() => {
    // Check admin authentication
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
      return;
    }

    // Load users
    setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, [router]);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleUpdateUser = (userId, userData) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, ...userData }
        : user
    ));
  };

  const handleDeleteUser = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const roleOptions = ['all', 'customer', 'admin'];

  const getUserStats = () => {
    const total = users.length;
    const active = users.filter(u => u.status === 'active').length;
    const inactive = users.filter(u => u.status === 'inactive').length;
    const customers = users.filter(u => u.role === 'customer').length;
    const admins = users.filter(u => u.role === 'admin').length;
    const totalRevenue = users.reduce((sum, user) => sum + user.totalSpent, 0);

    return { total, active, inactive, customers, admins, totalRevenue };
  };

  const stats = getUserStats();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="users-page">
        <div className="page-header">
          <div className="header-left">
            <h1>Users Management</h1>
            <p>Manage customer accounts and administrators</p>
          </div>
        </div>

        <div className="users-stats">
          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Users</h3>
              <span className="stat-icon">👥</span>
            </div>
            <div className="stat-value">{stats.total}</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Active Users</h3>
              <span className="stat-icon">✅</span>
            </div>
            <div className="stat-value">{stats.active}</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Customers</h3>
              <span className="stat-icon">🛍️</span>
            </div>
            <div className="stat-value">{stats.customers}</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Administrators</h3>
              <span className="stat-icon">🔑</span>
            </div>
            <div className="stat-value">{stats.admins}</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Revenue</h3>
              <span className="stat-icon">💰</span>
            </div>
            <div className="stat-value">${stats.totalRevenue.toLocaleString()}</div>
          </div>
        </div>

        <div className="users-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search users by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="role-filter"
          >
            {roleOptions.map(role => (
              <option key={role} value={role}>
                {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <UserTable
          users={filteredUsers}
          onView={handleViewUser}
          onUpdate={handleUpdateUser}
          onDelete={handleDeleteUser}
        />

        {showModal && selectedUser && (
          <UserModal
            user={selectedUser}
            onClose={() => setShowModal(false)}
            onUpdate={handleUpdateUser}
          />
        )}
      </div>
    </AdminLayout>
  );
}
