export default function TopProducts({ products }) {
  return (
    <div className="top-products">
      <div className="section-header">
        <h3>Top Products</h3>
        <p>Best performing products this month</p>
      </div>
      
      <div className="products-list">
        {products.map((product, index) => (
          <div key={product.id} className="product-item">
            <div className="product-rank">#{index + 1}</div>
            <div className="product-info">
              <h4 className="product-name">{product.name}</h4>
              <div className="product-stats">
                <span className="stat">
                  <span className="stat-icon">📦</span>
                  {product.sales} sold
                </span>
                <span className="stat">
                  <span className="stat-icon">💰</span>
                  ${product.revenue.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="product-actions">
              <button className="action-btn view">👁️</button>
              <button className="action-btn edit">✏️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
