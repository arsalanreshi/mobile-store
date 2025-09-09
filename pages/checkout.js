import Layout from "../components/Layout";
import { useContext, useState } from "react";
import { CartContext } from "./_app";
import Link from "next/link";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [payment, setPayment] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all details.");
      return;
    }
    
    // Store order in localStorage
    const orderId = 'ATM' + Date.now().toString().slice(-6);
    const orderData = {
      orderId,
      items: cart,
      customerInfo: form,
      paymentMethod: payment,
      total: Math.round(total * 1.18),
      orderDate: new Date().toISOString(),
      status: 'confirmed'
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    // Clear cart and show success
    clearCart();
    setOrderPlaced(true);
  };

  return (
    <Layout>
      <div className="checkout-page">
        <div className="page-header">
          <h1 className="page-title">💳 Checkout</h1>
          <p className="page-subtitle">Complete your order</p>
        </div>

        {orderPlaced ? (
          <div className="order-success">
            {/* Ticket Animation */}
            <div className="ticket-animation">
              <div className="ticket">
                <div className="ticket-header">
                  <div className="ticket-perforation"></div>
                  <h3>🎫 ORDER CONFIRMED</h3>
                  <div className="ticket-perforation"></div>
                </div>
                <div className="ticket-body">
                  <div className="success-icon">✅</div>
                  <h2>Order Placed Successfully!</h2>
                  <p className="order-id">Order #ATM{Date.now().toString().slice(-6)}</p>
                </div>
              </div>
            </div>

            {/* Confetti */}
            <div className="confetti">
              {[...Array(50)].map((_, i) => (
                <span key={i} style={{ "--i": i }}></span>
              ))}
            </div>

            <div className="success-content no-print">
              <h2>Thank you <strong>{form.name}</strong>!</h2>
              <p className="success-message">
                Your order has been confirmed and will be processed shortly.
              </p>
              <div className="success-actions">
                <Link href="/" className="btn btn-primary">
                  Continue Shopping
                </Link>
                <button
                  className="btn btn-secondary"
                  onClick={() => window.print()}
                >
                  🖨️ Print Receipt
                </button>
              </div>
            </div>

            {/* Print-only Receipt */}
            <div className="receipt print-only">
              <div className="receipt-header">
                <h1>ATIM COMMUNICATION</h1>
                <p>📱 Premium Electronics Store</p>
                <p>Order Receipt</p>
              </div>
              
              <div className="receipt-divider">
                ═══════════════════════════════════
              </div>
              
              <div className="receipt-order-info">
                <p><strong>Order ID:</strong> ATM{Date.now().toString().slice(-6)}</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString('en-IN')}</p>
                <p><strong>Time:</strong> {new Date().toLocaleTimeString('en-IN')}</p>
                <p><strong>Customer:</strong> {form.name}</p>
                <p><strong>Phone:</strong> {form.phone}</p>
              </div>
              
              <div className="receipt-divider">
                ═══════════════════════════════════
              </div>
              
              <div className="receipt-items">
                <h3>ITEMS ORDERED</h3>
                {cart.map((item, index) => (
                  <div key={item.id} className="receipt-item">
                    <div className="item-line">
                      <span className="item-name">{item.name}</span>
                    </div>
                    <div className="item-line">
                      <span>Qty: {item.qty} × ₹{item.price.toLocaleString("en-IN")}</span>
                      <span>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="receipt-divider">
                ═══════════════════════════════════
              </div>
              
              <div className="receipt-totals">
                <div className="total-line">
                  <span>Subtotal ({totalItems} items):</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="total-line">
                  <span>Shipping:</span>
                  <span>FREE</span>
                </div>
                <div className="total-line">
                  <span>Tax (18% GST):</span>
                  <span>₹{Math.round(total * 0.18).toLocaleString("en-IN")}</span>
                </div>
                <div className="total-line final-total">
                  <span><strong>TOTAL AMOUNT:</strong></span>
                  <span><strong>₹{Math.round(total * 1.18).toLocaleString("en-IN")}</strong></span>
                </div>
              </div>
              
              <div className="receipt-divider">
                ═══════════════════════════════════
              </div>
              
              <div className="receipt-delivery">
                <h3>DELIVERY INFORMATION</h3>
                <p><strong>Address:</strong></p>
                <p>{form.address}</p>
                <p><strong>Payment Method:</strong> {payment === "cod" ? "Cash on Delivery" : payment === "upi" ? "UPI/Wallet" : "Credit/Debit Card"}</p>
              </div>
              
              <div className="receipt-divider">
                ═══════════════════════════════════
              </div>
              
              <div className="receipt-footer">
                <p>Thank you for shopping with us! 🙏</p>
                <p>For support: contact@atimcommunication.com</p>
                <p>📞 +91-XXXX-XXXXXX</p>
                <p className="receipt-note">
                  * This is a computer generated receipt
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="checkout-content">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some items to proceed with checkout</p>
                <Link href="/" className="btn btn-primary">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Order Summary */}
                <div className="order-summary">
                  <h2>Order Summary</h2>

                  <div className="order-items">
                    {cart.map((item) => (
                      <div key={item.id} className="order-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p className="item-brand">{item.brand}</p>
                          <div className="item-pricing">
                            <span className="quantity">Qty: {item.qty}</span>
                            <span className="price">
                              ₹{item.price.toLocaleString("en-IN")} each
                            </span>
                          </div>
                        </div>
                        <div className="item-total">
                          ₹{(item.price * item.qty).toLocaleString("en-IN")}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-totals">
                    <div className="total-row">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>₹{total.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="total-row">
                      <span>Shipping</span>
                      <span className="free">FREE</span>
                    </div>
                    <div className="total-row">
                      <span>Tax (18%)</span>
                      <span>
                        ₹{Math.round(total * 0.18).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="total-row final-total">
                      <span>Total</span>
                      <span>
                        ₹{Math.round(total * 1.18).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Form */}
                <div className="checkout-form">
                  <form onSubmit={handleSubmit}>
                    {/* Shipping Information */}
                    <div className="form-section">
                      <h3>📦 Shipping Information</h3>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={form.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={form.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Delivery Address *</label>
                        <textarea
                          name="address"
                          placeholder="Enter your complete delivery address"
                          value={form.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="form-section">
                      <h3>💳 Payment Method</h3>
                      <div className="payment-options">
                        <label
                          className={`payment-option ${
                            payment === "cod" ? "selected" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value="cod"
                            checked={payment === "cod"}
                            onChange={(e) => setPayment(e.target.value)}
                          />
                          <div className="payment-content">
                            <div className="payment-icon">💰</div>
                            <div className="payment-info">
                              <h4>Cash on Delivery</h4>
                              <p>Pay when you receive your order</p>
                            </div>
                          </div>
                        </label>

                        <label
                          className={`payment-option ${
                            payment === "upi" ? "selected" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value="upi"
                            checked={payment === "upi"}
                            onChange={(e) => setPayment(e.target.value)}
                          />
                          <div className="payment-content">
                            <div className="payment-icon">📱</div>
                            <div className="payment-info">
                              <h4>UPI / Digital Wallet</h4>
                              <p>Pay instantly with UPI or wallet</p>
                            </div>
                          </div>
                        </label>

                        <label
                          className={`payment-option ${
                            payment === "card" ? "selected" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={payment === "card"}
                            onChange={(e) => setPayment(e.target.value)}
                          />
                          <div className="payment-content">
                            <div className="payment-icon">💳</div>
                            <div className="payment-info">
                              <h4>Credit / Debit Card</h4>
                              <p>Secure payment with your card</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <div className="form-actions">
                      <button
                        type="submit"
                        className="btn btn-primary place-order-btn"
                      >
                        💳 Place Order - ₹
                        {Math.round(total * 1.18).toLocaleString("en-IN")}
                      </button>
                      <p className="secure-note">
                        🔒 Your information is secure and encrypted
                      </p>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
