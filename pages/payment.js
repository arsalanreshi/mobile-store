import Layout from "../components/Layout";
import { useContext, useState } from "react";
import { CartContext } from "./_app";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Payment() {
  const { cart } = useContext(CartContext);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const finalTotal = Math.round(total * 1.18);

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    }
    
    // Format expiry date
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
      if (formattedValue.length > 5) return;
    }
    
    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 3) return;
    }

    setCardDetails({ ...cardDetails, [name]: formattedValue });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setPaymentComplete(true);
    }, 3000);
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="payment-page">
          <div className="empty-cart">
            <h1>No items to pay for</h1>
            <p>Your cart is empty. Add some items first.</p>
            <Link href="/" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="payment-page">
        <div className="page-header">
          <h1 className="page-title">💳 Payment</h1>
          <p className="page-subtitle">Secure payment processing</p>
        </div>

        {paymentComplete ? (
          <div className="payment-success">
            <div className="success-animation">
              <div className="success-icon">✅</div>
              <div className="success-waves">
                <div className="wave wave-1"></div>
                <div className="wave wave-2"></div>
                <div className="wave wave-3"></div>
              </div>
            </div>
            
            <div className="success-content">
              <h2>Payment Successful!</h2>
              <p>Your payment of ₹{finalTotal.toLocaleString("en-IN")} has been processed successfully.</p>
              
              <div className="transaction-details">
                <div className="detail-row">
                  <span>Transaction ID:</span>
                  <span>TXN{Date.now()}</span>
                </div>
                <div className="detail-row">
                  <span>Payment Method:</span>
                  <span>{paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'upi' ? 'UPI' : 'Net Banking'}</span>
                </div>
                <div className="detail-row">
                  <span>Amount Paid:</span>
                  <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
              
              <div className="success-actions">
                <Link href="/" className="btn btn-primary">
                  Continue Shopping
                </Link>
                <button className="btn btn-secondary" onClick={() => window.print()}>
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="payment-content">
            {/* Order Summary */}
            <div className="payment-summary">
              <h2>Payment Summary</h2>
              
              <div className="summary-items">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (18%)</span>
                  <span>₹{Math.round(total * 0.18).toLocaleString("en-IN")}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free">FREE</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total Amount</span>
                  <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
              
              <div className="security-badges">
                <div className="badge">🔒 SSL Secured</div>
                <div className="badge">🛡️ Bank Grade Security</div>
                <div className="badge">✅ PCI Compliant</div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="payment-form">
              <form onSubmit={handlePayment}>
                {/* Payment Method Selection */}
                <div className="payment-methods">
                  <h3>Select Payment Method</h3>
                  
                  <div className="method-options">
                    <label className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="method-content">
                        <div className="method-icon">💳</div>
                        <div className="method-info">
                          <h4>Credit/Debit Card</h4>
                          <p>Visa, Mastercard, RuPay</p>
                        </div>
                      </div>
                    </label>
                    
                    <label className={`method-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="method-content">
                        <div className="method-icon">📱</div>
                        <div className="method-info">
                          <h4>UPI Payment</h4>
                          <p>Pay using UPI ID</p>
                        </div>
                      </div>
                    </label>
                    
                    <label className={`method-option ${paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={paymentMethod === 'netbanking'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="method-content">
                        <div className="method-icon">🏦</div>
                        <div className="method-info">
                          <h4>Net Banking</h4>
                          <p>All major banks supported</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="payment-details">
                  {paymentMethod === 'card' && (
                    <div className="card-form">
                      <h3>Card Details</h3>
                      <div className="form-grid">
                        <div className="form-group full-width">
                          <label>Card Number</label>
                          <input
                            type="text"
                            name="number"
                            placeholder="1234 5678 9012 3456"
                            value={cardDetails.number}
                            onChange={handleCardChange}
                            required
                          />
                        </div>
                        <div className="form-group full-width">
                          <label>Cardholder Name</label>
                          <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={cardDetails.name}
                            onChange={handleCardChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Expiry Date</label>
                          <input
                            type="text"
                            name="expiry"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={handleCardChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={handleCardChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="upi-form">
                      <h3>UPI Payment</h3>
                      <div className="form-group">
                        <label>UPI ID</label>
                        <input
                          type="text"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          required
                        />
                      </div>
                      <div className="upi-apps">
                        <p>Or pay using:</p>
                        <div className="app-buttons">
                          <button type="button" className="app-btn">📱 PhonePe</button>
                          <button type="button" className="app-btn">💰 Paytm</button>
                          <button type="button" className="app-btn">🔷 Google Pay</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="netbanking-form">
                      <h3>Select Your Bank</h3>
                      <select className="bank-select" required>
                        <option value="">Choose your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                        <option value="other">Other Banks</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Pay Button */}
                <div className="payment-actions">
                  <button 
                    type="submit" 
                    className="btn btn-primary pay-btn"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <span className="spinner"></span>
                        Processing Payment...
                      </>
                    ) : (
                      `💳 Pay ₹${finalTotal.toLocaleString("en-IN")}`
                    )}
                  </button>
                  
                  <div className="payment-security">
                    <p>🔒 Your payment information is secure and encrypted</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
