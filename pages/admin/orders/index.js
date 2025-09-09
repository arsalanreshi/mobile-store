import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/AdminLayout';
import OrderTable from '../../../components/admin/OrderTable';
import OrderModal from '../../../components/admin/OrderModal';

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock order data
  const mockOrders = [
    {
      id: 'ORD-001',
      customer: 'John Smith',
      email: 'john@example.com',
      phone: '+1-555-0123',
      amount: 1299,
      status: 'completed',
      date: '2024-01-15',
      items: [
        { id: 1, name: 'iPhone 15 Pro', price: 999, quantity: 1 },
        { id: 2, name: 'AirPods Pro', price: 249, quantity: 1 },
        { id: 3, name: 'Phone Case', price: 29, quantity: 1 }
      ],
      shipping: {
        address: '123 Main St, New York, NY 10001',
        method: 'Express Shipping',
        cost: 15
      },
      payment: {
        method: 'Credit Card',
        last4: '4242'
      }
    },
    {
      id: 'ORD-002',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1-555-0124',
      amount: 799,
      status: 'shipped',
      date: '2024-01-14',
      items: [
        { id: 2, name: 'Samsung Galaxy S24', price: 799, quantity: 1 }
      ],
      shipping: {
        address: '456 Oak Ave, Los Angeles, CA 90210',
        method: 'Standard Shipping',
        cost: 10
      },
      payment: {
        method: 'PayPal',
        last4: null
      }
    },
    {
      id: 'ORD-003',
      customer: 'Mike Davis',
      email: 'mike@example.com',
      phone: '+1-555-0125',
      amount: 399,
      status: 'processing',
      date: '2024-01-13',
      items: [
        { id: 4, name: 'Apple Watch Series 9', price: 399, quantity: 1 }
      ],
      shipping: {
        address: '789 Pine St, Chicago, IL 60601',
        method: 'Standard Shipping',
        cost: 10
      },
      payment: {
        method: 'Credit Card',
        last4: '1234'
      }
    },
    {
      id: 'ORD-004',
      customer: 'Emily Wilson',
      email: 'emily@example.com',
      phone: '+1-555-0126',
      amount: 1199,
      status: 'pending',
      date: '2024-01-12',
      items: [
        { id: 5, name: 'MacBook Air M3', price: 1199, quantity: 1 }
      ],
      shipping: {
        address: '321 Elm St, Miami, FL 33101',
        method: 'Express Shipping',
        cost: 15
      },
      payment: {
        method: 'Credit Card',
        last4: '5678'
      }
    },
    {
      id: 'ORD-005',
      customer: 'David Brown',
      email: 'david@example.com',
      phone: '+1-555-0127',
      amount: 498,
      status: 'completed',
      date: '2024-01-11',
      items: [
        { id: 2, name: 'AirPods Pro', price: 249, quantity: 2 }
      ],
      shipping: {
        address: '654 Maple Dr, Seattle, WA 98101',
        method: 'Standard Shipping',
        cost: 10
      },
      payment: {
        method: 'Apple Pay',
        last4: null
      }
    }
  ];

  useEffect(() => {
    // Check admin authentication
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
      return;
    }

    // Load orders
    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, [router]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ['all', 'pending', 'processing', 'shipped', 'completed'];

  const getOrderStats = () => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'pending').length;
    const processing = orders.filter(o => o.status === 'processing').length;
    const shipped = orders.filter(o => o.status === 'shipped').length;
    const completed = orders.filter(o => o.status === 'completed').length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

    return { total, pending, processing, shipped, completed, totalRevenue };
  };

  const stats = getOrderStats();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="orders-page">
        <div className="page-header">
          <div className="header-left">
            <h1>Orders Management</h1>
            <p>Track and manage customer orders</p>
          </div>
        </div>

        <div className="orders-stats">
          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Orders</h3>
              <span className="stat-icon">📦</span>
            </div>
            <div className="stat-value">{stats.total}</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Pending</h3>
              <span className="stat-icon">⏳</span>
            </div>
            <div className="stat-value">{stats.pending}</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Processing</h3>
              <span className="stat-icon">⚙️</span>
            </div>
            <div className="stat-value">{stats.processing}</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Shipped</h3>
              <span className="stat-icon">🚚</span>
            </div>
            <div className="stat-value">{stats.shipped}</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Completed</h3>
              <span className="stat-icon">✅</span>
            </div>
            <div className="stat-value">{stats.completed}</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Revenue</h3>
              <span className="stat-icon">💰</span>
            </div>
            <div className="stat-value">${stats.totalRevenue.toLocaleString()}</div>
          </div>
        </div>

        <div className="orders-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search orders by ID, customer, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <OrderTable
          orders={filteredOrders}
          onView={handleViewOrder}
          onUpdateStatus={handleUpdateStatus}
        />

        {showModal && selectedOrder && (
          <OrderModal
            order={selectedOrder}
            onClose={() => setShowModal(false)}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </div>
    </AdminLayout>
  );
}
