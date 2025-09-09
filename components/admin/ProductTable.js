export default function ProductTable({ products, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'red';
      case 'low_stock': return 'orange';
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'low_stock': return 'Low Stock';
      default: return status;
    }
  };

  return (
    <div className="product-table">
      <div className="table-header">
        <div className="col">Image</div>
        <div className="col">Product Name</div>
        <div className="col">Category</div>
        <div className="col">Price</div>
        <div className="col">Stock</div>
        <div className="col">Status</div>
        <div className="col">Actions</div>
      </div>
      
      <div className="table-body">
        {products.map((product) => (
          <div key={product.id} className="table-row">
            <div className="col image">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
            </div>
            <div className="col name">
              <div className="product-name">{product.name}</div>
              <div className="product-description">{product.description}</div>
            </div>
            <div className="col category">{product.category}</div>
            <div className="col price">${product.price}</div>
            <div className="col stock">
              <span className={product.stock < 10 ? 'low-stock' : ''}>
                {product.stock}
              </span>
            </div>
            <div className="col status">
              <span className={`status-badge ${getStatusColor(product.status)}`}>
                {getStatusText(product.status)}
              </span>
            </div>
            <div className="col actions">
              <button 
                className="action-btn edit"
                onClick={() => onEdit(product)}
                title="Edit Product"
              >
                ✏️
              </button>
              <button 
                className="action-btn delete"
                onClick={() => onDelete(product.id)}
                title="Delete Product"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="empty-state">
          <p>No products found</p>
        </div>
      )}
    </div>
  );
}
