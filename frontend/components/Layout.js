import Navbar from "./Navbar";
import Footer from "./Footer";
import MiniCart from "./MiniCart";
import FloatingCartButton from "./FloatingCartButton";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content container">{children}</main>
      <Footer />
      <MiniCart />
      <FloatingCartButton />
    </div>
  );
}
