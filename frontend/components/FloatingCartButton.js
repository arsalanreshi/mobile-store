import { useContext } from "react";
import { CartContext } from "../pages/_app";

export default function FloatingCartButton() {
  const { cart, setIsCartOpen } = useContext(CartContext);

  // Calculate total items and total price
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <button className="floating-cart" onClick={() => setIsCartOpen(true)}>
      🛒
      {totalItems > 0 && (
        <span className="info">
          <b>{totalItems}</b> | ₹ {totalPrice.toLocaleString("en-IN")}
        </span>
      )}
      <style jsx>{`
        .floating-cart {
          position: fixed;
          bottom: 20px;
          right: 20px;
          min-width: 70px;
          height: 60px;
          border-radius: 30px;
          background: var(--brand);
          color: white;
          font-size: 22px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 14px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          z-index: 300;
        }
        .info {
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        /* Hide on large screens */
        @media (min-width: 900px) {
          .floating-cart {
            display: none;
          }
        }
      `}</style>
    </button>
  );
}
