import { useState } from 'react';
import { CATEGORIES, BRANDS, PRICE_RANGES, PRODUCTS } from '../data/products';

export default function ProductFilter({ onFilterChange, activeFilters = { categories: [], brands: [], priceRange: null }, products = PRODUCTS, showSearch = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showInStock, setShowInStock] = useState(false);
  const [showFastDelivery, setShowFastDelivery] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0);

  const applyFilters = () => {
    let filtered = products;

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (activeFilters?.categories?.length > 0) {
      filtered = filtered.filter(product => 
        activeFilters.categories.includes(product.category)
      );
    }

    // Brand filter
    if (activeFilters?.brands?.length > 0) {
      filtered = filtered.filter(product => 
        activeFilters.brands.includes(product.brand)
      );
    }

    // Price range filter
    if (activeFilters?.priceRange) {
      const { min, max } = activeFilters.priceRange;
      filtered = filtered.filter(product => 
        product.price >= min && product.price <= max
      );
    }

    // Stock filter
    if (showInStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Fast delivery filter
    if (showFastDelivery) {
      filtered = filtered.filter(product => product.fastDelivery);
    }

    // Rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(product => product.rating >= ratingFilter);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        // Assuming products have a date field or use array order
        break;
      default: // featured
        break;
    }

    onFilterChange(filtered, sortBy);
  };

  const handleCategoryChange = (category) => {
    const newCategories = activeFilters?.categories?.includes(category)
      ? activeFilters.categories.filter(c => c !== category)
      : [...(activeFilters?.categories || []), category];
    
    const newFilters = { ...activeFilters, categories: newCategories };
    onFilterChange && onFilterChange(newFilters);
    setTimeout(applyFilters, 0);
  };

  const handleBrandChange = (brand) => {
    const newBrands = activeFilters?.brands?.includes(brand)
      ? activeFilters.brands.filter(b => b !== brand)
      : [...(activeFilters?.brands || []), brand];
    
    const newFilters = { ...activeFilters, brands: newBrands };
    onFilterChange && onFilterChange(newFilters);
    setTimeout(applyFilters, 0);
  };

  const handlePriceRangeChange = (range) => {
    const newFilters = { ...activeFilters, priceRange: range };
    onFilterChange && onFilterChange(newFilters);
    setTimeout(applyFilters, 0);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('featured');
    setShowInStock(false);
    setShowFastDelivery(false);
    setRatingFilter(0);
    const clearedFilters = { categories: [], brands: [], priceRange: null };
    onFilterChange && onFilterChange(clearedFilters);
    setTimeout(() => onFilterChange(products, 'featured'), 0);
  };

  const hasActiveFilters = (activeFilters.categories.length > 0) || 
                          (activeFilters.brands.length > 0) || 
                          (activeFilters.priceRange !== null) ||
                          searchTerm.trim() !== '' ||
                          showInStock ||
                          showFastDelivery ||
                          ratingFilter > 0 ||
                          sortBy !== 'featured';

  return (
    <div className="product-filter">
      <div className="filter-header">
        <button 
          className="filter-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          🔍 Filters {isOpen ? '▲' : '▼'}
          {hasActiveFilters && <span className="filter-count">
            {activeFilters.categories.length + activeFilters.brands.length + (activeFilters.priceRange ? 1 : 0)}
          </span>}
        </button>
        
        {hasActiveFilters && (
          <button className="clear-filters" onClick={clearFilters}>
            Clear All
          </button>
        )}
      </div>

      <div className={`filter-content ${isOpen ? 'open' : ''}`}>
        {/* Search */}
        {showSearch && (
          <div className="filter-section">
            <h4 className="filter-title">Search</h4>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setTimeout(applyFilters, 300);
                }}
                className="search-input"
              />
            </div>
          </div>
        )}

        {/* Sort */}
        <div className="filter-section">
          <h4 className="filter-title">Sort By</h4>
          <select 
            value={sortBy} 
            onChange={(e) => {
              setSortBy(e.target.value);
              setTimeout(applyFilters, 0);
            }}
            className="sort-select"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="name">Name A-Z</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
        {/* Categories */}
        <div className="filter-section">
          <h4 className="filter-title">Categories</h4>
          <div className="filter-options">
            {CATEGORIES.map(category => (
              <label key={category.slug} className="filter-option">
                <input
                  type="checkbox"
                  checked={activeFilters.categories.includes(category.slug)}
                  onChange={() => handleCategoryChange(category.slug)}
                />
                <span className="checkmark"></span>
                <span className="option-text">
                  {category.emoji} {category.title}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="filter-section">
          <h4 className="filter-title">Brands</h4>
          <div className="filter-options">
            {BRANDS.map(brand => (
              <label key={brand} className="filter-option">
                <input
                  type="checkbox"
                  checked={activeFilters.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                <span className="checkmark"></span>
                <span className="option-text">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="filter-section">
          <h4 className="filter-title">Price Range</h4>
          <div className="filter-options">
            {PRICE_RANGES.map((range, index) => (
              <label key={index} className="filter-option">
                <input
                  type="radio"
                  name="priceRange"
                  checked={activeFilters.priceRange === range}
                  onChange={() => handlePriceRangeChange(range)}
                />
                <span className="checkmark radio"></span>
                <span className="option-text">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Filters */}
        <div className="filter-section">
          <h4 className="filter-title">Availability</h4>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="checkbox"
                checked={showInStock}
                onChange={(e) => {
                  setShowInStock(e.target.checked);
                  setTimeout(applyFilters, 0);
                }}
              />
              <span className="checkmark"></span>
              <span className="option-text">✅ In Stock Only</span>
            </label>
            <label className="filter-option">
              <input
                type="checkbox"
                checked={showFastDelivery}
                onChange={(e) => {
                  setShowFastDelivery(e.target.checked);
                  setTimeout(applyFilters, 0);
                }}
              />
              <span className="checkmark"></span>
              <span className="option-text">🚀 Fast Delivery</span>
            </label>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="filter-section">
          <h4 className="filter-title">Customer Rating</h4>
          <div className="filter-options">
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className="filter-option">
                <input
                  type="radio"
                  name="rating"
                  checked={ratingFilter === rating}
                  onChange={() => {
                    setRatingFilter(rating);
                    setTimeout(applyFilters, 0);
                  }}
                />
                <span className="checkmark radio"></span>
                <span className="option-text">
                  {'★'.repeat(rating)}{'☆'.repeat(5-rating)} & Up
                </span>
              </label>
            ))}
            <label className="filter-option">
              <input
                type="radio"
                name="rating"
                checked={ratingFilter === 0}
                onChange={() => {
                  setRatingFilter(0);
                  setTimeout(applyFilters, 0);
                }}
              />
              <span className="checkmark radio"></span>
              <span className="option-text">All Ratings</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
