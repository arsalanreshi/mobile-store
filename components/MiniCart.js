import { useContext } from "react";
import { CartContext } from "../pages/_app";
import Link from "next/link";

export default function MiniCart() {
  const { cart, removeFromCart, updateQty, isCartOpen, setIsCartOpen } =
    useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <div
        className={`mini-cart-overlay ${isCartOpen ? "active" : ""}`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className={`mini-cart ${isCartOpen ? "active" : ""}`}>
        <div className="mini-cart-header">
          <h3 className="mini-cart-title">🛒 Shopping Cart</h3>
          <button className="mini-cart-close" onClick={() => setIsCartOpen(false)}>
            ✕
          </button>
        </div>

        <div className="mini-cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h3 className="cart-empty-title">Your cart is empty</h3>
              <p className="cart-empty-description">Add some products to get started!</p>
              <button 
                className="continue-shopping-btn"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img className="cart-item-image" src={item.image} alt={item.name} />
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <p className="cart-item-brand">{item.brand}</p>
                      <div className="cart-item-price">₹{item.price.toLocaleString("en-IN")}</div>
                    </div>
                    <div className="cart-item-actions">
                      <div className="cart-item-quantity">
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          disabled={item.qty <= 1}
                        >
                          -
                        </button>
                        <span className="quantity-display">{item.qty}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mini-cart-footer">
                <div className="cart-summary">
                  <div className="cart-total">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                
                <div className="cart-actions">
                  <Link
                    href="/checkout"
                    className="checkout-btn"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Checkout
                  </Link>
                  <Link
                    href="/cart"
                    className="continue-shopping-btn"
                    onClick={() => setIsCartOpen(false)}
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

    </>
  );
}
