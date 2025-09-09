import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import SearchBar from '../components/SearchBar';
import { PRODUCTS, CATEGORIES } from '../data/products';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllProducts, setShowAllProducts] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim()) {
      setShowAllProducts(true);
    }
  };

  // Filter products based on search
  const searchResults = searchTerm.trim() ? PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const featured = PRODUCTS.slice(0, 4);

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="hero-banner">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Atim Communication</h1>
            <p className="hero-subtitle">Your one-stop shop for mobiles, accessories, and smart gadgets</p>
            
            {/* Hero Search Bar */}
            <div className="hero-search">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search for phones, accessories, smartwatches..."
              />
            </div>
            
          </div>
        </section>
      </div>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Categories</h2>
            <p className="section-subtitle">Browse our product categories</p>
          </div>
        </div>
        <div className="categories-grid">
          {CATEGORIES.map(c => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Handpicked items just for you</p>
          </div>
          <Link href="/products" className="view-all-link">View All</Link>
        </div>
        <div className="content-grid auto">
          {featured.map(p => <ProductCard key={p.id} item={p} />)}
        </div>
      </section>

      {/* Search Results */}
      {searchTerm.trim() && (
        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Search Results</h2>
              <p className="section-subtitle">Found {searchResults.length} products for "{searchTerm}"</p>
            </div>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="content-grid auto">
              {searchResults.map(p => <ProductCard key={p.id} item={p} />)}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3 className="empty-state-title">No products found</h3>
              <p className="empty-state-description">
                Try searching with different keywords
              </p>
            </div>
          )}
        </section>
      )}

      {/* All Products Section */}
      {!searchTerm.trim() && (
        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">All Products</h2>
              <p className="section-subtitle">Discover our complete collection</p>
            </div>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowAllProducts(!showAllProducts)}
            >
              {showAllProducts ? 'Show Less' : 'View All Products'}
            </button>
          </div>
          
          {showAllProducts && (
            <div className="content-grid auto">
              {PRODUCTS.map(p => <ProductCard key={p.id} item={p} />)}
            </div>
          )}
        </section>
      )}
    </Layout>
  );
}
