import { useState } from 'react';

export default function OrderModal({ order, onClose, onUpdateStatus }) {
  const [currentStatus, setCurrentStatus] = useState(order.status);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'pending': return 'orange';
      case 'shipped': return 'blue';
      case 'processing': return 'purple';
      default: return 'gray';
    }
  };

  const handleStatusUpdate = () => {
    if (currentStatus !== order.status) {
      onUpdateStatus(order.id, currentStatus);
    }
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = order.shipping.cost;
  const total = subtotal + shipping;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="order-modal">
        <div className="modal-header">
          <h2>Order Details - {order.id}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="order-content">
          <div className="order-section">
            <h3>Customer Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Name:</label>
                <span>{order.customer}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{order.email}</span>
              </div>
              <div className="info-item">
                <label>Phone:</label>
                <span>{order.phone}</span>
              </div>
              <div className="info-item">
                <label>Order Date:</label>
                <span>{new Date(order.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="order-section">
            <h3>Order Items</h3>
            <div className="items-list">
              {order.items.map((item, index) => (
                <div key={index} className="item-row">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price}</span>
                  </div>
                  <div className="item-quantity">
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping ({order.shipping.method}):</span>
                <span>${shipping}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="order-section">
            <h3>Shipping Information</h3>
            <div className="info-grid">
              <div className="info-item full-width">
                <label>Address:</label>
                <span>{order.shipping.address}</span>
              </div>
              <div className="info-item">
                <label>Method:</label>
                <span>{order.shipping.method}</span>
              </div>
              <div className="info-item">
                <label>Cost:</label>
                <span>${order.shipping.cost}</span>
              </div>
            </div>
          </div>

          <div className="order-section">
            <h3>Payment Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Method:</label>
                <span>{order.payment.method}</span>
              </div>
              {order.payment.last4 && (
                <div className="info-item">
                  <label>Card:</label>
                  <span>****{order.payment.last4}</span>
                </div>
              )}
            </div>
          </div>

          <div className="order-section">
            <h3>Order Status</h3>
            <div className="status-update">
              <div className="current-status">
                <label>Current Status:</label>
                <span className={`status-badge ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="status-select-container">
                <label>Update Status:</label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Close
          </button>
          {currentStatus !== order.status && (
            <button className="update-btn" onClick={handleStatusUpdate}>
              Update Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
