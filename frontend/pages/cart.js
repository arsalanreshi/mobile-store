import Layout from "../components/Layout";
import { useContext } from "react";
import { CartContext } from "./_app";
import Link from "next/link";

export default function Cart() {
  const { cart, removeFromCart, updateQty, saveCart, restoreCart, savedCart } =
    useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <Layout>
      <div className="cart-page">
        <div className="page-header">
          <h1 className="page-title">🛒 Shopping Cart</h1>
          <p className="page-subtitle">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
        </div>

        {/* Empty Cart State */}
        {cart.length === 0 ? (
          <div className="empty-cart-state">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            
            {/* Show Saved Cart Preview if available */}
            {savedCart && savedCart.length > 0 && (
              <div className="saved-cart-preview">
                <h3>💾 You have a saved cart</h3>
                <div className="saved-items">
                  {savedCart.map((item) => (
                    <div key={item.id} className="saved-item">
                      <img src={item.image} alt={item.name} />
                      <div className="saved-item-info">
                        <span className="saved-item-name">{item.name}</span>
                        <span className="saved-item-qty">Qty: {item.qty}</span>
                        <span className="saved-item-price">₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary" onClick={restoreCart}>
                  Restore Saved Cart
                </button>
              </div>
            )}
            
            <Link href="/" className="btn btn-primary continue-shopping">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items-section">
              <div className="section-header">
                <h2>Items in your cart</h2>
                <button className="save-cart-btn" onClick={saveCart}>
                  💾 Save for Later
                </button>
              </div>
              
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="item-info">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-brand">{item.brand}</p>
                      <div className="item-rating">
                        <span className="stars">{'★'.repeat(Math.floor(item.rating || 4))}</span>
                        <span className="rating-text">({item.rating || 4.0})</span>
                      </div>
                      
                      <div className="item-price">
                        <span className="current-price">₹{item.price.toLocaleString("en-IN")}</span>
                        {item.originalPrice && (
                          <span className="original-price">₹{item.originalPrice.toLocaleString("en-IN")}</span>
                        )}
                      </div>
                      
                      <div className="item-availability">
                        {item.inStock ? (
                          <span className="in-stock">✅ In Stock</span>
                        ) : (
                          <span className="out-of-stock">❌ Out of Stock</span>
                        )}
                        {item.fastDelivery && (
                          <span className="fast-delivery">🚀 Fast Delivery</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="item-actions">
                      <div className="quantity-section">
                        <label>Quantity:</label>
                        <div className="quantity-controls">
                          <button 
                            className="qty-btn"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            disabled={item.qty <= 1}
                          >
                            -
                          </button>
                          <span className="qty-display">{item.qty}</span>
                          <button 
                            className="qty-btn"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="item-total">
                        <span className="total-label">Total:</span>
                        <span className="total-price">₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                      </div>
                      
                      <div className="item-buttons">
                        <button className="btn btn-secondary save-later">
                          Save for Later
                        </button>
                        <button 
                          className="btn btn-danger remove-btn" 
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary-section">
              <div className="summary-card">
                <h2>Order Summary</h2>
                
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Items ({totalItems})</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping & handling</span>
                    <span className="free">FREE</span>
                  </div>
                  <div className="summary-row">
                    <span>Total before tax</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="summary-row">
                    <span>Estimated tax</span>
                    <span>₹{Math.round(total * 0.18).toLocaleString("en-IN")}</span>
                  </div>
                </div>
                
                <div className="summary-total">
                  <div className="total-row">
                    <span>Order total</span>
                    <span className="total-amount">₹{Math.round(total * 1.18).toLocaleString("en-IN")}</span>
                  </div>
                </div>
                
                <div className="checkout-section">
                  <Link href="/checkout" className="btn btn-primary checkout-btn">
                    Proceed to Checkout
                  </Link>
                  <p className="secure-checkout">🔒 Secure Checkout</p>
                </div>
                
                <div className="payment-options">
                  <h4>We Accept:</h4>
                  <div className="payment-icons">
                    <span>💳</span>
                    <span>🏦</span>
                    <span>📱</span>
                    <span>💰</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
