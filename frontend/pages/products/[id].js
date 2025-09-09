import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { PRODUCTS } from "../../data/products";
import { useContext, useState } from "react";
import { CartContext } from "../_app";
import ProductCard from "../../components/ProductCard";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const product = PRODUCTS.find(p => p.id === id);

  const { addToCart } = useContext(CartContext);

  const [mainImg, setMainImg] = useState(product ? product.image : "");

  if (!product) {
    return (
      <Layout>
        <div className="glass" style={{ padding: 24 }}>Product not found.</div>
      </Layout>
    );
  }

  // Find related products (same category, different id)
  const related = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      <div className="product glass">
        {/* Left: Image gallery */}
        <div className="gallery">
          <img src={mainImg || product.image} alt={product.name} className="main-img" />
          <div className="thumbs">
            <img
              src={product.image}
              alt="thumb"
              onClick={() => setMainImg(product.image)}
              className={mainImg === product.image ? "active" : ""}
            />
            <img
              src="https://via.placeholder.com/300x300.png?text=Side+View"
              alt="side"
              onClick={() => setMainImg("https://via.placeholder.com/300x300.png?text=Side+View")}
              className={mainImg.includes("Side") ? "active" : ""}
            />
            <img
              src="https://via.placeholder.com/300x300.png?text=Back+View"
              alt="back"
              onClick={() => setMainImg("https://via.placeholder.com/300x300.png?text=Back+View")}
              className={mainImg.includes("Back") ? "active" : ""}
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="info">
          <h1>{product.name}</h1>
          <p className="brand">{product.brand} • {product.category}</p>
          <p className="price">₹ {product.price.toLocaleString("en-IN")}</p>
          <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>

          <div className="specs">
            <h3>Specifications</h3>
            <ul>
              <li>Display: 6.5" AMOLED, 120Hz</li>
              <li>Processor: Octa-core</li>
              <li>RAM: 8GB</li>
              <li>Storage: 128GB</li>
              <li>Battery: 5000mAh</li>
              <li>Camera: 50MP Triple Camera</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="related">
          <h2>Related Products</h2>
          <div className="grid">
            {related.map(r => <ProductCard key={r.id} item={r} />)}
          </div>
        </div>
      )}

      <style jsx>{`
        .product {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 24px;
          margin-bottom: 40px;
        }
        .gallery { display: flex; flex-direction: column; gap: 12px; }
        .main-img {
          width: 100%;
          border-radius: 16px;
          object-fit: cover;
        }
        .thumbs { display: flex; gap: 10px; }
        .thumbs img {
          width: 70px; height: 70px;
          border-radius: 8px;
          border: 2px solid transparent;
          cursor: pointer;
          object-fit: cover;
        }
        .thumbs img.active {
          border: 2px solid var(--brand);
        }
        .info { display: flex; flex-direction: column; gap: 12px; }
        .price { font-size: 22px; font-weight: 800; }
        .brand { color: var(--muted); }
        .specs { margin-top: 20px; }
        .specs h3 { margin-bottom: 8px; }
        .specs ul { margin: 0; padding-left: 20px; }
        .specs li { margin-bottom: 6px; }

        .related { margin-top: 40px; }
        .related h2 { margin-bottom: 20px; }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        @media (max-width: 900px) {
          .product { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout>
  );
}
