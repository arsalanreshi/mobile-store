import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { PRODUCTS, REVIEWS } from '../../data/products';
import { CartContext } from '../_app';
import Link from 'next/link';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useContext(CartContext);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = PRODUCTS.find(p => p.id === id);
  const productReviews = REVIEWS[id] || [];

  if (!product) {
    return (
      <Layout>
        <div className="container">
          <div className="product-not-found">
            <h1>Product Not Found</h1>
            <p>The product you're looking for doesn't exist.</p>
            <Link href="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <Layout>
      <div className="container">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <Link href="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">›</span>
          <Link href={`/category/${product.category}`} className="breadcrumb-link">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        <div className="product-detail">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={product.images?.[selectedImage] || product.image} 
                alt={product.name}
                className="product-main-image"
              />
              {product.fastDelivery && (
                <div className="delivery-badge">🚀 Fast Delivery</div>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="image-thumbnails">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-brand">by {product.brand}</div>
              
              <div className="product-rating">
                <div className="stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="product-pricing">
              <div className="current-price">₹{product.price.toLocaleString('en-IN')}</div>
              {product.originalPrice && (
                <div className="pricing-details">
                  <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="discount">({discount}% off)</span>
                </div>
              )}
              <div className="savings">
                You save: ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
              </div>
            </div>

            <div className="product-availability">
              {product.inStock ? (
                <div className="in-stock">✅ In Stock</div>
              ) : (
                <div className="out-of-stock">❌ Out of Stock</div>
              )}
              {product.fastDelivery && (
                <div className="fast-delivery">🚀 Fast Delivery Available</div>
              )}
            </div>

            <div className="product-features">
              <h3>Key Features</h3>
              <ul className="features-list">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className="btn btn-primary add-to-cart"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  🛒 Add to Cart
                </button>
                <button className="btn btn-secondary buy-now">
                  ⚡ Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button 
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-header ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({productReviews.length})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-tab">
                <p className="product-description">{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="specifications-tab">
                <h3>Technical Specifications</h3>
                <div className="specs-grid">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <div className="spec-label">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div className="spec-value">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-tab">
                <div className="reviews-summary">
                  <div className="rating-breakdown">
                    <div className="average-rating">
                      <span className="rating-number">{product.rating}</span>
                      <div className="stars">
                        {renderStars(product.rating)}
                      </div>
                      <span className="total-reviews">({product.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="reviews-list">
                  {productReviews.length > 0 ? (
                    productReviews.map(review => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <span className="reviewer-name">{review.user}</span>
                            {review.verified && (
                              <span className="verified-badge">✅ Verified Purchase</span>
                            )}
                          </div>
                          <div className="review-rating">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>
                        <div className="review-comment">{review.comment}</div>
                      </div>
                    ))
                  ) : (
                    <div className="no-reviews">
                      <p>No reviews yet. Be the first to review this product!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
