import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import ProductCard from "../../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../../data/products";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  // Wait for router to be ready
  if (!router.isReady) {
    return <Layout><div className="glass" style={{ padding: 24 }}>Loading...</div></Layout>;
  }
  
  const category = CATEGORIES.find(c => c.slug === slug);

  // Get products for this category
  const productsInCategory = PRODUCTS.filter(p => p.category === slug);
  
  // States
  const [filteredProducts, setFilteredProducts] = useState(productsInCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    let filtered = [...productsInCategory];

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-10000':
          filtered = filtered.filter(product => product.price < 10000);
          break;
        case '10000-25000':
          filtered = filtered.filter(product => product.price >= 10000 && product.price <= 25000);
          break;
        case '25000-50000':
          filtered = filtered.filter(product => product.price > 25000 && product.price <= 50000);
          break;
        case 'above-50000':
          filtered = filtered.filter(product => product.price > 50000);
          break;
      }
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [searchTerm, priceRange, sortBy, productsInCategory]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange('all');
    setSortBy('name');
  };

  return (
    <Layout>
      {!category ? (
        <div className="glass" style={{ padding: 24 }}>Category not found.</div>
      ) : (
        <div className="products-page">
          {/* Page Header */}
          <div className="page-header">
            <div className="container">
              <h1 className="page-title">{category.title} {category.emoji}</h1>
              <p className="page-subtitle">Discover our collection of {category.title.toLowerCase()}</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <div className="container">
              <div className="search-container">
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder={`Search ${category.title.toLowerCase()}...`}
                    className="search-input-main"
                  />
                  <button className="search-btn">
                    🔍
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Products */}
          <div className="products-content">
            <div className="container">
              <div className="products-layout">
                {/* Filters Sidebar */}
                <div className="filters-sidebar">
                  <div className="filters-header">
                    <h3>Filters</h3>
                    <button onClick={clearFilters} className="clear-filters-btn">
                      Clear All
                    </button>
                  </div>

                  {/* Price Filter */}
                  <div className="filter-group">
                    <h4 className="filter-title">Price Range</h4>
                    <div className="filter-options">
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="price"
                          value="all"
                          checked={priceRange === 'all'}
                          onChange={(e) => setPriceRange(e.target.value)}
                        />
                        <span>All Prices</span>
                      </label>
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="price"
                          value="under-10000"
                          checked={priceRange === 'under-10000'}
                          onChange={(e) => setPriceRange(e.target.value)}
                        />
                        <span>Under ₹10,000</span>
                      </label>
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="price"
                          value="10000-25000"
                          checked={priceRange === '10000-25000'}
                          onChange={(e) => setPriceRange(e.target.value)}
                        />
                        <span>₹10,000 - ₹25,000</span>
                      </label>
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="price"
                          value="25000-50000"
                          checked={priceRange === '25000-50000'}
                          onChange={(e) => setPriceRange(e.target.value)}
                        />
                        <span>₹25,000 - ₹50,000</span>
                      </label>
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="price"
                          value="above-50000"
                          checked={priceRange === 'above-50000'}
                          onChange={(e) => setPriceRange(e.target.value)}
                        />
                        <span>Above ₹50,000</span>
                      </label>
                    </div>
                  </div>

                  {/* Sort Filter */}
                  <div className="filter-group">
                    <h4 className="filter-title">Sort By</h4>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="sort-select"
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="price-low">Price (Low to High)</option>
                      <option value="price-high">Price (High to Low)</option>
                      <option value="rating">Rating (High to Low)</option>
                    </select>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="products-main">
                  <div className="products-header">
                    <div className="results-info">
                      <span>Showing {filteredProducts.length} of {productsInCategory.length} products</span>
                    </div>
                  </div>

                  {filteredProducts.length > 0 ? (
                    <div className="products-grid">
                      {filteredProducts.map(product => (
                        <ProductCard key={product.id} item={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="no-results">
                      <div className="no-results-icon">🔍</div>
                      <h3>No products found</h3>
                      <p>Try adjusting your filters or search terms</p>
                      <button onClick={clearFilters} className="btn btn-primary">
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
