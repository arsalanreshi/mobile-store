import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { PRODUCTS, CATEGORIES } from '../data/products';

export default function SearchBar({ onSearch, placeholder = "Search products..." }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const productSuggestions = PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);

      const categorySuggestions = CATEGORIES.filter(category =>
        category.title.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 2);

      const allSuggestions = [
        ...categorySuggestions.map(cat => ({ type: 'category', ...cat })),
        ...productSuggestions.map(prod => ({ type: 'product', ...prod }))
      ];

      setSuggestions(allSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedIndex(-1);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'category') {
      router.push(`/category/${suggestion.slug}`);
    } else {
      router.push(`/product/${suggestion.id}`);
    }
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    if (onSearch) {
      onSearch('');
    }
  };

  const handleBlur = (e) => {
    // Delay hiding suggestions to allow click events
    setTimeout(() => {
      if (!searchRef.current?.contains(document.activeElement)) {
        setShowSuggestions(false);
      }
    }, 150);
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm && setShowSuggestions(true)}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="search-input"
            autoComplete="off"
          />
          
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="search-clear"
            >
              ✕
            </button>
          )}
          
          <button type="submit" className="search-submit">
            🔍
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${suggestion.id || suggestion.slug}`}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="suggestion-icon">
                {suggestion.type === 'category' ? suggestion.emoji : '📱'}
              </div>
              <div className="suggestion-content">
                <div className="suggestion-title">
                  {suggestion.type === 'category' ? suggestion.title : suggestion.name}
                </div>
                <div className="suggestion-subtitle">
                  {suggestion.type === 'category' 
                    ? `Browse ${suggestion.title.toLowerCase()}` 
                    : `${suggestion.brand} • ₹${suggestion.price.toLocaleString('en-IN')}`
                  }
                </div>
              </div>
              <div className="suggestion-type">
                {suggestion.type === 'category' ? 'Category' : 'Product'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
