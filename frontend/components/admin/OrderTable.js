export default function OrderTable({ orders, onView, onUpdateStatus }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'pending': return 'orange';
      case 'shipped': return 'blue';
      case 'processing': return 'purple';
      default: return 'gray';
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    onUpdateStatus(orderId, newStatus);
  };

  return (
    <div className="order-table">
      <div className="table-header">
        <div className="col">Order ID</div>
        <div className="col">Customer</div>
        <div className="col">Email</div>
        <div className="col">Amount</div>
        <div className="col">Status</div>
        <div className="col">Date</div>
        <div className="col">Actions</div>
      </div>
      
      <div className="table-body">
        {orders.map((order) => (
          <div key={order.id} className="table-row">
            <div className="col order-id">{order.id}</div>
            <div className="col customer">
              <div className="customer-info">
                <div className="customer-name">{order.customer}</div>
                <div className="customer-phone">{order.phone}</div>
              </div>
            </div>
            <div className="col email">{order.email}</div>
            <div className="col amount">${order.amount.toLocaleString()}</div>
            <div className="col status">
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className={`status-select ${getStatusColor(order.status)}`}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="col date">{new Date(order.date).toLocaleDateString()}</div>
            <div className="col actions">
              <button 
                className="action-btn view"
                onClick={() => onView(order)}
                title="View Order Details"
              >
                👁️
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {orders.length === 0 && (
        <div className="empty-state">
          <p>No orders found</p>
        </div>
      )}
    </div>
  );
}
