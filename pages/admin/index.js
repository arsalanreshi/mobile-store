import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/AdminLayout';
import DashboardStats from '../../components/admin/DashboardStats';
import RecentOrders from '../../components/admin/RecentOrders';
import SalesChart from '../../components/admin/SalesChart';
import TopProducts from '../../components/admin/TopProducts';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalRevenue: 125000,
      totalOrders: 1250,
      totalProducts: 89,
      totalUsers: 450
    },
    recentOrders: [
      { id: 'ORD-001', customer: 'John Doe', amount: 299.99, status: 'completed', date: '2024-01-15' },
      { id: 'ORD-002', customer: 'Jane Smith', amount: 149.99, status: 'pending', date: '2024-01-15' },
      { id: 'ORD-003', customer: 'Mike Johnson', amount: 89.99, status: 'shipped', date: '2024-01-14' },
      { id: 'ORD-004', customer: 'Sarah Wilson', amount: 199.99, status: 'completed', date: '2024-01-14' },
      { id: 'ORD-005', customer: 'David Brown', amount: 349.99, status: 'processing', date: '2024-01-13' }
    ],
    salesData: [
      { month: 'Jan', sales: 12000 },
      { month: 'Feb', sales: 15000 },
      { month: 'Mar', sales: 18000 },
      { month: 'Apr', sales: 22000 },
      { month: 'May', sales: 25000 },
      { month: 'Jun', sales: 28000 }
    ],
    topProducts: [
      { id: 1, name: 'iPhone 15 Pro', sales: 150, revenue: 149850 },
      { id: 2, name: 'Samsung Galaxy S24', sales: 120, revenue: 95880 },
      { id: 3, name: 'AirPods Pro', sales: 200, revenue: 49800 },
      { id: 4, name: 'Apple Watch Series 9', sales: 80, revenue: 31920 },
      { id: 5, name: 'MacBook Air M3', sales: 45, revenue: 53955 }
    ]
  });

  useEffect(() => {
    // Check admin authentication
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
      return;
    }

    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [router]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here's what's happening with your store today.</p>
        </div>

        <DashboardStats stats={dashboardData.stats} />

        <div className="dashboard-grid">
          <div className="dashboard-section">
            <SalesChart data={dashboardData.salesData} />
          </div>
          
          <div className="dashboard-section">
            <TopProducts products={dashboardData.topProducts} />
          </div>
        </div>

        <div className="dashboard-section full-width">
          <RecentOrders orders={dashboardData.recentOrders} />
        </div>
      </div>
    </AdminLayout>
  );
}
