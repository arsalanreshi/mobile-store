import { useContext } from "react";
import { CartContext } from "../pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ProductCard({ item }) {
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  const handleCardClick = (e) => {
    // Don't navigate if clicking the add to cart or buy now button
    if (e.target.closest('.add-to-cart-btn') || e.target.closest('.buy-now-btn')) {
      return;
    }
    window.location.href = `/product/${item.id}`;
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    // Store the item for immediate purchase
    localStorage.setItem('buyNowItem', JSON.stringify(item));
    router.push('/checkout');
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="product-image-container">
        <img 
          src="/iphones.jpg" 
          alt={item.name} 
          className="product-image"
          onError={(e) => {
            console.log('Image failed to load, falling back to original image');
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = item.image;
          }}
          onLoad={() => console.log('iPhone image loaded')}
        />
        <div className="product-badge">New</div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{item.name}</h3>
        <p className="product-brand">{item.brand}</p>
        
        <div className="product-rating">
          <div className="product-stars">
            <span className="product-star">★</span>
            <span className="product-star">★</span>
            <span className="product-star">★</span>
            <span className="product-star">★</span>
            <span className="product-star">★</span>
          </div>
          <span className="product-rating-text">(4.5)</span>
        </div>
        
        <p className="product-price">
          <span className="product-price-currency">₹</span>
          {item.price.toLocaleString("en-IN")}
        </p>
      </div>
      
      <div className="product-actions">
        <button 
          className="add-to-cart-btn" 
          onClick={(e) => {
            e.stopPropagation();
            addToCart(item);
          }}
        >
          Add to Cart
        </button>
        <button 
          className="buy-now-btn" 
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
