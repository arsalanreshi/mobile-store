export default function DashboardStats({ stats }) {
  const statItems = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: '💰',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: '📦',
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      title: 'Products',
      value: stats.totalProducts.toString(),
      icon: '🛍️',
      change: '+3.1%',
      changeType: 'positive'
    },
    {
      title: 'Users',
      value: stats.totalUsers.toLocaleString(),
      icon: '👥',
      change: '+15.3%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="dashboard-stats">
      {statItems.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">{stat.icon}</span>
            <span className={`stat-change ${stat.changeType}`}>
              {stat.change}
            </span>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-title">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
