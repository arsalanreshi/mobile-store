import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { CartContext } from "./_app";

export default function OrderPage() {
  const router = useRouter();
  const { cart, clearCart } = useContext(CartContext);
  const [orderItems, setOrderItems] = useState([]);
  const [orderType, setOrderType] = useState('cart'); // 'cart' or 'buynow'
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Check if it's a buy now order
    const buyNowItem = localStorage.getItem('buyNowItem');
    if (buyNowItem) {
      const item = JSON.parse(buyNowItem);
      setOrderItems([{ ...item, quantity: 1 }]);
      setOrderType('buynow');
      localStorage.removeItem('buyNowItem');
    } else if (cart.length > 0) {
      setOrderItems(cart);
      setOrderType('cart');
    } else {
      router.push('/');
    }
  }, [cart, router]);

  const calculateTotal = () => {
    if (!orderItems || orderItems.length === 0) return 0;
    return orderItems.reduce((total, item) => {
      const price = typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0;
      const quantity = typeof item.quantity === 'number' && !isNaN(item.quantity) ? item.quantity : 1;
      return total + (price * quantity);
    }, 0);
  };

  const calculateTax = () => {
    const total = calculateTotal();
    return Math.round(total * 0.18); // 18% GST
  };

  const calculateShipping = () => {
    const total = calculateTotal();
    return total > 25000 ? 0 : 500; // Free shipping above ₹25,000
  };

  const calculateGrandTotal = () => {
    return calculateTotal() + calculateTax() + calculateShipping();
  };

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    const isValid = requiredFields.every(field => customerInfo[field].trim() !== '');
    
    if (!isValid) {
      alert('Please fill in all required fields');
      return;
    }

    // Generate order ID
    const newOrderId = 'ATM' + Date.now().toString().slice(-8);
    setOrderId(newOrderId);
    
    // Store order in localStorage (in real app, this would be sent to backend)
    const orderData = {
      orderId: newOrderId,
      items: orderItems,
      customerInfo,
      totals: {
        subtotal: calculateTotal(),
        tax: calculateTax(),
        shipping: calculateShipping(),
        total: calculateGrandTotal()
      },
      orderDate: new Date().toISOString(),
      status: 'confirmed'
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    // Clear cart if it was a cart order
    if (orderType === 'cart') {
      clearCart();
    }
    
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <Layout>
        <div className="order-success">
          <div className="container">
            <div className="success-card">
              <div className="success-icon">✅</div>
              <h1>Order Placed Successfully!</h1>
              <p className="order-id">Order ID: <strong>{orderId}</strong></p>
              <p>Thank you for your purchase. Your order has been confirmed and will be processed shortly.</p>
              
              <div className="order-summary">
                <h3>Order Summary</h3>
                {orderItems.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p className="item-price">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
                <div className="total-amount">
                  <strong>Total: ₹{calculateGrandTotal().toLocaleString('en-IN')}</strong>
                </div>
              </div>
              
              <div className="action-buttons">
                <button onClick={() => router.push('/')} className="btn btn-primary">
                  Continue Shopping
                </button>
                <button onClick={() => router.push('/orders')} className="btn btn-secondary">
                  View All Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="order-page">
        <div className="container">
          <h1 className="page-title">Complete Your Order</h1>
          
          <div className="order-layout">
            {/* Order Items */}
            <div className="order-items">
              <h2>Order Items</h2>
              {orderItems.map(item => (
                <div key={item.id} className="order-item-card">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="item-brand">{item.brand}</p>
                    <p className="item-quantity">Quantity: {item.quantity}</p>
                    <p className="item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Customer Information Form */}
            <div className="order-form">
              <h2>Delivery Information</h2>
              <form onSubmit={handlePlaceOrder}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address *</label>
                  <textarea
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={customerInfo.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={customerInfo.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={customerInfo.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="upi">UPI Payment</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="netbanking">Net Banking</option>
                  </select>
                </div>

                {/* Order Summary */}
                <div className="order-summary-card">
                  <h3>Order Summary</h3>
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (18% GST):</span>
                    <span>₹{calculateTax().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>{calculateShipping() === 0 ? 'FREE' : `₹${calculateShipping()}`}</span>
                  </div>
                  <div className="summary-row total">
                    <span><strong>Total:</strong></span>
                    <span><strong>₹{calculateGrandTotal().toLocaleString('en-IN')}</strong></span>
                  </div>
                </div>

                <button type="submit" className="place-order-btn">
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
