import { useEffect, useState, createContext } from "react";
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css'
import '../styles/components/navbar.css'
import '../styles/components/hero.css'
import '../styles/components/product-card.css'
import '../styles/components/category-card.css'
import '../styles/components/footer.css'
import '../styles/components/layout.css'
import '../styles/components/cart.css'
import '../styles/components/product-filter.css'
import '../styles/components/product-detail.css'
import '../styles/components/category-page.css'
import '../styles/components/search-bar.css'
import '../styles/components/cart-page.css'
import '../styles/components/checkout-page.css'
import '../styles/components/payment-page.css'
import '../styles/components/contact-page.css'
import '../styles/components/about-page.css'
import '../styles/components/auth.css'
import '../styles/components/profile.css'
import '../styles/components/profile-dropdown.css'
import '../styles/components/auth-modal.css'
import '../styles/admin/admin.css'
import '../styles/admin/admin-login.css'
import '../styles/admin/products.css'
import '../styles/admin/orders.css'
import '../styles/admin/users.css'
import '../styles/admin/settings.css'
export const ThemeContext = createContext();
export const CartContext = createContext();

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [savedCart, setSavedCart] = useState(null);

  // Theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Cart persistence
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
    const savedLater = localStorage.getItem("savedCart");
    if (savedLater) setSavedCart(JSON.parse(savedLater));
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  // ✅ Add to cart with quantity support
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsCartOpen(true); // open sidebar automatically
  };

  // ✅ Remove item completely
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // ✅ Update quantity (+/- buttons)
  const updateQty = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, qty: newQty } : p
        )
      );
    }
  };

  // ✅ Save cart for later
  const saveCart = () => {
    if (cart.length > 0) {
      localStorage.setItem("savedCart", JSON.stringify(cart));
      setSavedCart(cart);
      setCart([]);
    }
  };

  // ✅ Restore saved cart
  const restoreCart = () => {
    const saved = localStorage.getItem("savedCart");
    if (saved) {
      setCart(JSON.parse(saved));
      setSavedCart(null);
      localStorage.removeItem("savedCart");
    }
  };

  // ✅ Clear cart completely
  const clearCart = () => {
    setCart([]);
  };

  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <CartContext.Provider
          value={{
            cart,
            addToCart,
            removeFromCart,
            updateQty,
            isCartOpen,
            setIsCartOpen,
            saveCart,
            restoreCart,
            savedCart,
            clearCart,
          }}
        >
          <Component {...pageProps} />
        </CartContext.Provider>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}
