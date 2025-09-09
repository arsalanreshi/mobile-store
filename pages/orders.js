import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders.reverse()); // Show newest first
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'processing': return '#f59e0b';
      case 'shipped': return '#3b82f6';
      case 'delivered': return '#059669';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Order Confirmed';
      case 'processing': return 'Processing';
      case 'shipped': return 'Shipped';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTrackingSteps = (status, orderDate) => {
    const steps = [
      { label: 'Order Confirmed', status: 'completed', date: orderDate },
      { label: 'Processing', status: status === 'confirmed' ? 'pending' : 'completed', date: null },
      { label: 'Shipped', status: ['shipped', 'delivered'].includes(status) ? 'completed' : 'pending', date: null },
      { label: 'Out for Delivery', status: status === 'delivered' ? 'completed' : 'pending', date: null },
      { label: 'Delivered', status: status === 'delivered' ? 'completed' : 'pending', date: null }
    ];
    return steps;
  };

  if (trackingOrder) {
    const trackingSteps = getTrackingSteps(trackingOrder.status, trackingOrder.orderDate);
    
    return (
      <Layout>
        <div className="tracking-page">
          <div className="container">
            <div className="order-header">
              <button onClick={() => setTrackingOrder(null)} className="back-btn">
                ← Back to Orders
              </button>
              <h1>Track Order #{trackingOrder.orderId}</h1>
            </div>

            <div className="tracking-container">
              <div className="tracking-info">
                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <p><strong>Order ID:</strong> {trackingOrder.orderId}</p>
                  <p><strong>Order Date:</strong> {formatDate(trackingOrder.orderDate)}</p>
                  <p><strong>Total Amount:</strong> ₹{trackingOrder.total.toLocaleString('en-IN')}</p>
                  <p><strong>Payment:</strong> {trackingOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : trackingOrder.paymentMethod.toUpperCase()}</p>
                </div>

                <div className="delivery-address">
                  <h3>Delivery Address</h3>
                  <p><strong>{trackingOrder.customerInfo.name}</strong></p>
                  <p>{trackingOrder.customerInfo.address}</p>
                  <p>Phone: {trackingOrder.customerInfo.phone}</p>
                </div>
              </div>

              <div className="tracking-timeline">
                <h3>Order Status</h3>
                <div className="timeline">
                  {trackingSteps.map((step, index) => (
                    <div key={index} className={`timeline-item ${step.status}`}>
                      <div className="timeline-marker">
                        {step.status === 'completed' ? '✅' : '⏳'}
                      </div>
                      <div className="timeline-content">
                        <h4>{step.label}</h4>
                        {step.date && <p>{formatDate(step.date)}</p>}
                        {step.status === 'pending' && <p className="pending-text">Pending</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-items-section">
                <h3>Items in this Order</h3>
                <div className="items-grid">
                  {trackingOrder.items.map(item => (
                    <div key={item.id} className="tracking-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>Qty: {item.qty}</p>
                        <p className="item-price">₹{item.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (selectedOrder) {
    return (
      <Layout>
        <div className="order-details-page">
          <div className="container">
            <div className="order-header">
              <button onClick={() => setSelectedOrder(null)} className="back-btn">
                ← Back to Orders
              </button>
              <h1>Order Details</h1>
            </div>

            <div className="order-details-card">
              <div className="order-info-header">
                <div className="order-id">
                  <h2>Order #{selectedOrder.orderId}</h2>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(selectedOrder.status) }}
                  >
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
                <p className="order-date">Placed on {formatDate(selectedOrder.orderDate)}</p>
              </div>

              <div className="order-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedOrder(null);
                    setTrackingOrder(selectedOrder);
                  }}
                >
                  🚚 Track Order
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => window.print()}
                >
                  🖨️ Print Details
                </button>
              </div>

              <div className="order-sections">
                {/* Items */}
                <div className="section">
                  <h3>Items Ordered</h3>
                  <div className="order-items-list">
                    {selectedOrder.items.map(item => (
                      <div key={item.id} className="order-item-detail">
                        <img src={item.image} alt={item.name} />
                        <div className="item-info">
                          <h4>{item.name}</h4>
                          <p className="item-brand">{item.brand}</p>
                          <p className="item-specs">Qty: {item.qty} × ₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="item-total">
                          ₹{(item.price * item.qty).toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="section">
                  <h3>Delivery Address</h3>
                  <div className="address-card">
                    <p><strong>{selectedOrder.customerInfo.name}</strong></p>
                    <p>{selectedOrder.customerInfo.address}</p>
                    <p>Phone: {selectedOrder.customerInfo.phone}</p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="section">
                  <h3>Payment Information</h3>
                  <div className="payment-card">
                    <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : selectedOrder.paymentMethod.toUpperCase()}</p>
                    <div className="payment-breakdown">
                      <div className="breakdown-row">
                        <span>Subtotal:</span>
                        <span>₹{(selectedOrder.total / 1.18).toFixed(0)}</span>
                      </div>
                      <div className="breakdown-row">
                        <span>Tax (18% GST):</span>
                        <span>₹{(selectedOrder.total * 0.18 / 1.18).toFixed(0)}</span>
                      </div>
                      <div className="breakdown-row">
                        <span>Shipping:</span>
                        <span>FREE</span>
                      </div>
                      <div className="breakdown-row total-row">
                        <span><strong>Total Paid:</strong></span>
                        <span><strong>₹{selectedOrder.total.toLocaleString('en-IN')}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="orders-page">
        <div className="container">
          <h1 className="page-title">My Orders</h1>
          
          {orders.length === 0 ? (
            <div className="no-orders">
              <div className="no-orders-icon">📦</div>
              <h2>No Orders Yet</h2>
              <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
              <button onClick={() => router.push('/')} className="btn btn-primary">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.orderId} className="order-card" onClick={() => setSelectedOrder(order)}>
                  <div className="order-card-header">
                    <div className="order-id-section">
                      <h3>Order #{order.orderId}</h3>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <p className="order-date">{formatDate(order.orderDate)}</p>
                  </div>
                  
                  <div className="order-items-preview">
                    {order.items.slice(0, 3).map(item => (
                      <img key={item.id} src={item.image} alt={item.name} className="item-preview-image" />
                    ))}
                    {order.items.length > 3 && (
                      <div className="more-items">+{order.items.length - 3}</div>
                    )}
                  </div>
                  
                  <div className="order-card-footer">
                    <div className="order-total">
                      <strong>₹{order.total.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="order-items-count">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
