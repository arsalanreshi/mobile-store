export default function RecentOrders({ orders }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'pending': return 'orange';
      case 'shipped': return 'blue';
      case 'processing': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <div className="recent-orders">
      <div className="section-header">
        <h3>Recent Orders</h3>
        <p>Latest customer orders</p>
      </div>
      
      <div className="orders-table">
        <div className="table-header">
          <div className="col">Order ID</div>
          <div className="col">Customer</div>
          <div className="col">Amount</div>
          <div className="col">Status</div>
          <div className="col">Date</div>
          <div className="col">Actions</div>
        </div>
        
        <div className="table-body">
          {orders.map((order) => (
            <div key={order.id} className="table-row">
              <div className="col order-id">{order.id}</div>
              <div className="col customer">{order.customer}</div>
              <div className="col amount">${order.amount}</div>
              <div className="col status">
                <span className={`status-badge ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="col date">{order.date}</div>
              <div className="col actions">
                <button className="action-btn view">👁️</button>
                <button className="action-btn edit">✏️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
