import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/AdminLayout';
import ProductTable from '../../../components/admin/ProductTable';
import ProductModal from '../../../components/admin/ProductModal';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      category: 'Phones',
      price: 999,
      stock: 25,
      status: 'active',
      image: '/images/iphone-15-pro.jpg',
      description: 'Latest iPhone with advanced features',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      category: 'Phones',
      price: 799,
      stock: 30,
      status: 'active',
      image: '/images/galaxy-s24.jpg',
      description: 'Premium Android smartphone',
      createdAt: '2024-01-08'
    },
    {
      id: 3,
      name: 'AirPods Pro',
      category: 'Accessories',
      price: 249,
      stock: 50,
      status: 'active',
      image: '/images/airpods-pro.jpg',
      description: 'Wireless earbuds with noise cancellation',
      createdAt: '2024-01-05'
    },
    {
      id: 4,
      name: 'Apple Watch Series 9',
      category: 'Smartwatches',
      price: 399,
      stock: 15,
      status: 'active',
      image: '/images/apple-watch-9.jpg',
      description: 'Advanced smartwatch with health features',
      createdAt: '2024-01-03'
    },
    {
      id: 5,
      name: 'MacBook Air M3',
      category: 'Accessories',
      price: 1199,
      stock: 8,
      status: 'low_stock',
      image: '/images/macbook-air-m3.jpg',
      description: 'Lightweight laptop with M3 chip',
      createdAt: '2024-01-01'
    }
  ];

  useEffect(() => {
    // Check admin authentication
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
      return;
    }

    // Load products
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, [router]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...productData, id: editingProduct.id }
          : p
      ));
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: Math.max(...products.map(p => p.id)) + 1,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProducts([...products, newProduct]);
    }
    setShowModal(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="products-page">
        <div className="page-header">
          <div className="header-left">
            <h1>Products Management</h1>
            <p>Manage your product catalog</p>
          </div>
          <button className="add-btn" onClick={handleAddProduct}>
            + Add Product
          </button>
        </div>

        <div className="products-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="category-filter"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        <ProductTable
          products={filteredProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />

        {showModal && (
          <ProductModal
            product={editingProduct}
            onSave={handleSaveProduct}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </AdminLayout>
  );
}
